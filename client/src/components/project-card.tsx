import { Folder, Github, Gitlab, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectWithPipelines } from "@shared/schema";
import { useTranslation } from "@/contexts/language-context";

interface ProjectCardProps {
  project: ProjectWithPipelines;
  onClick: (project: ProjectWithPipelines) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { t } = useTranslation();
  const activePipelines = project.pipelines.filter(p => p.status === 'Active').length;
  
  const getGitIcon = (provider: string | null) => {
    switch (provider) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'gitlab':
        return <Gitlab className="w-4 h-4" />;
      case 'bitbucket':
        return <GitBranch className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getGitProviderName = (provider: string | null) => {
    switch (provider) {
      case 'github':
        return 'GitHub';
      case 'gitlab':
        return 'GitLab';
      case 'bitbucket':
        return 'Bitbucket';
      default:
        return '';
    }
  };
  
  return (
    <div 
      className="project-card bg-card border border-border rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors"
      onClick={() => onClick(project)}
      data-testid={`card-project-${project.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Folder className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground" data-testid={`text-project-name-${project.id}`}>
              {project.name}
            </h3>
          </div>
        </div>
        {project.gitProvider && (
          <Badge variant="outline" className="flex items-center gap-1">
            {getGitIcon(project.gitProvider)}
            {getGitProviderName(project.gitProvider)}
          </Badge>
        )}
      </div>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2" data-testid={`text-project-description-${project.id}`}>
        {project.description}
      </p>

      {project.gitRepositoryUrl && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <GitBranch className="w-3 h-3" />
            <span>Repository</span>
          </div>
          <div className="text-sm font-mono text-foreground truncate">
            {project.gitRepositoryUrl.split('/').slice(-2).join('/')}
          </div>
          {project.gitBranch && (
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {project.gitBranch}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground">
            {t('projects.activePipelines')}: <span className="text-primary font-medium" data-testid={`text-active-pipelines-${project.id}`}>{activePipelines}</span>
          </span>
        </div>
        <div className="text-muted-foreground" data-testid={`text-total-pipelines-${project.id}`}>
          {project.pipelines.length} {t('projects.total')}
        </div>
      </div>
    </div>
  );
}
