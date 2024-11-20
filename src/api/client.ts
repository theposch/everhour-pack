// src/api/client.ts

import * as coda from "@codahq/packs-sdk";
import { User, Timer, TimeRecord, Project, Client, Timecard, ProjectWithBudget } from "../types/api";

export class EverhourClient {
  constructor(
    private context: coda.ExecutionContext,
    private baseUrl: string = "https://api.everhour.com"
  ) {}

  private async makeRequest<T>(
    path: string, 
    method: string = "GET", 
    params: any = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    try {
      const response = await this.context.fetcher.fetch({
        method: method,
        url: url,
        headers: {
          'X-Accept-Version': '1.2',
          'Content-Type': 'application/json',
        },
        body: method !== "GET" ? JSON.stringify(params) : undefined,
        ...params,
      });

      if (response.status === 429) {
        const retryAfter = response.headers['Retry-After'];
        throw new coda.UserVisibleError(`Rate limit exceeded. Please retry after ${retryAfter} seconds.`);
      }

      if (response.status !== 200) {
        throw new Error(`Error ${response.status}: ${response.body?.message ?? "Unknown error"}`);
      }

      return response.body as T;
    } catch (error) {
      throw new coda.UserVisibleError(`Failed to fetch from Everhour: ${error.message}`);
    }
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.makeRequest<Project[]>("/projects");
  }

  async getProject(id: string): Promise<Project> {
    return this.makeRequest<Project>(`/projects/${id}`);
  }

  // Time Records
  async getTimeRecords(from?: string, to?: string, page?: number, limit?: number): Promise<TimeRecord[]> {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    
    return this.makeRequest<TimeRecord[]>(`/team/time?${params}`);
  }

  // Users
  async getUsers(): Promise<User[]> {
    return this.makeRequest<User[]>("/team/users");
  }

  // Clients
  async getClients(): Promise<Client[]> {
    return this.makeRequest<Client[]>("/clients");
  }

  // Timers
  async getTeamTimers(): Promise<Timer[]> {
    return this.makeRequest<Timer[]>("/team/timers");
  }

  // Timecards
  async getTimecards(from: string, to: string): Promise<Timecard[]> {
    return this.makeRequest<Timecard[]>(`/timecards?from=${from}&to=${to}`);
  }
}

// Rate limiting helper
export async function rateLimitedRequest<T>(
  context: coda.ExecutionContext,
  requests: { request: () => Promise<T>; metadata: any }[]
): Promise<{ result: T; metadata: any }[]> {
  const BATCH_SIZE = 15;
  const results = [];

  for (let i = 0; i < requests.length; i += BATCH_SIZE) {
    const batch = requests.slice(i, i + BATCH_SIZE);
    
    const batchResults = await Promise.all(
      batch.map(async ({ request, metadata }) => {
        try {
          const result = await request();
          return { result, metadata };
        } catch (error) {
          if (error.status === 429) {
            const retryAfter = parseInt(error.headers['Retry-After'] || '10');
            await context.fetcher.fetch({
              method: 'GET',
              url: 'https://api.everhour.com/ping',
              cacheTtlSecs: retryAfter
            });
            const retryResult = await request();
            return { result: retryResult, metadata };
          }
          throw error;
        }
      })
    );
    
    results.push(...batchResults);
    
    if (i + BATCH_SIZE < requests.length) {
      await context.fetcher.fetch({
        method: 'GET',
        url: 'https://api.everhour.com/ping',
        cacheTtlSecs: 10
      });
    }
  }
  
  return results;
}