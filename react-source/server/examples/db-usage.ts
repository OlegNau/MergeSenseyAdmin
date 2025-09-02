import { db } from '../db';
import { users, projects, pipelines, executionLogs, analytics } from '../../shared/schema';
import { eq, desc, and, gte } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

// Примеры CRUD операций с SQLite

// 1. Создание пользователя
export const createUser = async (username: string, password: string) => {
  try {
    const result = await db.insert(users).values({
      username,
      password, // В реальном приложении пароль должен быть захеширован
    });
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// 2. Получение пользователя по username
export const getUserByUsername = async (username: string) => {
  try {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0] || null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

// 3. Создание проекта
export const createProject = async (name: string, description: string) => {
  try {
    const result = await db.insert(projects).values({
      name,
      description,
    });
    return result;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// 4. Получение всех проектов с пайплайнами
export const getProjectsWithPipelines = async () => {
  try {
    const projectsData = await db.select().from(projects);
    const pipelinesData = await db.select().from(pipelines);
    
    // Объединяем данные на уровне приложения
    return projectsData.map(project => ({
      ...project,
      pipelines: pipelinesData.filter(pipeline => pipeline.projectId === project.id)
    }));
  } catch (error) {
    console.error('Error getting projects with pipelines:', error);
    throw error;
  }
};

// 5. Создание лога выполнения
export const createExecutionLog = async (logData: {
  pipelineId: string;
  projectId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  input: Record<string, any>;
  agent: string;
  trigger: string;
  environment?: string;
  version?: string;
}) => {
  try {
    const result = await db.insert(executionLogs).values({
      ...logData,
      input: JSON.stringify(logData.input),
      environment: logData.environment || 'development',
      version: logData.version || '1.0.0',
    });
    return result;
  } catch (error) {
    console.error('Error creating execution log:', error);
    throw error;
  }
};

// 6. Обновление статуса лога выполнения
export const updateExecutionLogStatus = async (
  logId: string, 
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled',
  output?: Record<string, any>,
  error?: string
) => {
  try {
    const updateData: any = { 
      status,
      updatedAt: new Date()
    };
    
    if (output) {
      updateData.output = JSON.stringify(output);
    }
    
    if (error) {
      updateData.error = error;
    }
    
    if (status === 'completed' || status === 'failed') {
      updateData.endTime = new Date();
      // Вычисляем длительность
      const log = await db.select().from(executionLogs).where(eq(executionLogs.id, logId));
      if (log[0]) {
        const startTime = new Date(log[0].startTime);
        const endTime = new Date();
        updateData.duration = endTime.getTime() - startTime.getTime();
      }
    }
    
    const result = await db
      .update(executionLogs)
      .set(updateData)
      .where(eq(executionLogs.id, logId));
    
    return result;
  } catch (error) {
    console.error('Error updating execution log:', error);
    throw error;
  }
};

// 7. Получение логов выполнения для пайплайна
export const getExecutionLogsForPipeline = async (pipelineId: string, limit = 50) => {
  try {
    const result = await db
      .select()
      .from(executionLogs)
      .where(eq(executionLogs.pipelineId, pipelineId))
      .orderBy(desc(executionLogs.createdAt))
      .limit(limit);
    
    return result.map(log => ({
      ...log,
      input: JSON.parse(log.input),
      output: log.output ? JSON.parse(log.output) : undefined,
      tags: log.tags ? JSON.parse(log.tags) : undefined,
    }));
  } catch (error) {
    console.error('Error getting execution logs:', error);
    throw error;
  }
};

// 8. Создание метрики аналитики
export const createAnalyticsMetric = async (metricData: {
  projectId: string;
  pipelineId?: string;
  metricType: 'execution_time' | 'success_rate' | 'error_rate' | 'throughput' | 'custom';
  metricName: string;
  value: number;
  unit?: string;
  tags: Record<string, string>;
  period: 'minute' | 'hour' | 'day' | 'week' | 'month';
  metadata?: Record<string, any>;
}) => {
  try {
    const result = await db.insert(analytics).values({
      ...metricData,
      tags: JSON.stringify(metricData.tags),
      metadata: metricData.metadata ? JSON.stringify(metricData.metadata) : undefined,
    });
    return result;
  } catch (error) {
    console.error('Error creating analytics metric:', error);
    throw error;
  }
};

// 9. Получение метрик для проекта за период
export const getProjectMetrics = async (
  projectId: string, 
  metricType: string, 
  period: string,
  startDate: Date,
  endDate: Date
) => {
  try {
    const result = await db
      .select()
      .from(analytics)
      .where(
        and(
          eq(analytics.projectId, projectId),
          eq(analytics.metricType, metricType),
          eq(analytics.period, period),
          gte(analytics.timestamp, startDate),
          gte(endDate, analytics.timestamp)
        )
      )
      .orderBy(analytics.timestamp);
    
    return result.map(metric => ({
      ...metric,
      tags: JSON.parse(metric.tags),
      metadata: metric.metadata ? JSON.parse(metric.metadata) : undefined,
    }));
  } catch (error) {
    console.error('Error getting project metrics:', error);
    throw error;
  }
};

// 10. Получение статистики по проекту
export const getProjectStats = async (projectId: string) => {
  try {
    // Получаем количество пайплайнов
    const pipelinesCount = await db
      .select({ count: sql`count(*)` })
      .from(pipelines)
      .where(eq(pipelines.projectId, projectId));
    
    // Получаем количество успешных выполнений за последние 30 дней
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const successfulExecutions = await db
      .select({ count: sql`count(*)` })
      .from(executionLogs)
      .where(
        and(
          eq(executionLogs.projectId, projectId),
          eq(executionLogs.status, 'completed'),
          gte(executionLogs.createdAt, thirtyDaysAgo)
        )
      );
    
    // Получаем среднее время выполнения
    const avgExecutionTime = await db
      .select({ avg: sql`avg(duration)` })
      .from(executionLogs)
      .where(
        and(
          eq(executionLogs.projectId, projectId),
          eq(executionLogs.status, 'completed')
        )
      );
    
    return {
      pipelinesCount: pipelinesCount[0]?.count || 0,
      successfulExecutionsLast30Days: successfulExecutions[0]?.count || 0,
      averageExecutionTime: avgExecutionTime[0]?.avg || 0,
    };
  } catch (error) {
    console.error('Error getting project stats:', error);
    throw error;
  }
};
