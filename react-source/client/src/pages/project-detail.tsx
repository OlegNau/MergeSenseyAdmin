import { ArrowLeft, Plus, Play } from "lucide-react";
import { useState } from "react";
import { PipelineRow } from "@/components/pipeline-row";
import { PipelineWizard } from "@/components/pipeline-wizard/pipeline-wizard";
import type { ProjectWithPipelines, Pipeline } from "@shared/schema";
import { useTranslation } from "@/contexts/language-context";

interface ProjectDetailProps {
  project: ProjectWithPipelines;
  onBack: () => void;
  onPipelineCreate: (projectId: string, pipelineData: {
    name: string;
    agents: string[];
    trigger: string;
  }) => void;
  onPipelineDetails?: (pipeline: Pipeline) => void;
}

export function ProjectDetail({ project, onBack, onPipelineCreate, onPipelineDetails }: ProjectDetailProps) {
  const { t } = useTranslation();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handlePipelineComplete = (pipelineData: {
    name: string;
    agents: string[];
    trigger: string;
  }) => {
    onPipelineCreate(project.id, pipelineData);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          data-testid="button-back-to-projects"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('projectDetail.backToProjects')}</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground" data-testid={`text-project-detail-name-${project.id}`}>
            {project.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl" data-testid={`text-project-detail-description-${project.id}`}>
            {project.description}
          </p>
        </div>
        <button 
          className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
          onClick={() => setIsWizardOpen(true)}
          data-testid="button-create-pipeline"
        >
          <Plus className="w-5 h-5" />
          <span>{t('projectDetail.createPipeline')}</span>
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground" data-testid="text-pipelines-title">
            {t('projectDetail.projectPipelines')}
          </h2>
          <p className="text-muted-foreground text-sm mt-1" data-testid="text-pipelines-subtitle">
            {t('projectDetail.noPipelinesMessage')}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.pipeline')}</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.status')}</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.lastRun')}</th>
                <th className="text-left py-3 px-6 font-medium text-muted-foreground">{t('allPipelines.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {project.pipelines.map(pipeline => (
                <PipelineRow 
                  key={pipeline.id} 
                  pipeline={pipeline} 
                  onViewDetails={onPipelineDetails}
                />
              ))}
            </tbody>
          </table>
        </div>

        {project.pipelines.length === 0 && (
          <div className="p-12 text-center">
            <div className="p-3 bg-muted/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Play className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-card-foreground mb-2" data-testid="text-no-pipelines-title">
              {t('projectDetail.noPipelinesMessage')}
            </h3>
            <p className="text-muted-foreground mb-4" data-testid="text-no-pipelines-description">
              Get started by creating your first pipeline
            </p>
            <button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
              onClick={() => setIsWizardOpen(true)}
              data-testid="button-create-first-pipeline"
            >
              Configure Pipeline
            </button>
          </div>
        )}
      </div>

      <PipelineWizard
        project={project}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onComplete={handlePipelineComplete}
      />
    </div>
  );
}
