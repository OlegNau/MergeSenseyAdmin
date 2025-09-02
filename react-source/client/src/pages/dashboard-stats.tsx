import { TrendingUp, Activity, Code, Bug, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectWithPipelines } from "@shared/schema";
import { useTranslation } from "@/contexts/language-context";

interface DashboardStatsProps {
  projects: ProjectWithPipelines[];
}

export function DashboardStats({ projects }: DashboardStatsProps) {
  const { t } = useTranslation();
  const totalProjects = projects.length;
  const totalPipelines = projects.reduce((sum, project) => sum + project.pipelines.length, 0);
  const activePipelines = projects.reduce((sum, project) => 
    sum + project.pipelines.filter(p => p.status === 'Active').length, 0
  );
  
  // Mock statistics - in real app these would come from actual data
  const stats = [
    {
      title: t('dashboard.totalProjects'),
      value: totalProjects,
      icon: <TrendingUp className="h-5 w-5" />,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: t('dashboard.activePipelines'),
      value: activePipelines,
      icon: <Activity className="h-5 w-5" />,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: t('dashboard.codeLines'),
      value: "2.4M",
      icon: <Code className="h-5 w-5" />,
      change: "+15%",
      changeType: "positive" as const,
    },
    {
      title: t('dashboard.bugsSolved'),
      value: "142",
      icon: <Bug className="h-5 w-5" />,
      change: "-5%",
      changeType: "negative" as const,
    },
    {
      title: t('dashboard.teamMembers'),
      value: "24",
      icon: <Users className="h-5 w-5" />,
      change: "+2",
      changeType: "positive" as const,
    },
    {
      title: t('dashboard.avgRuntime'),
      value: "3.2m",
      icon: <Clock className="h-5 w-5" />,
      change: "-12%",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-dashboard-title">
          {t('dashboard.title')}
        </h1>
        <p className="text-muted-foreground mt-1" data-testid="text-dashboard-subtitle">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} data-testid={`card-stat-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="text-muted-foreground">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground" data-testid={`text-stat-value-${index}`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                <span 
                  className={
                    stat.changeType === 'positive' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }
                  data-testid={`text-stat-change-${index}`}
                >
                  {stat.change}
                </span>
                {" "}{t('dashboard.fromLastMonth')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-recent-activity">
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => 
                project.pipelines.slice(0, 2).map((pipeline) => (
                  <div 
                    key={pipeline.id} 
                    className="flex items-center justify-between border-b border-border pb-2 last:border-b-0"
                    data-testid={`activity-item-${pipeline.id}`}
                  >
                    <div>
                      <p className="font-medium text-sm">{pipeline.name}</p>
                      <p className="text-xs text-muted-foreground">{project.name}</p>
                    </div>
                    <div className="text-right">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          pipeline.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {pipeline.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-pipeline-performance">
          <CardHeader>
            <CardTitle>{t('dashboard.projectPerformance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('pipelineDetail.successRate')}</span>
                <span className="font-medium">94.2%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('pipelineDetail.avgDuration')}</span>
                <span className="font-medium">3.2 minutes</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t('dashboard.queueTime')}</span>
                <span className="font-medium">12 seconds</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}