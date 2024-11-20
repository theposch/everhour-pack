// src/sync-tables/dailyHoursDetail.ts

import * as coda from "@codahq/packs-sdk";
import { EverhourClient } from "../api/client";
import { getCurrentWeekDates } from "../utils/date";

// Schema
const DailyDetailedHoursSchema = coda.makeObjectSchema({
  properties: {
    id: { type: coda.ValueType.String },
    userName: { type: coda.ValueType.String },
    dayName: { type: coda.ValueType.String },
    dayNumber: { type: coda.ValueType.Number },
    hoursWorked: { type: coda.ValueType.Number },
    isOverworked: { type: coda.ValueType.Boolean },
  },
  displayProperty: "userName",
  idProperty: "id",
  featuredProperties: ["userName", "dayName", "hoursWorked", "isOverworked"],
});

// Constants
const DAYS = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const OVERWORK_THRESHOLD = 8;

// Sync Table
export const DailyHoursDetailTable = coda.makeSyncTable({
  name: "DailyHoursDetail",
  identityName: "DailyHoursDetail",
  description: "Shows detailed day-by-day hours for each user, perfect for daily analysis and charts",
  schema: DailyDetailedHoursSchema,
  formula: {
    name: "SyncDailyHoursDetail",
    description: "Syncs detailed daily hours for each user",
    parameters: [],
    execute: async function ([], context) {
      try {
        // Get current week dates
        const { monday, friday, fromStr, toStr } = getCurrentWeekDates(0);

        // Fetch data
        const client = new EverhourClient(context);
        const [users, timeRecords] = await Promise.all([
          client.getUsers(),
          client.getTimeRecords(fromStr, toStr)
        ]);

        const processedRecords = [];

        // Process each active user
        for (const user of users) {
          if (user.status === 'active') {
            // Create record for each weekday
            for (let dayNum = 1; dayNum <= 5; dayNum++) {
              // Get date for current day
              const date = new Date(monday);
              date.setDate(date.getDate() + dayNum - 1);
              const dateStr = date.toISOString().split('T')[0];

              // Get time records for this user and day
              const dayRecords = timeRecords.filter(record =>
                record.user === user.id && record.date === dateStr
              );

              // Calculate total hours worked
              const hoursWorked = dayRecords.reduce((total, record) =>
                total + (record.time / 3600), 0
              );

              // Add record
              processedRecords.push({
                id: `${user.id}-${dateStr}`,
                userName: user.name,
                dayName: DAYS[dayNum],
                dayNumber: dayNum,
                hoursWorked: Number(hoursWorked.toFixed(2)),
                isOverworked: hoursWorked > OVERWORK_THRESHOLD
              });
            }
          }
        }

        return { result: processedRecords };
      } catch (error) {
        console.error("Error in SyncDailyHoursDetail:", error);
        throw new coda.UserVisibleError(`Error fetching daily hours detail: ${error.message}`);
      }
    }
  }
});