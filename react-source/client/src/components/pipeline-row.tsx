import { Play, Clock } from "lucide-react";
import type { Pipeline } from "@shared/schema";
import { useTranslation } from "@/contexts/language-context";

interface PipelineRowProps {
  pipeline: Pipeline;
  onViewDetails?: (pipeline: Pipeline) => void;
}

export function PipelineRow({ pipeline, onViewDetails }: PipelineRowProps) {
  const { t } = useTranslation();
  
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
    <tr className="border-b border-border hover:bg-muted/50" data-testid={`row-pipeline-${pipeline.id}`}>
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
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            pipeline.status === 'Active' ? 'status-active' : 'status-inactive'
          }`}
          data-testid={`status-pipeline-${pipeline.id}`}
        >
          {pipeline.status}
        </span>
      </td>
      <td className="py-4 px-6 text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span data-testid={`text-pipeline-lastrun-${pipeline.id}`}>
            {formatLastRun(pipeline.lastRun)}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <button 
          className="text-primary hover:text-primary/80 text-sm font-medium"
          onClick={() => onViewDetails?.(pipeline)}
          data-testid={`button-view-details-${pipeline.id}`}
        >
          {t('allPipelines.viewDetails')}
        </button>
      </td>
    </tr>
  );
}
