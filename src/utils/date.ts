// src/utils/date.ts

export function getWorkingDays(startDate: Date, endDate: Date): number {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }
  
  export function getCurrentWeekDates(offset: number = 0): {
    monday: Date;
    friday: Date;
    fromStr: string;
    toStr: string;
  } {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1 + (offset * 7));
    monday.setHours(0, 0, 0, 0);
  
    const friday = new Date(monday);
    friday.setDate(friday.getDate() + 4);
    friday.setHours(23, 59, 59, 999);
  
    return {
      monday,
      friday,
      fromStr: monday.toISOString().split('T')[0],
      toStr: friday.toISOString().split('T')[0],
    };
  }
  
  export function getMonthRanges(monthsToShow: number): Array<{
    startDate: string;
    endDate: string;
    monthDisplay: string;
  }> {
    const now = new Date();
    const months = [];
    
    for (let i = 0; i < monthsToShow; i++) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      months.push({
        startDate: monthStart.toISOString().split('T')[0],
        endDate: monthEnd.toISOString().split('T')[0],
        monthDisplay: monthStart.toLocaleString('default', { month: 'long', year: 'numeric' }),
      });
    }
    
    return months;
  }