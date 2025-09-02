import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProjectWithPipelines } from "@shared/schema";
import { useTranslation } from "@/contexts/language-context";

interface PipelineWizardProps {
  project: ProjectWithPipelines;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (pipelineData: {
    name: string;
    agents: string[];
    trigger: string;
  }) => void;
}

const AI_AGENTS = [
  { id: "code-review", name: "Code Review", description: "Automated code quality analysis" },
  { id: "security-scan", name: "Security Scanner", description: "Vulnerability detection and security checks" },
  { id: "performance", name: "Performance Analyzer", description: "Performance bottleneck detection" },
  { id: "test-generator", name: "Test Generator", description: "Automatic test case generation" },
  { id: "documentation", name: "Documentation AI", description: "Auto-generate and update documentation" },
  { id: "api-validator", name: "API Validator", description: "API contract and schema validation" },
];

const TRIGGER_OPTIONS = [
  { value: "push to main", label: "Push to main branch" },
  { value: "push to staging", label: "Push to staging branch" },
  { value: "push to production", label: "Push to production branch" },
  { value: "pull request", label: "Pull request created" },
  { value: "schedule daily", label: "Daily schedule" },
  { value: "schedule weekly", label: "Weekly schedule" },
  { value: "manual", label: "Manual trigger only" },
];

export function PipelineWizard({ project, isOpen, onClose, onComplete }: PipelineWizardProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [pipelineName, setPipelineName] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedTrigger, setSelectedTrigger] = useState("");

  const handleAgentToggle = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete({
      name: pipelineName,
      agents: selectedAgents,
      trigger: selectedTrigger,
    });
    // Reset form
    setCurrentStep(1);
    setPipelineName("");
    setSelectedAgents([]);
    setSelectedTrigger("");
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return pipelineName.trim().length > 0;
      case 2: return selectedAgents.length > 0;
      case 3: return selectedTrigger.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-pipeline-wizard">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle data-testid="text-wizard-title">
              {t('wizard.createPipeline')} {t('wizard.for')} {project.name}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-wizard"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  data-testid={`step-indicator-${step}`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Pipeline Name */}
          {currentStep === 1 && (
            <div className="space-y-6" data-testid="step-pipeline-name">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step 1: Pipeline Name</h3>
                <p className="text-muted-foreground mb-4">
                  Enter a descriptive name for your new pipeline
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pipeline-name">Pipeline Name</Label>
                <Input
                  id="pipeline-name"
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                  placeholder="e.g., Main Code Review Pipeline"
                  data-testid="input-pipeline-name"
                />
              </div>
            </div>
          )}

          {/* Step 2: AI Agents */}
          {currentStep === 2 && (
            <div className="space-y-6" data-testid="step-ai-agents">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step 2: AI Agents</h3>
                <p className="text-muted-foreground mb-4">
                  Select the AI agents you want to include in this pipeline
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {AI_AGENTS.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                    data-testid={`agent-option-${agent.id}`}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{agent.name}</h4>
                      <p className="text-sm text-muted-foreground">{agent.description}</p>
                    </div>
                    <Switch
                      checked={selectedAgents.includes(agent.id)}
                      onCheckedChange={() => handleAgentToggle(agent.id)}
                      data-testid={`switch-agent-${agent.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Trigger */}
          {currentStep === 3 && (
            <div className="space-y-6" data-testid="step-trigger">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step 3: Trigger Condition</h3>
                <p className="text-muted-foreground mb-4">
                  Choose when this pipeline should automatically run
                </p>
              </div>
              <div className="space-y-2">
                <Label>Trigger Condition</Label>
                <Select value={selectedTrigger} onValueChange={setSelectedTrigger}>
                  <SelectTrigger data-testid="select-trigger">
                    <SelectValue placeholder="Select trigger condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRIGGER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 4 && (
            <div className="space-y-6" data-testid="step-summary">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step 4: Review & Confirm</h3>
                <p className="text-muted-foreground mb-4">
                  Please review your pipeline configuration
                </p>
              </div>
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label className="text-sm font-medium">Pipeline Name</Label>
                  <p className="text-foreground" data-testid="summary-pipeline-name">{pipelineName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Selected AI Agents ({selectedAgents.length})</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedAgents.map((agentId) => {
                      const agent = AI_AGENTS.find(a => a.id === agentId);
                      return (
                        <span
                          key={agentId}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          data-testid={`summary-agent-${agentId}`}
                        >
                          {agent?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Trigger Condition</Label>
                  <p className="text-foreground" data-testid="summary-trigger">
                    {TRIGGER_OPTIONS.find(opt => opt.value === selectedTrigger)?.label}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              data-testid="button-previous-step"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                data-testid="button-next-step"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700"
                data-testid="button-save-activate"
              >
                Save & Activate
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}