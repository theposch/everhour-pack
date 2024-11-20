// src/sync-tables/projects.ts

import * as coda from "@codahq/packs-sdk";
import { EverhourClient } from "../api/client";
import { formatTime, secondsToHours } from "../utils/formatters";

export const ProjectsSync = coda.makeObjectSchema({
  properties: {
    id: { type: coda.ValueType.String },
    name: { type: coda.ValueType.String },
    clientId: { type: coda.ValueType.String },
    clientName: { type: coda.ValueType.String },
    type: { type: coda.ValueType.String },
    favorite: { type: coda.ValueType.Boolean },
    status: { type: coda.ValueType.String },
    budget: { type: coda.ValueType.Number },
    totalTimeFormatted: { type: coda.ValueType.String },
    totalTimeHours: { type: coda.ValueType.Number },
    billableTimeFormatted: { type: coda.ValueType.String },
    billableTimeHours: { type: coda.ValueType.Number },
    nonBillableTimeFormatted: { type: coda.ValueType.String },
    nonBillableTimeHours: { type: coda.ValueType.Number },
    activeUsers: { type: coda.ValueType.Number },
    userNames: { type: coda.ValueType.Array, items: { type: coda.ValueType.String } },
    progress: { type: coda.ValueType.Number },
    billingType: { type: coda.ValueType.String },
    budgetProgress: { type: coda.ValueType.String },
    workspaceId: { type: coda.ValueType.String },
    workspaceName: { type: coda.ValueType.String }
  },
  displayProperty: "name",
  idProperty: "id",
  featuredProperties: ["name", "clientName", "totalTimeHours", "billableTimeHours", "activeUsers", "progress", "budgetProgress"],
});

export const ProjectsSyncTable = coda.makeSyncTable({
  name: "Projects",
  identityName: "Project",
  schema: ProjectsSync,
  formula: {
    name: "SyncProjects",
    description: "Sync Everhour projects with time information",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.DateArray,
        name: "dateRange",
        description: "Select a time range for the time records",
        optional: true,
        suggestedValue: [new Date(), new Date()],
      })
    ],
    execute: async function ([dateRange], context) {
      try {
        let fromDate: Date, toDate: Date;
        if (dateRange && dateRange.length === 2) {
          [fromDate, toDate] = dateRange;
        } else {
          const now = new Date();
          fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
          toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        }

        const fromStr = fromDate.toISOString().split('T')[0];
        const toStr = toDate.toISOString().split('T')[0];

        const client = new EverhourClient(context);

        // Fetch all required data in parallel
        const [projects, users, timeRecords, clients] = await Promise.all([
          client.getProjects(),
          client.getUsers(),
          client.getTimeRecords(fromStr, toStr),
          client.getClients()
        ]);

        // Create maps for quick lookups
        const userMap = new Map(users.map(user => [user.id, user]));
        const clientMap = new Map(clients.map(client => [client.id, client]));

        // Process time records per project
        const projectTimeMap = new Map();
        timeRecords.forEach(record => {
          if (!record.task?.projects) return;

          record.task.projects.forEach(projectId => {
            if (!projectTimeMap.has(projectId)) {
              projectTimeMap.set(projectId, {
                total: 0,
                billable: 0,
                nonBillable: 0,
                users: new Set(),
              });
            }

            const projectStats = projectTimeMap.get(projectId);
            projectStats.total += record.time;
            if (record.billable) {
              projectStats.billable += record.time;
            } else {
              projectStats.nonBillable += record.time;
            }
            projectStats.users.add(record.user);
          });
        });

        // Transform projects data
        const processedProjects = projects.map(project => {
          const timeStats = projectTimeMap.get(project.id) || {
            total: 0,
            billable: 0,
            nonBillable: 0,
            users: new Set(),
          };

          const activeUsers = Array.from(timeStats.users)
            .map(userId => userMap.get(userId as number))
            .filter(Boolean);

          const client = project.client ? clientMap.get(project.client) : undefined;

          // Calculate budget progress if budget exists
          let progress = 0;
          let budgetProgress = "No budget set";
          if (project.budget?.budget) {
            const budget = project.budget.budget;
            const spent = project.budget.progress || 0;
            progress = Math.min((spent / budget) * 100, 100);
            budgetProgress = `${progress.toFixed(1)}% (${formatTime(spent)} / ${formatTime(budget)})`;
          }

          return {
            id: project.id,
            name: project.name,
            clientId: project.client?.toString() || "",
            clientName: client ? client.name : "",
            type: project.type || "",
            favorite: project.favorite || false,
            status: project.status || "active",
            budget: project.budget?.budget || 0,
            totalTimeFormatted: formatTime(timeStats.total),
            totalTimeHours: secondsToHours(timeStats.total),
            billableTimeFormatted: formatTime(timeStats.billable),
            billableTimeHours: secondsToHours(timeStats.billable),
            nonBillableTimeFormatted: formatTime(timeStats.nonBillable),
            nonBillableTimeHours: secondsToHours(timeStats.nonBillable),
            activeUsers: activeUsers.length,
            userNames: activeUsers.map(user => user?.name || ""),
            progress: progress,
            billingType: project.billing?.type || "non_billable",
            budgetProgress: budgetProgress,
            workspaceId: project.workspaceId || "",
            workspaceName: project.workspaceName || ""
          };
        });

        return { result: processedProjects };
      } catch (error: any) {
        console.error("Error in SyncProjects:", error);
        if (error instanceof coda.UserVisibleError) {
          throw error;
        }
        throw new coda.UserVisibleError(`Error fetching projects from Everhour: ${error.message}`);
      }
    }
  }
});