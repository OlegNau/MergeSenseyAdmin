import { Plus } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectWithPipelines } from "@shared/schema";
import { useTranslation } from "@/contexts/language-context";

interface DashboardProps {
  projects: ProjectWithPipelines[];
  onProjectSelect: (project: ProjectWithPipelines) => void;
}

export function Dashboard({ projects, onProjectSelect }: DashboardProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-dashboard-title">{t('projects.title')}</h1>
          <p className="text-muted-foreground mt-1" data-testid="text-dashboard-subtitle">
            {t('projects.subtitle')}
          </p>
        </div>
        <button 
          className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors"
          data-testid="button-create-project"
        >
          <Plus className="w-5 h-5" />
          <span>{t('projects.createProject')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={onProjectSelect}
          />
        ))}
      </div>
    </div>
  );
}
