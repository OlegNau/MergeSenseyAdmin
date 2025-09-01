import { useState } from "react";
import { ArrowLeft, Play, Pause, Settings, Clock, CheckCircle, XCircle, AlertTriangle, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import type { Pipeline, ProjectWithPipelines } from "@shared/schema";
import { useTranslation } from "@/contexts/language-context";

interface PipelineDetailProps {
  pipeline: Pipeline;
  project: ProjectWithPipelines;
  onBack: () => void;
}

export function PipelineDetail({ pipeline, project, onBack }: PipelineDetailProps) {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return t('pipelineDetail.never');
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to safely parse pipeline agents
  const parsePipelineAgents = (agents: any): string[] => {
    try {
      if (typeof agents === 'string') {
        const parsed = JSON.parse(agents);
        return Array.isArray(parsed) ? parsed : [];
      }
      return Array.isArray(agents) ? agents : [];
    } catch (error) {
      console.warn('Failed to parse pipeline agents:', error);
      return [];
    }
  };

  const mockRunHistory = [
    {
      id: "run-1",
      status: "success",
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 3 * 60 * 1000),
      duration: "3m 24s",
      triggeredBy: "push to main",
    },
    {
      id: "run-2", 
      status: "failed",
      startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 6 * 60 * 60 * 1000 + 1 * 60 * 1000),
      duration: "1m 15s",
      triggeredBy: "manual",
    },
    {
      id: "run-3",
      status: "success",
      startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 24 * 60 * 60 * 1000 + 4 * 60 * 1000),
      duration: "4m 02s", 
      triggeredBy: "push to main",
    },
  ];

  const mockAgentResults = parsePipelineAgents(pipeline.agents).map((agentId: string) => ({
    agentId,
    name: agentId.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    status: Math.random() > 0.3 ? "passed" : "failed",
    issues: Math.floor(Math.random() * 5),
    duration: `${Math.floor(Math.random() * 60) + 10}s`,
  }));

  const handleRunPipeline = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
          data-testid="button-back-to-pipelines"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('pipelineDetail.backToPipelines')}</span>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground" data-testid={`text-pipeline-detail-name-${pipeline.id}`}>
              {pipeline.name}
            </h1>
            <Badge 
              variant={pipeline.status === 'Active' ? 'default' : 'secondary'}
              data-testid={`badge-pipeline-status-${pipeline.id}`}
            >
              {pipeline.status}
            </Badge>
          </div>
          <p className="text-muted-foreground" data-testid={`text-pipeline-project-${pipeline.id}`}>
            {project.name} • {t('allPipelines.trigger')}: {pipeline.trigger}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            data-testid="button-configure-pipeline"
          >
            <Settings className="w-4 h-4 mr-2" />
            {t('pipelineDetail.configure')}
          </Button>
          <Button 
            onClick={handleRunPipeline}
            disabled={isRunning}
            data-testid="button-run-pipeline"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                {t('pipelineDetail.running')}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {t('pipelineDetail.runPipeline')}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card data-testid="card-last-run">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('pipelineDetail.lastRun')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDate(pipeline.lastRun)}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-success-rate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('pipelineDetail.successRate')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-xs text-muted-foreground">{t('pipelineDetail.lastDays')}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-avg-duration">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('pipelineDetail.avgDuration')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 24s</div>
            <div className="text-xs text-muted-foreground">{t('pipelineDetail.typicalRuntime')}</div>
          </CardContent>
        </Card>

        <Card data-testid="card-total-runs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('pipelineDetail.totalRuns')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <div className="text-xs text-muted-foreground">{t('pipelineDetail.allTime')}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" data-testid="tab-overview">{t('pipelineDetail.overview')}</TabsTrigger>
          <TabsTrigger value="history" data-testid="tab-history">{t('pipelineDetail.history')}</TabsTrigger>
          <TabsTrigger value="agents" data-testid="tab-agents">{t('pipelineDetail.agents')}</TabsTrigger>
          <TabsTrigger value="settings" data-testid="tab-settings">{t('pipelineDetail.settings')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card data-testid="card-pipeline-overview">
            <CardHeader>
              <CardTitle>{t('pipelineDetail.pipelineOverview')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">{t('pipelineDetail.configuration')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('allPipelines.trigger')}:</span>
                      <span>{pipeline.trigger}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('allPipelines.status')}:</span>
                      <span>{pipeline.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('pipelineDetail.agents')}:</span>
                      <span>{pipeline.agents?.length || 0}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Recent Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Average Duration</span>
                      <span>3m 24s</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card data-testid="card-run-history">
            <CardHeader>
              <CardTitle>Run History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRunHistory.map((run) => (
                  <div 
                    key={run.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                    data-testid={`run-history-item-${run.id}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {run.status === 'success' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className="font-medium capitalize">{run.status}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(run.startTime)} • {run.duration} • {run.triggeredBy}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" data-testid={`button-view-logs-${run.id}`}>
                        <Eye className="w-4 h-4 mr-1" />
                        View Logs
                      </Button>
                      <Button variant="ghost" size="sm" data-testid={`button-download-report-${run.id}`}>
                        <Download className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card data-testid="card-ai-agents">
            <CardHeader>
              <CardTitle>AI Agents Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAgentResults.map((agent) => (
                  <div 
                    key={agent.agentId}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                    data-testid={`agent-result-${agent.agentId}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {agent.status === 'passed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                        )}
                        <span className="font-medium">{agent.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {agent.issues > 0 ? `${agent.issues} issues found` : 'No issues'} • {agent.duration}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" data-testid={`button-view-agent-details-${agent.agentId}`}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card data-testid="card-pipeline-settings">
            <CardHeader>
              <CardTitle>Pipeline Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Pipeline Name</label>
                    <p className="text-muted-foreground">{pipeline.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Trigger Condition</label>
                    <p className="text-muted-foreground">{pipeline.trigger}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <p className="text-muted-foreground">{pipeline.status}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Created</label>
                    <p className="text-muted-foreground">{formatDate(pipeline.createdAt)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Enabled AI Agents</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {parsePipelineAgents(pipeline.agents).map((agentId: string) => (
                      <Badge key={agentId} variant="outline" data-testid={`agent-badge-${agentId}`}>
                        {agentId.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="outline" data-testid="button-edit-pipeline">
                    Edit Pipeline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}