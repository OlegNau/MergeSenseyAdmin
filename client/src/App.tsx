import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/language-context";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardStats } from "@/pages/dashboard-stats";
import { Projects } from "@/pages/projects";
import { AllPipelines } from "@/pages/all-pipelines";
import { Settings } from "@/pages/settings";
import { Help } from "@/pages/help";
import { ProjectDetail } from "@/pages/project-detail";
import { PipelineDetail } from "@/pages/pipeline-detail";
import { CreateProject } from "@/pages/create-project";
import { mockProjects } from "@/data/mock-data";
import type { ProjectWithPipelines, Pipeline } from "@shared/schema";

function ProjectManagementApp() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'projects' | 'all-pipelines' | 'settings' | 'help' | 'project-detail' | 'pipeline-detail' | 'create-project'>('dashboard');
  const [selectedProject, setSelectedProject] = useState<ProjectWithPipelines | null>(null);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [projects, setProjects] = useState<ProjectWithPipelines[]>(mockProjects);

  const handleProjectSelect = (project: ProjectWithPipelines) => {
    // Find the updated project data to ensure we have the latest pipelines
    const updatedProject = projects.find(p => p.id === project.id) || project;
    setSelectedProject(updatedProject);
    setCurrentView('project-detail');
  };

  const handleNavigate = (view: 'dashboard' | 'projects' | 'all-pipelines' | 'settings' | 'help') => {
    setCurrentView(view);
    setSelectedProject(null);
  };

  const handleCreateProject = () => {
    setCurrentView('create-project');
  };

  const handleBackToProjects = () => {
    setCurrentView('projects');
    setSelectedProject(null);
  };

  const handleProjectCreate = (projectData: {
    name: string;
    description: string;
    gitProvider: string;
    gitRepository: any;
    gitBranch: string;
  }) => {
    const newProject: ProjectWithPipelines = {
      id: `project-${Date.now()}`,
      name: projectData.name,
      description: projectData.description,
      gitProvider: projectData.gitProvider,
      gitRepositoryUrl: projectData.gitRepository.url,
      gitRepositoryId: projectData.gitRepository.id,
      gitBranch: projectData.gitBranch,
      gitAccessToken: null,
      createdAt: new Date(),
      pipelines: []
    };

    setProjects(prev => [...prev, newProject]);
    setSelectedProject(newProject);
    setCurrentView('project-detail');
  };

  const handlePipelineDetails = (pipeline: Pipeline, project?: ProjectWithPipelines) => {
    setSelectedPipeline(pipeline);
    if (project) {
      setSelectedProject(project);
    }
    setCurrentView('pipeline-detail');
  };

  const handleBackToPipelines = () => {
    if (selectedProject) {
      setCurrentView('project-detail');
    } else {
      setCurrentView('all-pipelines');
    }
    setSelectedPipeline(null);
  };

  const handlePipelineCreate = (projectId: string, pipelineData: {
    name: string;
    agents: string[];
    trigger: string;
  }) => {
    const newPipeline: Pipeline = {
      id: `pipeline-${Date.now()}`,
      projectId,
      name: pipelineData.name,
      status: 'Active',
      agents: JSON.stringify(pipelineData.agents),
      trigger: pipelineData.trigger,
      lastRun: null,
      createdAt: new Date(),
    };

    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, pipelines: [...project.pipelines, newPipeline] }
        : project
    ));

    // Update selected project if it's the one we're adding to
    if (selectedProject?.id === projectId) {
      setSelectedProject(prev => prev ? {
        ...prev,
        pipelines: [...prev.pipelines, newPipeline]
      } : null);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardStats projects={projects} />;
      case 'projects':
        return <Projects projects={projects} onProjectSelect={handleProjectSelect} onCreateProject={handleCreateProject} />;
      case 'all-pipelines':
        return <AllPipelines projects={projects} onPipelineDetails={handlePipelineDetails} />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <Help />;
      case 'create-project':
        return <CreateProject onBack={handleBackToProjects} onSubmit={handleProjectCreate} />;
      case 'project-detail':
        return selectedProject ? (
          <ProjectDetail 
            project={selectedProject} 
            onBack={handleBackToProjects}
            onPipelineCreate={handlePipelineCreate}
            onPipelineDetails={(pipeline) => handlePipelineDetails(pipeline, selectedProject)}
          />
        ) : null;
      case 'pipeline-detail':
        return selectedPipeline && selectedProject ? (
          <PipelineDetail
            pipeline={selectedPipeline}
            project={selectedProject}
            onBack={handleBackToPipelines}
          />
        ) : null;
      default:
        return <DashboardStats projects={projects} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar 
            currentView={currentView}
            onNavigate={handleNavigate}
          />
          <main className="flex-1 p-6">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={ProjectManagementApp} />
      <Route path="/projects" component={ProjectManagementApp} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
