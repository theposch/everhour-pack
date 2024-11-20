// src/sync-tables/timecards.ts

import * as coda from "@codahq/packs-sdk";
import { EverhourClient } from "../api/client";
import { formatTime } from "../utils/formatters";
import { getCurrentWeekDates } from "../utils/date";

export const TimecardsSchema = coda.makeObjectSchema({
  properties: {
    id: { type: coda.ValueType.String },
    userId: { type: coda.ValueType.String },
    name: { type: coda.ValueType.String },
    clockInThisWeek: { type: coda.ValueType.String },
    clockInLastWeek: { type: coda.ValueType.String },
    clockOutThisWeek: { type: coda.ValueType.String },
    clockOutLastWeek: { type: coda.ValueType.String },
    breaksThisWeek: { type: coda.ValueType.String },
    breaksLastWeek: { type: coda.ValueType.String },
    totalHoursThisWeek: { type: coda.ValueType.String },
    totalHoursLastWeek: { type: coda.ValueType.String },
    dateRangeThisWeek: { type: coda.ValueType.String },
    dateRangeLastWeek: { type: coda.ValueType.String },
  },
  displayProperty: "name",
  idProperty: "id",
  featuredProperties: ["name", "clockInThisWeek", "clockOutThisWeek", "totalHoursThisWeek"],
});

interface ProcessedTimecard {
  id: string;
  userId: string;
  name: string;
  clockInThisWeek: string;
  clockInLastWeek: string;
  clockOutThisWeek: string;
  clockOutLastWeek: string;
  breaksThisWeek: string;
  breaksLastWeek: string;
  totalHoursThisWeek: number;
  totalHoursLastWeek: number;
  dateRangeThisWeek: string;
  dateRangeLastWeek: string;
  [key: string]: string | number;
}

export const TimecardsSyncTable = coda.makeSyncTable({
  name: "Timecards",
  identityName: "Timecard",
  schema: TimecardsSchema,
  formula: {
    name: "SyncTimecards",
    description: "Sync timecard entries for each user showing this week and last week data.",
    parameters: [],
    execute: async function ([], context) {
      try {
        // Get current week dates
        const thisWeek = getCurrentWeekDates(0);
        const lastWeek = getCurrentWeekDates(-1);

        const fromStr = lastWeek.fromStr;
        const toStr = thisWeek.toStr;

        const client = new EverhourClient(context);

        const [timecardUsers, allTimecards] = await Promise.all([
          client.getUsers(),
          client.getTimecards(fromStr, toStr)
        ]);

        if (!Array.isArray(allTimecards)) {
          return { result: [] };
        }

        const userTimecards: Record<number, ProcessedTimecard> = {};

        allTimecards.forEach(timecard => {
          const user = timecardUsers.find(u => u.id === timecard.user);
          if (!user) return;

          const timecardDate = new Date(timecard.date);
          const isThisWeek = timecardDate >= thisWeek.monday && timecardDate <= thisWeek.friday;

          if (!userTimecards[user.id]) {
            userTimecards[user.id] = {
              id: user.id.toString(),
              userId: user.id.toString(),
              name: user.name,
              clockInThisWeek: '-',
              clockInLastWeek: '-',
              clockOutThisWeek: '-',
              clockOutLastWeek: '-',
              breaksThisWeek: '-',
              breaksLastWeek: '-',
              totalHoursThisWeek: 0,
              totalHoursLastWeek: 0,
              dateRangeThisWeek: `${thisWeek.fromStr} to ${thisWeek.toStr}`,
              dateRangeLastWeek: `${lastWeek.fromStr} to ${lastWeek.toStr}`,
            };
          }

          const weekKey = isThisWeek ? 'ThisWeek' : 'LastWeek';
          const timeCardEntry = userTimecards[user.id];

          timeCardEntry[`clockIn${weekKey}`] = timecard.clockIn || timeCardEntry[`clockIn${weekKey}`];
          timeCardEntry[`clockOut${weekKey}`] = timecard.clockOut || timeCardEntry[`clockOut${weekKey}`];
          timeCardEntry[`breaks${weekKey}`] = timecard.breakTime ? 
            formatTime(timecard.breakTime) : 
            timeCardEntry[`breaks${weekKey}`];

          if (isThisWeek) {
            timeCardEntry.totalHoursThisWeek += timecard.workTime || 0;
          } else {
            timeCardEntry.totalHoursLastWeek += timecard.workTime || 0;
          }
        });

        const timecards = Object.values(userTimecards).map(timecard => ({
          ...timecard,
          totalHoursThisWeek: formatTime(timecard.totalHoursThisWeek),
          totalHoursLastWeek: formatTime(timecard.totalHoursLastWeek),
        }));

        return { result: timecards };
      } catch (error) {
        console.error(`Error in SyncTimecards: ${error.message}`);
        throw new coda.UserVisibleError(`Error fetching timecards from Everhour: ${error.message}`);
      }
    },
  },
});