import type { ProjectWithPipelines } from "@shared/schema";

export const mockProjects: ProjectWithPipelines[] = [
  {
    id: "1",
    name: "AI Review Platform",
    description: "Core company product for automated code reviews with machine learning capabilities",
    gitProvider: "github",
    gitRepositoryUrl: "https://github.com/company/ai-review-platform",
    gitRepositoryId: "123456789",
    gitBranch: "main",
    gitAccessToken: null,
    createdAt: new Date("2024-01-01"),
    pipelines: [
      { 
        id: "101", 
        projectId: "1",
        name: "Main Pipeline (main branch)", 
        status: "Active",
        agents: JSON.stringify(["code-review", "security-scan", "performance"]),
        trigger: "push to main",
        lastRun: new Date("2024-01-15T14:30:00"),
        createdAt: new Date("2024-01-01")
      },
      { 
        id: "102", 
        projectId: "1",
        name: "Log Analysis (staging)", 
        status: "Inactive",
        agents: JSON.stringify(["log-analyzer"]),
        trigger: "push to staging",
        lastRun: new Date("2024-01-14T11:00:00"),
        createdAt: new Date("2024-01-01")
      },
      { 
        id: "103", 
        projectId: "1",
        name: "Performance Testing", 
        status: "Active",
        agents: JSON.stringify(["performance", "load-test"]),
        trigger: "manual",
        lastRun: new Date("2024-01-15T09:15:00"),
        createdAt: new Date("2024-01-01")
      }
    ]
  },
  {
    id: "2",
    name: "E-commerce Analytics",
    description: "Advanced analytics dashboard for tracking customer behavior and sales metrics",
    gitProvider: "gitlab",
    gitRepositoryUrl: "https://gitlab.com/company/ecommerce-analytics",
    gitRepositoryId: "987654321",
    gitBranch: "develop",
    gitAccessToken: null,
    createdAt: new Date("2024-01-02"),
    pipelines: [
      { 
        id: "201", 
        projectId: "2",
        name: "Daily Sales Report", 
        status: "Active",
        agents: JSON.stringify(["data-validation", "report-generator"]),
        trigger: "schedule daily",
        lastRun: new Date("2024-01-15T08:00:00"),
        createdAt: new Date("2024-01-02")
      },
      { 
        id: "202", 
        projectId: "2",
        name: "Customer Segmentation", 
        status: "Active",
        agents: JSON.stringify(["ml-analyzer", "data-insights"]),
        trigger: "data change",
        lastRun: new Date("2024-01-15T12:45:00"),
        createdAt: new Date("2024-01-02")
      }
    ]
  },
  {
    id: "3",
    name: "Mobile App Backend",
    description: "RESTful API service powering iOS and Android applications with real-time features",
    gitProvider: "github",
    gitRepositoryUrl: "https://github.com/company/mobile-backend",
    gitRepositoryId: "456789123",
    gitBranch: "main",
    gitAccessToken: null,
    createdAt: new Date("2024-01-03"),
    pipelines: [
      { 
        id: "301", 
        projectId: "3",
        name: "API Deployment", 
        status: "Active",
        agents: JSON.stringify(["api-test", "security-scan"]),
        trigger: "push to production",
        lastRun: new Date("2024-01-15T16:20:00"),
        createdAt: new Date("2024-01-03")
      },
      { 
        id: "302", 
        projectId: "3",
        name: "Database Migration", 
        status: "Inactive",
        agents: JSON.stringify(["db-validator"]),
        trigger: "manual",
        lastRun: new Date("2024-01-13T14:30:00"),
        createdAt: new Date("2024-01-03")
      },
      { 
        id: "303", 
        projectId: "3",
        name: "Push Notification Service", 
        status: "Active",
        agents: JSON.stringify(["notification-test", "performance"]),
        trigger: "push to main",
        lastRun: new Date("2024-01-15T13:10:00"),
        createdAt: new Date("2024-01-03")
      }
    ]
  },
  {
    id: "4",
    name: "Data Warehouse ETL",
    description: "Extract, transform, and load processes for enterprise data warehouse infrastructure",
    gitProvider: "bitbucket",
    gitRepositoryUrl: "https://bitbucket.org/company/data-warehouse-etl",
    gitRepositoryId: "789123456",
    gitBranch: "main",
    gitAccessToken: null,
    createdAt: new Date("2024-01-04"),
    pipelines: [
      { 
        id: "401", 
        projectId: "4",
        name: "Daily ETL Process", 
        status: "Active",
        agents: JSON.stringify(["data-validator", "etl-monitor"]),
        trigger: "schedule daily",
        lastRun: new Date("2024-01-15T02:00:00"),
        createdAt: new Date("2024-01-04")
      },
      { 
        id: "402", 
        projectId: "4",
        name: "Weekly Data Cleanup", 
        status: "Inactive",
        agents: JSON.stringify(["data-cleaner"]),
        trigger: "schedule weekly",
        lastRun: new Date("2024-01-08T03:30:00"),
        createdAt: new Date("2024-01-04")
      }
    ]
  }
];
