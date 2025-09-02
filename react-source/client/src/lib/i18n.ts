export type Language = 'en' | 'ru';

export const translations = {
  en: {
    // Navigation
    nav: {
      dashboard: "Dashboard",
      projects: "Projects",
      allPipelines: "All Pipelines",
      settings: "Settings",
      help: "Help & Support"
    },
    
    // Dashboard
    dashboard: {
      title: "Dashboard",
      subtitle: "Overview of your project and pipeline performance",
      totalProjects: "Total Projects",
      activePipelines: "Active Pipelines",
      codeLines: "Lines of Code",
      bugsSolved: "Bugs Solved",
      teamMembers: "Team Members",
      avgRuntime: "Avg Runtime",
      recentActivity: "Recent Activity",
      projectPerformance: "Project Performance",
      pipelineActivity: "Pipeline Activity",
      lastWeek: "Last 7 days",
      fromLastMonth: "from last month",
      queueTime: "Queue Time",
      projects: "Projects",
      pipelines: "Pipelines",
      bugs: "Bugs",
      runtime: "Runtime"
    },
    
    // Projects
    projects: {
      title: "Projects",
      subtitle: "Manage your projects and pipelines",
      createProject: "Create New Project",
      viewProject: "View Project",
      noPipelines: "No pipelines",
      pipeline: "pipeline",
      pipelines: "pipelines",
      activePipelines: "Active pipelines",
      total: "total"
    },
    
    // Project Detail
    projectDetail: {
      backToProjects: "Back to Projects",
      createPipeline: "Create Pipeline",
      projectPipelines: "Project Pipelines",
      noPipelinesMessage: "No pipelines created yet. Create your first pipeline to get started with automated workflows.",
      status: "Status",
      trigger: "Trigger",
      lastRun: "Last Run",
      actions: "Actions"
    },
    
    // All Pipelines
    allPipelines: {
      title: "All Pipelines",
      subtitle: "Monitor and manage all pipelines across projects",
      searchPlaceholder: "Search pipelines...",
      filterByProject: "Filter by Project",
      allProjects: "All Projects",
      pipeline: "Pipeline",
      project: "Project",
      status: "Status",
      trigger: "Trigger",
      lastRun: "Last Run",
      actions: "Actions",
      viewDetails: "View Details",
      allStatus: "All Status",
      active: "Active",
      inactive: "Inactive",
      moreFilters: "More Filters",
      noPipelinesFound: "No pipelines found",
      createFirst: "Create your first project to get started with pipelines"
    },
    
    // Pipeline Detail
    pipelineDetail: {
      backToPipelines: "Back to Pipelines",
      configure: "Configure",
      runPipeline: "Run Pipeline",
      running: "Running...",
      lastRun: "Last Run",
      successRate: "Success Rate",
      avgDuration: "Avg Duration",
      totalRuns: "Total Runs",
      never: "Never",
      lastDays: "Last 30 days",
      typicalRuntime: "Typical runtime",
      allTime: "All time",
      overview: "Overview",
      history: "Run History",
      agents: "AI Agents",
      settings: "Settings",
      pipelineOverview: "Pipeline Overview",
      configuration: "Configuration",
      recentPerformance: "Recent Performance",
      runHistory: "Run History",
      viewLogs: "View Logs",
      report: "Report",
      aiAgentsResults: "AI Agents Results",
      noIssues: "No issues",
      issuesFound: "issues found",
      viewDetails: "View Details",
      pipelineSettings: "Pipeline Settings",
      pipelineName: "Pipeline Name",
      triggerCondition: "Trigger Condition",
      created: "Created",
      enabledAgents: "Enabled AI Agents",
      editPipeline: "Edit Pipeline"
    },
    
    // Pipeline Wizard
    wizard: {
      createPipeline: "Create Pipeline",
      stepOf: "Step {current} of {total}",
      back: "Back",
      next: "Next",
      finish: "Finish",
      cancel: "Cancel",
      
      // Step 1
      pipelineBasics: "Pipeline Basics",
      pipelineName: "Pipeline Name",
      pipelineNamePlaceholder: "Enter pipeline name",
      for: "for",
      
      // Step 2
      selectAgents: "Select AI Agents",
      chooseAgents: "Choose the AI agents you want to include in this pipeline",
      codeReview: "Code Review Agent",
      codeReviewDesc: "Reviews code for quality, security, and best practices",
      securityScan: "Security Scanner",
      securityScanDesc: "Scans for security vulnerabilities and issues",
      testGenerator: "Test Generator",
      testGeneratorDesc: "Automatically generates unit and integration tests",
      documentation: "Documentation Generator",
      documentationDesc: "Creates and updates project documentation",
      
      // Step 3
      configureTriggers: "Configure Triggers",
      whenToRun: "When should this pipeline run?",
      pushToMain: "Push to main branch",
      pullRequest: "Pull request created",
      manual: "Manual trigger only",
      scheduled: "Scheduled run",
      
      // Step 4
      reviewAndFinish: "Review and Finish",
      reviewSettings: "Review your pipeline settings below",
      selectedAgents: "Selected AI Agents",
      triggerCondition: "Trigger Condition",
      pipelineCreated: "Pipeline created successfully!",
      
      // Common actions
      runPipeline: "Run Pipeline",
      configure: "Configure"
    },
    
    // Help
    help: {
      title: "Help & Support",
      subtitle: "Get help and support for your questions",
      faq: "Frequently Asked Questions",
      aiAssistant: "AI Assistant",
      chatPlaceholder: "Ask me anything about pipelines, projects, or platform features...",
      send: "Send",
      
      // FAQ items
      faqItems: {
        createPipeline: {
          question: "How do I create a new pipeline?",
          answer: "Go to a project and click 'Create Pipeline'. Follow the 4-step wizard to configure your pipeline with AI agents and triggers."
        },
        configureTriggers: {
          question: "How do I configure pipeline triggers?",
          answer: "In the pipeline wizard step 3, choose when your pipeline should run: on code pushes, pull requests, manually, or on a schedule."
        },
        aiAgents: {
          question: "What AI agents are available?",
          answer: "We offer Code Review, Security Scanner, Test Generator, and Documentation Generator agents. Each agent specializes in different aspects of code quality."
        },
        viewResults: {
          question: "How do I view pipeline results?",
          answer: "Click 'View Details' on any pipeline to see run history, AI agent results, and detailed logs of each execution."
        }
      }
    },
    
    // Settings
    settings: {
      title: "Settings",
      subtitle: "Manage your company settings and preferences",
      company: "Company",
      team: "Team", 
      security: "Security",
      notifications: "Notifications",
      language: "Language",
      
      // Company tab
      companyInfo: "Company Information",
      companyName: "Company Name",
      website: "Website",
      description: "Description",
      descriptionPlaceholder: "Leading technology company focused on innovative solutions.",
      saveChanges: "Save Changes",
      
      // Team tab
      teamSettings: "Team Settings",
      autoAddMembers: "Auto-add team members to new projects",
      autoAddMembersDesc: "Automatically give access to new projects for all team members",
      requireApproval: "Require approval for new team members",
      requireApprovalDesc: "Admin approval required before new members can join",
      
      // Security tab
      securitySettings: "Security Settings",
      twoFactor: "Two-factor authentication",
      twoFactorDesc: "Require 2FA for all team members",
      sessionTimeout: "Session timeout",
      sessionTimeoutDesc: "Automatically log out inactive users after 8 hours",
      ipRestrictions: "IP restrictions",
      ipRestrictionsDesc: "Only allow access from company IP addresses",
      
      // Notifications tab
      notificationPreferences: "Notification Preferences",
      pipelineFailures: "Pipeline failure notifications",
      pipelineFailuresDesc: "Get notified when pipelines fail",
      securityAlerts: "Security alerts",
      securityAlertsDesc: "Receive alerts for security issues",
      weeklyReports: "Weekly reports",
      weeklyReportsDesc: "Get weekly summary reports via email",
      
      // Language settings
      languageSettings: "Language Settings",
      selectLanguage: "Select Language",
      english: "English",
      russian: "Русский",
    },
    
    // Common
    common: {
      active: "Active",
      inactive: "Inactive",
      success: "Success",
      failed: "Failed",
      pending: "Pending",
      running: "Running",
      completed: "Completed",
      cancelled: "Cancelled"
    }
  },
  ru: {
    // Navigation
    nav: {
      dashboard: "Панель управления",
      projects: "Проекты",
      allPipelines: "Все пайплайны",
      settings: "Настройки",
      help: "Помощь и поддержка"
    },
    
    // Dashboard
    dashboard: {
      title: "Панель управления",
      subtitle: "Обзор производительности ваших проектов и пайплайнов",
      totalProjects: "Всего проектов",
      activePipelines: "Активные пайплайны",
      codeLines: "Строк кода",
      bugsSolved: "Исправлено багов",
      teamMembers: "Участников команды",
      avgRuntime: "Среднее время выполнения",
      recentActivity: "Недавняя активность",
      projectPerformance: "Производительность проектов",
      pipelineActivity: "Активность пайплайнов",
      lastWeek: "Последние 7 дней",
      fromLastMonth: "с прошлого месяца",
      queueTime: "Время в очереди",
      projects: "Проекты",
      pipelines: "Пайплайны",
      bugs: "Баги",
      runtime: "Время выполнения"
    },
    
    // Projects
    projects: {
      title: "Проекты",
      subtitle: "Управление вашими проектами и пайплайнами",
      createProject: "Создать новый проект",
      viewProject: "Просмотреть проект",
      noPipelines: "Нет пайплайнов",
      pipeline: "пайплайн",
      pipelines: "пайплайнов",
      activePipelines: "Активные пайплайны",
      total: "всего"
    },
    
    // Project Detail
    projectDetail: {
      backToProjects: "Назад к проектам",
      createPipeline: "Создать пайплайн",
      projectPipelines: "Пайплайны проекта",
      noPipelinesMessage: "Пайплайны еще не созданы. Создайте свой первый пайплайн для автоматизации рабочих процессов.",
      status: "Статус",
      trigger: "Триггер",
      lastRun: "Последний запуск",
      actions: "Действия"
    },
    
    // All Pipelines
    allPipelines: {
      title: "Все пайплайны",
      subtitle: "Мониторинг и управление всеми пайплайнами проектов",
      searchPlaceholder: "Поиск пайплайнов...",
      filterByProject: "Фильтр по проекту",
      allProjects: "Все проекты",
      pipeline: "Пайплайн",
      project: "Проект",
      status: "Статус",
      trigger: "Триггер",
      lastRun: "Последний запуск",
      actions: "Действия",
      viewDetails: "Подробности",
      allStatus: "Все статусы",
      active: "Активный",
      inactive: "Неактивный",
      moreFilters: "Больше фильтров",
      noPipelinesFound: "Пайплайны не найдены",
      createFirst: "Создайте свой первый проект для работы с пайплайнами"
    },
    
    // Pipeline Detail
    pipelineDetail: {
      backToPipelines: "Назад к пайплайнам",
      configure: "Настроить",
      runPipeline: "Запустить пайплайн",
      running: "Выполняется...",
      lastRun: "Последний запуск",
      successRate: "Успешность",
      avgDuration: "Средняя длительность",
      totalRuns: "Всего запусков",
      never: "Никогда",
      lastDays: "Последние 30 дней",
      typicalRuntime: "Обычное время выполнения",
      allTime: "За все время",
      overview: "Обзор",
      history: "История запусков",
      agents: "ИИ агенты",
      settings: "Настройки",
      pipelineOverview: "Обзор пайплайна",
      configuration: "Конфигурация",
      recentPerformance: "Недавняя производительность",
      runHistory: "История запусков",
      viewLogs: "Просмотр логов",
      report: "Отчет",
      aiAgentsResults: "Результаты ИИ агентов",
      noIssues: "Проблем не найдено",
      issuesFound: "найдено проблем",
      viewDetails: "Подробности",
      pipelineSettings: "Настройки пайплайна",
      pipelineName: "Название пайплайна",
      triggerCondition: "Условие триггера",
      created: "Создан",
      enabledAgents: "Включенные ИИ агенты",
      editPipeline: "Редактировать пайплайн"
    },
    
    // Pipeline Wizard
    wizard: {
      createPipeline: "Создать пайплайн",
      stepOf: "Шаг {current} из {total}",
      back: "Назад",
      next: "Далее",
      finish: "Завершить",
      cancel: "Отмена",
      
      // Step 1
      pipelineBasics: "Основы пайплайна",
      pipelineName: "Название пайплайна",
      pipelineNamePlaceholder: "Введите название пайплайна",
      for: "для",
      
      // Step 2
      selectAgents: "Выбор ИИ агентов",
      chooseAgents: "Выберите ИИ агентов, которых хотите включить в этот пайплайн",
      codeReview: "Агент проверки кода",
      codeReviewDesc: "Проверяет код на качество, безопасность и лучшие практики",
      securityScan: "Сканер безопасности",
      securityScanDesc: "Сканирует уязвимости и проблемы безопасности",
      testGenerator: "Генератор тестов",
      testGeneratorDesc: "Автоматически генерирует модульные и интеграционные тесты",
      documentation: "Генератор документации",
      documentationDesc: "Создает и обновляет документацию проекта",
      
      // Step 3
      configureTriggers: "Настройка триггеров",
      whenToRun: "Когда должен запускаться этот пайплайн?",
      pushToMain: "Пуш в основную ветку",
      pullRequest: "Создание pull request",
      manual: "Только ручной запуск",
      scheduled: "Запуск по расписанию",
      
      // Step 4
      reviewAndFinish: "Проверка и завершение",
      reviewSettings: "Просмотрите настройки вашего пайплайна ниже",
      selectedAgents: "Выбранные ИИ агенты",
      triggerCondition: "Условие триггера",
      pipelineCreated: "Пайплайн успешно создан!",
      
      // Common actions
      runPipeline: "Запустить пайплайн",
      configure: "Настроить"
    },
    
    // Help
    help: {
      title: "Помощь и поддержка",
      subtitle: "Получите помощь и поддержку по вашим вопросам",
      faq: "Часто задаваемые вопросы",
      aiAssistant: "ИИ помощник",
      chatPlaceholder: "Спросите меня о пайплайнах, проектах или возможностях платформы...",
      send: "Отправить",
      
      // FAQ items
      faqItems: {
        createPipeline: {
          question: "Как создать новый пайплайн?",
          answer: "Перейдите в проект и нажмите 'Создать пайплайн'. Следуйте 4-шаговому мастеру для настройки пайплайна с ИИ агентами и триггерами."
        },
        configureTriggers: {
          question: "Как настроить триггеры пайплайна?",
          answer: "На 3-м шаге мастера пайплайна выберите, когда должен запускаться ваш пайплайн: при пуше кода, pull request, вручную или по расписанию."
        },
        aiAgents: {
          question: "Какие ИИ агенты доступны?",
          answer: "Мы предлагаем агентов проверки кода, сканера безопасности, генератора тестов и генератора документации. Каждый агент специализируется на разных аспектах качества кода."
        },
        viewResults: {
          question: "Как просмотреть результаты пайплайна?",
          answer: "Нажмите 'Подробности' на любом пайплайне, чтобы увидеть историю запусков, результаты ИИ агентов и подробные логи каждого выполнения."
        }
      }
    },
    
    // Settings
    settings: {
      title: "Настройки",
      subtitle: "Управление настройками компании и предпочтениями",
      company: "Компания",
      team: "Команда",
      security: "Безопасность", 
      notifications: "Уведомления",
      language: "Язык",
      
      // Company tab
      companyInfo: "Информация о компании",
      companyName: "Название компании",
      website: "Веб-сайт",
      description: "Описание",
      descriptionPlaceholder: "Ведущая технологическая компания, специализирующаяся на инновационных решениях.",
      saveChanges: "Сохранить изменения",
      
      // Team tab
      teamSettings: "Настройки команды",
      autoAddMembers: "Автоматически добавлять участников команды в новые проекты",
      autoAddMembersDesc: "Автоматически предоставлять доступ к новым проектам всем участникам команды",
      requireApproval: "Требовать одобрение для новых участников команды",
      requireApprovalDesc: "Требуется одобрение администратора перед присоединением новых участников",
      
      // Security tab
      securitySettings: "Настройки безопасности",
      twoFactor: "Двухфакторная аутентификация",
      twoFactorDesc: "Требовать 2FA для всех участников команды",
      sessionTimeout: "Тайм-аут сессии",
      sessionTimeoutDesc: "Автоматически выходить из системы неактивных пользователей через 8 часов",
      ipRestrictions: "IP-ограничения",
      ipRestrictionsDesc: "Разрешить доступ только с IP-адресов компании",
      
      // Notifications tab
      notificationPreferences: "Настройки уведомлений",
      pipelineFailures: "Уведомления о сбоях пайплайнов",
      pipelineFailuresDesc: "Получать уведомления при сбое пайплайнов",
      securityAlerts: "Оповещения безопасности",
      securityAlertsDesc: "Получать оповещения о проблемах безопасности",
      weeklyReports: "Еженедельные отчеты",
      weeklyReportsDesc: "Получать еженедельные сводные отчеты по электронной почте",
      
      // Language settings
      languageSettings: "Настройки языка",
      selectLanguage: "Выберите язык",
      english: "English",
      russian: "Русский",
    },
    
    // Common
    common: {
      active: "Активен",
      inactive: "Неактивен",
      success: "Успешно",
      failed: "Ошибка",
      pending: "Ожидание",
      running: "Выполняется",
      completed: "Завершено",
      cancelled: "Отменено"
    }
  }
};

export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}