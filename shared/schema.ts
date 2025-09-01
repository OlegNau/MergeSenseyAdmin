import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "z";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description").notNull(),
  gitProvider: text("git_provider"), // 'github', 'gitlab', 'bitbucket'
  gitRepositoryUrl: text("git_repository_url"),
  gitRepositoryId: text("git_repository_id"),
  gitBranch: text("git_branch").default("main"),
  gitAccessToken: text("git_access_token"), // encrypted
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const pipelines = sqliteTable("pipelines", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id").notNull().references(() => projects.id),
  name: text("name").notNull(),
  status: text("status").notNull(), // 'Active' | 'Inactive'
  agents: text("agents").notNull().default("[]"), // JSON string of AI agents enabled for this pipeline
  trigger: text("trigger").notNull(), // Trigger condition like "push to main"
  lastRun: integer("last_run", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Новая таблица для логов выполнения
export const executionLogs = sqliteTable("execution_logs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  pipelineId: text("pipeline_id").notNull().references(() => pipelines.id),
  projectId: text("project_id").notNull().references(() => projects.id),
  status: text("status").notNull(), // 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  startTime: integer("start_time", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  endTime: integer("end_time", { mode: "timestamp" }),
  duration: integer("duration"), // in milliseconds
  input: text("input").notNull(), // JSON string
  output: text("output"), // JSON string
  error: text("error"),
  agent: text("agent").notNull(),
  trigger: text("trigger").notNull(),
  environment: text("environment").notNull().default("development"),
  version: text("version").notNull().default("1.0.0"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Новая таблица для аналитики
export const analytics = sqliteTable("analytics", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id").notNull().references(() => projects.id),
  pipelineId: text("pipeline_id").references(() => pipelines.id),
  metricType: text("metric_type").notNull(), // 'execution_time' | 'success_rate' | 'error_rate' | 'throughput' | 'custom'
  metricName: text("metric_name").notNull(),
  value: real("value").notNull(),
  unit: text("unit"),
  tags: text("tags").notNull().default("{}"), // JSON string
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  period: text("period").notNull(), // 'minute' | 'hour' | 'day' | 'week' | 'month'
  metadata: text("metadata"), // JSON string
});

// Новая таблица для Git-провайдеров
export const gitProviders = sqliteTable("git_providers", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(), // 'github', 'gitlab', 'bitbucket'
  displayName: text("display_name").notNull(), // 'GitHub', 'GitLab', 'Bitbucket'
  baseUrl: text("base_url").notNull(), // 'https://github.com', 'https://gitlab.com'
  clientId: text("client_id"),
  clientSecret: text("client_secret"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  gitProvider: true,
  gitRepositoryUrl: true,
  gitRepositoryId: true,
  gitBranch: true,
});

export const insertPipelineSchema = createInsertSchema(pipelines).pick({
  projectId: true,
  name: true,
  status: true,
  agents: true,
  trigger: true,
  lastRun: true,
});

export const insertExecutionLogSchema = createInsertSchema(executionLogs).pick({
  pipelineId: true,
  projectId: true,
  status: true,
  startTime: true,
  endTime: true,
  duration: true,
  input: true,
  output: true,
  error: true,
  agent: true,
  trigger: true,
  environment: true,
  version: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  projectId: true,
  pipelineId: true,
  metricType: true,
  metricName: true,
  value: true,
  unit: true,
  tags: true,
  timestamp: true,
  period: true,
  metadata: true,
});

export const insertGitProviderSchema = createInsertSchema(gitProviders).pick({
  name: true,
  displayName: true,
  baseUrl: true,
  clientId: true,
  clientSecret: true,
  isActive: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertPipeline = z.infer<typeof insertPipelineSchema>;
export type Pipeline = typeof pipelines.$inferSelect;

export type InsertExecutionLog = z.infer<typeof insertExecutionLogSchema>;
export type ExecutionLog = typeof executionLogs.$inferSelect;

export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;

export type InsertGitProvider = z.infer<typeof insertGitProviderSchema>;
export type GitProvider = typeof gitProviders.$inferSelect;

export type ProjectWithPipelines = Project & {
  pipelines: Pipeline[];
};
