using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Data;

// Domain entities
using AICodeReview.AiModels;
using AICodeReview.Branches;
using AICodeReview.Groups;
using AICodeReview.Nodes;
using AICodeReview.Pipelines;
using AICodeReview.Projects;
using AICodeReview.Repositories;
using AICodeReview.Triggers;

// DTOs
using AICodeReview.AiModels.Dtos;
using AICodeReview.Branches.Dtos;
using AICodeReview.Groups.Dtos;
using AICodeReview.Nodes.Dtos;
using AICodeReview.Pipelines.Dtos;
using AICodeReview.Projects.Dtos;
using AICodeReview.Repositories.Dtos;
using AICodeReview.Triggers.Dtos;

namespace AICodeReview.Application.Mapping;

public class CicdProfiles : Profile
{
    public CicdProfiles()
    {
        CreateMap<Project, ProjectDto>();
        CreateMap<ProjectCreateDto, Project>()
            .ForMember(d => d.Id, o => o.Ignore());
        CreateMap<ProjectUpdateDto, Project>()
            .ForMember(d => d.Id, o => o.Ignore());
        
        CreateMap<Project, ProjectSummaryDto>()
            .ForMember(d => d.ActivePipelinesCount, o => o.Ignore())
            .ForMember(d => d.TotalPipelinesCount,  o => o.Ignore());
        
        CreateMap<Repository, RepositoryDto>();
        CreateMap<RepositoryCreateDto, Repository>()
            .ForMember(d => d.Id, o => o.Ignore());
        CreateMap<RepositoryUpdateDto, Repository>()
            .ForMember(d => d.Id, o => o.Ignore());
        
        CreateMap<Branch, BranchDto>();
        CreateMap<BranchCreateDto, Branch>()
            .ForMember(d => d.Id, o => o.Ignore());
        CreateMap<BranchUpdateDto, Branch>()
            .ForMember(d => d.Id, o => o.Ignore());
        
        CreateMap<Trigger, TriggerDto>();
        CreateMap<TriggerCreateDto, Trigger>()
            .ForMember(d => d.Id, o => o.Ignore());
        
        CreateMap<Pipeline, PipelineDto>();
        CreateMap<PipelineCreateDto, Pipeline>()
            .ForMember(d => d.Id, o => o.Ignore())
            .ForMember(d => d.StartedAt, o => o.Ignore())
            .ForMember(d => d.FinishedAt, o => o.Ignore())
            .ForMember(d => d.DurationSeconds, o => o.Ignore());
        
        CreateMap<Pipeline, PipelineListItemDto>()
            .ForMember(d => d.ProjectName, o => o.Ignore())
            .ForMember(d => d.Trigger,     o => o.Ignore())
            .ForMember(d => d.LastRun,     o => o.MapFrom(s => s.FinishedAt));
        
        CreateMap<Node, NodeDto>();
        
        CreateMap<NodeCreateDto, Node>()
            .ForMember(d => d.Id, o => o.Ignore())
            .ForMember(d => d.ExtraProperties, o => o.MapFrom(s =>
                s.ExtraProperties != null
                    ? new ExtraPropertyDictionary(s.ExtraProperties)
                    : new ExtraPropertyDictionary()
            ));

        CreateMap<PipelineNode, PipelineNodeDto>();
        CreateMap<PipelineNodeCreateDto, PipelineNode>()
            .ForMember(d => d.Id, o => o.Ignore());
        
        CreateMap<Group, GroupDto>();
        CreateMap<GroupCreateDto, Group>()
            .ForMember(d => d.Id, o => o.Ignore());
        CreateMap<GroupUpdateDto, Group>()
            .ForMember(d => d.Id, o => o.Ignore());

        CreateMap<GroupProject, GroupProjectDto>();
        
        CreateMap<AiModel, AiModelDto>();
        CreateMap<AiModelCreateDto, AiModel>()
            .ForMember(d => d.Id, o => o.Ignore());
        CreateMap<AiModelUpdateDto, AiModel>()
            .ForMember(d => d.Id, o => o.Ignore());
    }
    
    public static Expression<Func<Project, ProjectSummaryDto>> ProjectToSummaryWithNavigation =>
        p => new ProjectSummaryDto
        {
            Id = p.Id,
            Name = p.Name,
            Provider = p.Provider,
            RepoPath = p.RepoPath,
            DefaultBranch = p.DefaultBranch,
            ActivePipelinesCount = p.Pipelines.Where(x => x.IsActive).Count(),
            TotalPipelinesCount  = p.Pipelines.Count()
        };
    
    public static Expression<Func<Project, ProjectSummaryDto>> ProjectToSummary =>
        p => new ProjectSummaryDto
        {
            Id = p.Id,
            Name = p.Name,
            Provider = p.Provider,
            RepoPath = p.RepoPath,
            DefaultBranch = p.DefaultBranch,
            ActivePipelinesCount = 0,
            TotalPipelinesCount  = 0
        };
}
