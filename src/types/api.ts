// src/types/api.ts

export interface User {
    id: number;
    name: string;
    status: string;
    role: string;
    headline?: string;
    avatarUrl?: string;
  }
  
  export interface Timer {
    status: "active" | "stopped";
    task?: {
      name: string;
      id: string;
      projects?: string[];
    };
    startedAt: string;
    duration: number;
    user: User;
  }
  
  export interface TimeRecord {
    id: number;
    user: number;
    time: number;
    date: string;
    billable: boolean;
    task?: {
      projects: string[];
      name: string;
      id: string;
    };
  }
  
  export interface Project {
    id: string;
    name: string;
    client?: number;
    type?: string;
    favorite?: boolean;
    status?: string;
    budget?: {
      budget: number;
      progress: number;
    };
    billing?: {
      type: string;
    };
    workspaceId?: string;
    workspaceName?: string;
    users?: number[];
  }
  
  export interface Client {
    id: number;
    name: string;
  }
  
  export interface Timecard {
    user: number;
    date: string;
    clockIn?: string;
    clockOut?: string;
    breakTime?: number;
    workTime: number;
  }
  
  export interface ProjectBillingBudget {
    type: 'money' | 'time';
    budget: number;
    progress: number;
    timeProgress: number;
    expenseProgress: number;
    period: 'general' | 'monthly' | 'weekly' | 'daily';
    appliedFrom?: string;
    disallowOverbudget?: boolean;
    excludeUnbillableTime?: boolean;
    excludeExpenses?: boolean;
    showToUsers?: boolean;
    threshold?: number;
  }
  
  export interface ProjectWithBudget extends Project {
    budget?: ProjectBillingBudget;
  }