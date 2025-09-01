import { CreateProjectForm } from "@/components/create-project-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/contexts/language-context";

interface CreateProjectProps {
  onBack: () => void;
  onSubmit: (projectData: {
    name: string;
    description: string;
    gitProvider: string;
    gitRepository: any;
    gitBranch: string;
  }) => void;
}

export function CreateProject({ onBack, onSubmit }: CreateProjectProps) {
  const { t } = useTranslation();

  const handleSubmit = (projectData: {
    name: string;
    description: string;
    gitProvider: string;
    gitRepository: any;
    gitBranch: string;
  }) => {
    onSubmit(projectData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Создание проекта</h1>
          <p className="text-muted-foreground mt-1">
            Создайте новый проект и подключите Git-репозиторий
          </p>
        </div>
      </div>

      <CreateProjectForm 
        onSubmit={handleSubmit}
        onCancel={onBack}
      />
    </div>
  );
}
