using System;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using AICodeReview.AiModels;
using AICodeReview.AiModels.Dtos;
using AICodeReview.Branches;
using AICodeReview.Branches.Dtos;
using AICodeReview.Groups;
using AICodeReview.Groups.Dtos;
using AICodeReview.Nodes;
using AICodeReview.Nodes.Dtos;
using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;
using AICodeReview.Projects;
using AICodeReview.Projects.Dtos;
using AICodeReview.Repositories;
using AICodeReview.Repositories.Dtos;
using AICodeReview.Triggers;
using AICodeReview.Triggers.Dtos;

namespace AICodeReview.Mapping;

public class CicdProfiles : Profile
{
    public CicdProfiles()
    {
        // Projects
        CreateMap<Project, ProjectDto>();
        CreateMap<ProjectCreateDto, Project>();
        CreateMap<ProjectUpdateDto, Project>();

        // Summary – агрегации подтягиваем в AppService (см. хелперы ниже)
        CreateMap<Project, ProjectSummaryDto>()
            .ForMember(d => d.ActivePipelinesCount, opt => opt.Ignore())
            .ForMember(d => d.TotalPipelinesCount,  opt => opt.Ignore());

        // Repositories
        CreateMap<Repository, RepositoryDto>();
        CreateMap<RepositoryCreateDto, Repository>();
        CreateMap<RepositoryUpdateDto, Repository>();

        // Branches
        CreateMap<Branch, BranchDto>();
        CreateMap<BranchCreateDto, Branch>();
        CreateMap<BranchUpdateDto, Branch>();

        // Triggers
        CreateMap<Trigger, TriggerDto>();
        CreateMap<TriggerCreateDto, Trigger>();
        CreateMap<TriggerUpdateDto, Trigger>();

        // Pipelines
        CreateMap<Pipeline, PipelineDto>();
        CreateMap<PipelineCreateDto, Pipeline>();
        CreateMap<PipelineUpdateDto, Pipeline>();

        // Для списков в админке: ProjectName/Trigger наполняем на уровне AppService
        CreateMap<Pipeline, PipelineListItemDto>()
            .ForMember(d => d.ProjectName, opt => opt.Ignore())
            .ForMember(d => d.Trigger,     opt => opt.Ignore())
            .ForMember(d => d.LastRun,     opt => opt.MapFrom(s => s.FinishedAt));

        // Nodes
        CreateMap<Node, NodeDto>();
        CreateMap<NodeCreateDto, Node>();

        CreateMap<PipelineNode, PipelineNodeDto>();
        CreateMap<PipelineNodeCreateDto, PipelineNode>();

        // Groups
        CreateMap<Group, GroupDto>();
        CreateMap<GroupCreateDto, Group>();
        CreateMap<GroupUpdateDto, Group>();
        CreateMap<GroupProject, GroupProjectDto>();
        CreateMap<GroupProjectCreateDto, GroupProject>();
        CreateMap<GroupProjectUpdateDto, GroupProject>();

        // AiModels
        CreateMap<AiModel, AiModelDto>();
        CreateMap<AiModelCreateDto, AiModel>();
        CreateMap<AiModelUpdateDto, AiModel>();
    }

    /// <summary>
    /// Если у Project есть навигация Pipelines — можно использовать эту проекцию напрямую.
    /// </summary>
    public static Expression<Func<Project, ProjectSummaryDto>> ProjectToSummaryWithNavigation =>
        p => new ProjectSummaryDto
        {
            Id                   = p.Id,
            Name                 = p.Name,
            Provider             = p.Provider,
            RepoPath             = p.RepoPath,
            DefaultBranch        = p.DefaultBranch,
            ActivePipelinesCount = p.Pipelines.Where(x => x.IsActive && (x.Status == "Active" || x.Status == "Running")).Count(),
            TotalPipelinesCount  = p.Pipelines.Count()
        };

    /// <summary>
    /// Вариант без навигации: агрегируем по внешнему IQueryable&lt;Pipeline&gt;.
    /// Пример использования в AppService:
    ///   var result = CicdProfiles.ProjectToSummary(_projectRepo.AsQueryable(), _pipelineRepo.AsQueryable());
    /// </summary>
    public static IQueryable<ProjectSummaryDto> ProjectToSummary(
        IQueryable<Project> projects,
        IQueryable<Pipeline> pipelines)
    {
        var counts =
            from pl in pipelines
            group pl by pl.ProjectId into g
            select new
            {
                ProjectId = g.Key,
                Total     = g.Count(),
                Active    = g.Count(x => x.IsActive && (x.Status == "Active" || x.Status == "Running"))
            };

        var query =
            from p in projects
            join c in counts on p.Id equals c.ProjectId into gj
            from c in gj.DefaultIfEmpty()
            select new ProjectSummaryDto
            {
                Id                   = p.Id,
                Name                 = p.Name,
                Provider             = p.Provider,
                RepoPath             = p.RepoPath,
                DefaultBranch        = p.DefaultBranch,
                TotalPipelinesCount  = c != null ? c.Total  : 0,
                ActivePipelinesCount = c != null ? c.Active : 0
            };

        return query;
    }
}
