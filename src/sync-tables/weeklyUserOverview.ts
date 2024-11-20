// src/sync-tables/weeklyUserOverview.ts

import * as coda from "@codahq/packs-sdk";
import { EverhourClient } from "../api/client";
import { getCurrentWeekDates } from "../utils/date";

// Types
interface UserTimeData {
  userId: number;
  userName: string;
  userRole: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  weeklyTotal: number;
  daysWorked: number;
}

// Schema
const WeeklyUserOverviewSchema = coda.makeObjectSchema({
  properties: {
    id: { type: coda.ValueType.String },
    userName: { type: coda.ValueType.String },
    userRole: { type: coda.ValueType.String },
    monday: { type: coda.ValueType.Number },
    tuesday: { type: coda.ValueType.Number },
    wednesday: { type: coda.ValueType.Number },
    thursday: { type: coda.ValueType.Number },
    friday: { type: coda.ValueType.Number },
    dailyTarget: { type: coda.ValueType.Number },
    weeklyTotal: { type: coda.ValueType.Number },
    weekStartDate: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date },
    isOverworked: { type: coda.ValueType.Boolean },
  },
  displayProperty: "userName",
  idProperty: "id",
  featuredProperties: [
    "userName",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "weeklyTotal",
    "isOverworked"
  ],
});

// Sync Table
export const WeeklyUserOverviewTable = coda.makeSyncTable({
  name: "WeeklyUserOverview",
  identityName: "WeeklyUserOverview",
  description: "Shows a weekly summary of hours worked per user with daily breakdowns and totals",
  schema: WeeklyUserOverviewSchema,
  formula: {
    name: "SyncWeeklyUserOverview",
    description: "Syncs weekly time data per user with daily breakdowns",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "weekOffset",
        description: "Which week to show (0 = current week, -1 = last week, etc.)",
        optional: true,
        suggestedValue: "0",
        autocomplete: [
          { display: "Current Week", value: "0" },
          { display: "Last Week", value: "-1" },
          { display: "Two Weeks Ago", value: "-2" }
        ]
      })
    ],
    execute: async function ([weekOffset], context) {
      try {
        const DAILY_TARGET_HOURS = 8;
        const OVERWORK_THRESHOLD = 9;

        // Get week dates based on offset
        const offset = parseInt(weekOffset || "0");
        const { monday, friday, fromStr, toStr } = getCurrentWeekDates(offset);

        // Fetch data
        const client = new EverhourClient(context);
        const [users, timeRecords] = await Promise.all([
          client.getUsers(),
          client.getTimeRecords(fromStr, toStr)
        ]);

        // Initialize user time map
        const userTimeMap = new Map<number, UserTimeData>();
        users.forEach(user => {
          if (user.status === 'active') {
            userTimeMap.set(user.id, {
              userId: user.id,
              userName: user.name,
              userRole: user.role,
              monday: 0,
              tuesday: 0,
              wednesday: 0,
              thursday: 0,
              friday: 0,
              weeklyTotal: 0,
              daysWorked: 0
            });
          }
        });

        // Process time records
        timeRecords.forEach(record => {
          const recordDate = new Date(record.date);
          const dayOfWeek = recordDate.getDay();

          if (userTimeMap.has(record.user) && dayOfWeek >= 1 && dayOfWeek <= 5) {
            const userData = userTimeMap.get(record.user)!;
            const hoursWorked = record.time / 3600;
            
            // Update daily hours
            switch (dayOfWeek) {
              case 1: userData.monday += hoursWorked; break;
              case 2: userData.tuesday += hoursWorked; break;
              case 3: userData.wednesday += hoursWorked; break;
              case 4: userData.thursday += hoursWorked; break;
              case 5: userData.friday += hoursWorked; break;
            }
            
            userData.weeklyTotal += hoursWorked;
            if (hoursWorked > 0) {
              userData.daysWorked++;
            }
          }
        });

        // Transform data for output
        const weeklyOverview = Array.from(userTimeMap.values()).map(userData => {
          const avgHoursPerDay = userData.daysWorked > 0 ?
            userData.weeklyTotal / userData.daysWorked : 0;

          return {
            id: userData.userId.toString(),
            userName: userData.userName,
            userRole: userData.userRole,
            monday: Number(userData.monday.toFixed(2)),
            tuesday: Number(userData.tuesday.toFixed(2)),
            wednesday: Number(userData.wednesday.toFixed(2)),
            thursday: Number(userData.thursday.toFixed(2)),
            friday: Number(userData.friday.toFixed(2)),
            dailyTarget: DAILY_TARGET_HOURS,
            weeklyTotal: Number(userData.weeklyTotal.toFixed(2)),
            weekStartDate: fromStr,
            isOverworked: avgHoursPerDay > OVERWORK_THRESHOLD
          };
        });

        return { result: weeklyOverview };
      } catch (error) {
        console.error("Error in SyncWeeklyUserOverview:", error);
        throw new coda.UserVisibleError(`Error fetching weekly overview data: ${error.message}`);
      }
    }
  }
});