// src/sync-tables/team.ts

import * as coda from "@codahq/packs-sdk";
import { EverhourClient } from "../api/client";
import { secondsToHours, formatPercentage, formatTime } from "../utils/formatters";

export const TeamPerformanceSchema = coda.makeObjectSchema({
  properties: {
    userId: { type: coda.ValueType.String },
    name: { type: coda.ValueType.String },
    status: { type: coda.ValueType.String },
    role: { type: coda.ValueType.String },
    totalTime: { type: coda.ValueType.Number },
    billableTime: { type: coda.ValueType.Number },
    productivityScore: { type: coda.ValueType.String },
    currentTask: { type: coda.ValueType.String },
    currentTaskStartTime: { type: coda.ValueType.String },
    currentTaskDuration: { type: coda.ValueType.String },
  },
  displayProperty: "name",
  idProperty: "userId",
  featuredProperties: ["name", "status", "role", "totalTime", "billableTime", "productivityScore", "currentTask"],
});

export const TeamPerformanceSyncTable = coda.makeSyncTable({
  name: "TeamPerformance",
  identityName: "TeamMember",
  schema: TeamPerformanceSchema,
  formula: {
    name: "SyncTeamPerformance",
    description: "Sync team performance data for Everhour team members",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Date,
        name: "from",
        description: "Start date for the time period (inclusive)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.Date,
        name: "to",
        description: "End date for the time period (inclusive)",
        optional: true,
      }),
    ],
    execute: async function ([from, to], context) {
      try {
        const now = new Date();
        const defaultFrom = new Date(now.getFullYear(), now.getMonth(), 1);
        const defaultTo = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const fromStr = (from || defaultFrom).toISOString().split('T')[0];
        const toStr = (to || defaultTo).toISOString().split('T')[0];

        const client = new EverhourClient(context);
        const [teamMembers, timeRecords, currentTimers] = await Promise.all([
          client.getUsers(),
          client.getTimeRecords(fromStr, toStr),
          client.getTeamTimers()
        ]);

        const userTimeMap: Record<number, { total: number; billable: number }> = {};

        timeRecords.forEach((record) => {
          if (!userTimeMap[record.user]) {
            userTimeMap[record.user] = { total: 0, billable: 0 };
          }
          userTimeMap[record.user].total += record.time;
          if (record.billable) {
            userTimeMap[record.user].billable += record.time;
          }
        });

        const userCurrentTimerMap = new Map(currentTimers.map(timer => [timer.user.id, timer]));

        const teamPerformance = teamMembers.map(user => {
          const timeData = userTimeMap[user.id] || { total: 0, billable: 0 };
          const totalTime = timeData.total;
          const billableTime = timeData.billable;
          const productivityScore = totalTime > 0 ? formatPercentage(billableTime / totalTime) : "0.00%";

          const currentTimer = userCurrentTimerMap.get(user.id);
          let currentTask = "No current task";
          let currentTaskStartTime = "";
          let currentTaskDuration = "";

          if (currentTimer && currentTimer.status === "active") {
            currentTask = currentTimer.task?.name || "Unnamed Task";
            currentTaskStartTime = new Date(currentTimer.startedAt).toLocaleString();
            currentTaskDuration = formatTime(currentTimer.duration);
          }

          return {
            userId: user.id.toString(),
            name: user.name,
            status: user.status,
            role: user.role,
            totalTime: secondsToHours(totalTime),
            billableTime: secondsToHours(billableTime),
            productivityScore: productivityScore,
            currentTask: currentTask,
            currentTaskStartTime: currentTaskStartTime,
            currentTaskDuration: currentTaskDuration,
          };
        });

        return { result: teamPerformance };
      } catch (error) {
        console.error("Error in SyncTeamPerformance:", error);
        throw new coda.UserVisibleError(`Error fetching team performance data from Everhour: ${error.message}`);
      }
    },
  },
});