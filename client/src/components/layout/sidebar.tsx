import { Home, FolderOpen, Activity, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/language-context";

interface SidebarProps {
  currentView: 'dashboard' | 'projects' | 'all-pipelines' | 'settings' | 'help' | 'project-detail' | 'pipeline-detail' | 'create-project';
  onNavigate: (view: 'dashboard' | 'projects' | 'all-pipelines' | 'settings' | 'help') => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const { t } = useTranslation();
  return (
    <aside className="w-64 border-r border-border bg-card/30 backdrop-blur supports-[backdrop-filter]:bg-card/30 h-screen">
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Button
            variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onNavigate('dashboard')}
            data-testid="nav-dashboard"
          >
            <Home className="mr-3 h-5 w-5" />
            {t('nav.dashboard')}
          </Button>
          
          <Button 
            variant={currentView === 'projects' || currentView === 'project-detail' || currentView === 'pipeline-detail' || currentView === 'create-project' ? 'secondary' : 'ghost'}
            className="w-full justify-start" 
            onClick={() => onNavigate('projects')}
            data-testid="nav-projects"
          >
            <FolderOpen className="mr-3 h-5 w-5" />
            {t('nav.projects')}
          </Button>
          
          <Button 
            variant={currentView === 'all-pipelines' ? 'secondary' : 'ghost'}
            className="w-full justify-start" 
            onClick={() => onNavigate('all-pipelines')}
            data-testid="nav-pipelines"
          >
            <Activity className="mr-3 h-5 w-5" />
            {t('nav.allPipelines')}
          </Button>
          
          <div className="pt-4 mt-4 border-t border-border">
            <Button 
              variant={currentView === 'settings' ? 'secondary' : 'ghost'}
              className="w-full justify-start" 
              onClick={() => onNavigate('settings')}
              data-testid="nav-settings"
            >
              <Settings className="mr-3 h-5 w-5" />
              {t('nav.settings')}
            </Button>
            
            <Button 
              variant={currentView === 'help' ? 'secondary' : 'ghost'}
              className="w-full justify-start" 
              onClick={() => onNavigate('help')}
              data-testid="nav-help"
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              {t('nav.help')}
            </Button>
          </div>
        </nav>
      </div>
    </aside>
  );
}