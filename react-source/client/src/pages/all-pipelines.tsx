import { Play, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProjectWithPipelines, Pipeline } from "@shared/schema";
import { useTranslation } from "@/contexts/language-context";

interface AllPipelinesProps {
  projects: ProjectWithPipelines[];
  onPipelineDetails?: (pipeline: Pipeline, project: ProjectWithPipelines) => void;
}

export function AllPipelines({ projects, onPipelineDetails }: AllPipelinesProps) {
  const { t } = useTranslation();
  const allPipelines = projects.flatMap(project => 
    project.pipelines.map(pipeline => ({
      ...pipeline,
      projectName: project.name,
      project: project
    }))
  );

  const formatLastRun = (date: Date | null) => {
    if (!date) return t('pipelineDetail.never');
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-all-pipelines-title">
          {t('allPipelines.title')}
        </h1>
        <p className="text-muted-foreground mt-1" data-testid="text-all-pipelines-subtitle">
          {t('allPipelines.subtitle')}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('allPipelines.searchPlaceholder')}
            className="pl-10"
            data-testid="input-search-pipelines"
          />
        </div>
        <Select>
          <SelectTrigger className="w-40" data-testid="select-filter-status">
            <SelectValue placeholder={t('allPipelines.filterByProject')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allPipelines.allStatus')}</SelectItem>
            <SelectItem value="active">{t('allPipelines.active')}</SelectItem>
            <SelectItem value="inactive">{t('allPipelines.inactive')}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" data-testid="button-more-filters">
          <Filter className="w-4 h-4 mr-2" />
          {t('allPipelines.moreFilters')}
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.pipeline')}</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.project')}</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.status')}</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.trigger')}</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.lastRun')}</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {allPipelines.map((pipeline) => (
                <tr 
                  key={pipeline.id} 
                  className="border-b border-border hover:bg-muted/50"
                  data-testid={`row-pipeline-${pipeline.id}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <Play className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-card-foreground" data-testid={`text-pipeline-name-${pipeline.id}`}>
                        {pipeline.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-muted-foreground" data-testid={`text-project-name-${pipeline.id}`}>
                      {pipeline.projectName}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pipeline.status === 'Active' ? 'status-active' : 'status-inactive'
                      }`}
                      data-testid={`status-pipeline-${pipeline.id}`}
                    >
                      {pipeline.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-muted-foreground text-sm" data-testid={`text-trigger-${pipeline.id}`}>
                      {pipeline.trigger}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    <span data-testid={`text-pipeline-lastrun-${pipeline.id}`}>
                      {formatLastRun(pipeline.lastRun)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onPipelineDetails?.(pipeline, pipeline.project)}
                      data-testid={`button-view-details-${pipeline.id}`}
                    >
                      {t('allPipelines.viewDetails')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {allPipelines.length === 0 && (
          <div className="p-12 text-center">
            <div className="p-3 bg-muted/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Play className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-card-foreground mb-2" data-testid="text-no-pipelines-title">
              {t('allPipelines.noPipelinesFound')}
            </h3>
            <p className="text-muted-foreground" data-testid="text-no-pipelines-description">
              {t('allPipelines.createFirst')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}