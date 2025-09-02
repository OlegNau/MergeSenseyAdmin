import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Gitlab, GitBranch, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "@/contexts/language-context";

interface GitRepository {
  id: string;
  name: string;
  fullName: string;
  url: string;
  description?: string;
  private: boolean;
  defaultBranch: string;
}

interface CreateProjectFormProps {
  onSubmit: (projectData: {
    name: string;
    description: string;
    gitProvider: string;
    gitRepository: GitRepository | null;
    gitBranch: string;
  }) => void;
  onCancel: () => void;
}

export function CreateProjectForm({ onSubmit, onCancel }: CreateProjectFormProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<'details' | 'git-setup' | 'repository-select'>('details');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gitProvider: '',
    gitRepository: null as GitRepository | null,
    gitBranch: 'main'
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [repositories, setRepositories] = useState<GitRepository[]>([]);

  const gitProviders = [
    { id: 'github', name: 'GitHub', icon: Github, color: 'bg-gray-900' },
    { id: 'gitlab', name: 'GitLab', icon: Gitlab, color: 'bg-orange-600' },
    { id: 'bitbucket', name: 'Bitbucket', icon: GitBranch, color: 'bg-blue-600' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGitProviderSelect = (provider: string) => {
    setFormData(prev => ({ ...prev, gitProvider: provider }));
    setStep('git-setup');
  };

  const handleConnectGit = async () => {
    setIsConnecting(true);
    
    // Имитация процесса подключения к Git-провайдеру
    setTimeout(() => {
      // В реальном приложении здесь будет OAuth flow
      const mockRepositories: GitRepository[] = [
        {
          id: '1',
          name: 'merge-sensei',
          fullName: 'user/merge-sensei',
          url: 'https://github.com/user/merge-sensei',
          description: 'AI-powered merge conflict resolution tool',
          private: false,
          defaultBranch: 'main'
        },
        {
          id: '2',
          name: 'project-alpha',
          fullName: 'user/project-alpha',
          url: 'https://github.com/user/project-alpha',
          description: 'Web application for project management',
          private: true,
          defaultBranch: 'develop'
        }
      ];
      
      setRepositories(mockRepositories);
      setStep('repository-select');
      setIsConnecting(false);
    }, 2000);
  };

  const handleRepositorySelect = (repository: GitRepository) => {
    setFormData(prev => ({ 
      ...prev, 
      gitRepository: repository,
      gitBranch: repository.defaultBranch 
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.description && formData.gitProvider && formData.gitRepository) {
      onSubmit(formData);
    }
  };

  const canProceed = formData.name.trim() !== '' && formData.description.trim() !== '';
  const canSubmit = canProceed && formData.gitProvider && formData.gitRepository;

  if (step === 'git-setup') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Подключение к {gitProviders.find(p => p.id === formData.gitProvider)?.name}
          </CardTitle>
          <CardDescription>
            Для подключения репозитория необходимо авторизоваться в системе
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              {formData.gitProvider === 'github' && <Github className="w-8 h-8 text-primary" />}
              {formData.gitProvider === 'gitlab' && <Gitlab className="w-8 h-8 text-primary" />}
              {formData.gitProvider === 'bitbucket' && <GitBranch className="w-8 h-8 text-primary" />}
            </div>
            <p className="text-muted-foreground mb-4">
              Вы будете перенаправлены на страницу авторизации
            </p>
            <Button 
              onClick={handleConnectGit}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? 'Подключение...' : 'Подключить репозиторий'}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep('details')} className="flex-1">
              Назад
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'repository-select') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Выберите репозиторий
          </CardTitle>
          <CardDescription>
            Выберите репозиторий для подключения к проекту
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  formData.gitRepository?.id === repo.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleRepositorySelect(repo)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{repo.name}</h3>
                      {repo.private && (
                        <Badge variant="secondary" className="text-xs">Приватный</Badge>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        {repo.defaultBranch}
                      </span>
                      <span>{repo.fullName}</span>
                    </div>
                  </div>
                  {formData.gitRepository?.id === repo.id && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {formData.gitRepository && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Выбранный репозиторий:</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono">{formData.gitRepository.fullName}</span>
                <Badge variant="outline">{formData.gitRepository.defaultBranch}</Badge>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep('git-setup')} className="flex-1">
              Назад
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex-1"
            >
              Создать проект
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Создание нового проекта</CardTitle>
        <CardDescription>
          Заполните основную информацию о проекте
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project-name">Название проекта *</Label>
          <Input
            id="project-name"
            placeholder="Введите название проекта"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-description">Описание *</Label>
          <Textarea
            id="project-description"
            placeholder="Опишите назначение проекта"
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Git-репозиторий</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Подключите Git-репозиторий для автоматизации процессов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {gitProviders.map((provider) => (
              <div
                key={provider.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
                  formData.gitProvider === provider.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => handleGitProviderSelect(provider.id)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${provider.color}`}>
                    <provider.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">{provider.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Отмена
          </Button>
          <Button 
            onClick={() => setStep('git-setup')}
            disabled={!canProceed || !formData.gitProvider}
            className="flex-1"
          >
            Продолжить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
