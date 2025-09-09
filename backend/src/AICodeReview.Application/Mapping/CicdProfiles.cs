using System;
using System.Linq;
using AutoMapper;
using Volo.Abp.AutoMapper;
using Volo.Abp.Data;

using AICodeReview.Projects;
using AICodeReview.Projects.Dtos;

using AICodeReview.Repositories;
using AICodeReview.Repositories.Dtos;

using AICodeReview.Branches;
using AICodeReview.Branches.Dtos;

using AICodeReview.Triggers;
using AICodeReview.Triggers.Dtos;

using AICodeReview.Pipelines;
using AICodeReview.Pipelines.Dtos;

using AICodeReview.Nodes;
using AICodeReview.Nodes.Dtos;

using AICodeReview.Groups;
using AICodeReview.Groups.Dtos;

using AICodeReview.AiModels;
using AICodeReview.AiModels.Dtos;

namespace AICodeReview.Application.Mapping;

public class CicdProfiles : Profile
{
    public CicdProfiles()
    {
        // ===== Projects =====
        CreateMap<Project, ProjectDto>();

        
        CreateMap<Project, ProjectSummaryDto>()
            .ForMember(d => d.TotalPipelinesCount,  o => o.Ignore())
            .ForMember(d => d.ActivePipelinesCount, o => o.Ignore());

        CreateMap<ProjectCreateDto, Project>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.Pipelines,        o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        CreateMap<ProjectUpdateDto, Project>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.Pipelines,        o => o.Ignore())
            .ForMember(d => d.Provider,         o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        // ===== Repositories =====
        CreateMap<Repository, RepositoryDto>();

        CreateMap<RepositoryCreateDto, Repository>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.Project,          o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        CreateMap<RepositoryUpdateDto, Repository>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.Project,          o => o.Ignore())
            .ForMember(d => d.ProjectId,        o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        // ===== Branches =====
        CreateMap<Branch, BranchDto>();

        CreateMap<BranchCreateDto, Branch>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.Repository,       o => o.Ignore())
            .ForMember(d => d.LastCommitSha,    o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        CreateMap<BranchUpdateDto, Branch>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.Repository,       o => o.Ignore())
            .ForMember(d => d.RepositoryId,     o => o.Ignore())
            .ForMember(d => d.LastCommitSha,    o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        // ===== Triggers =====
        CreateMap<Trigger, TriggerDto>();

        CreateMap<TriggerCreateDto, Trigger>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.Repository,       o => o.Ignore())
            .ForMember(d => d.Branch,           o => o.Ignore())
            .ForMember(d => d.Type,             o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        // ===== Pipelines =====
        CreateMap<Pipeline, PipelineListItemDto>()
            .ForMember(d => d.ProjectName, o => o.Ignore())
            .ForMember(d => d.Trigger,     o => o.Ignore())
            .ForMember(d => d.LastRun,     o => o.MapFrom(s => s.FinishedAt ?? s.StartedAt));

        CreateMap<PipelineCreateDto, Pipeline>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.Project,          o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.StartedAt,        o => o.Ignore())
            .ForMember(d => d.FinishedAt,       o => o.Ignore())
            .ForMember(d => d.DurationSeconds,  o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        // ===== Nodes =====
        CreateMap<Node, NodeDto>();

        CreateMap<NodeCreateDto, Node>()
                .IgnoreFullAuditedObjectProperties()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.TenantId,          o => o.Ignore())
                .ForMember(d => d.ConcurrencyStamp,  o => o.Ignore()) 
                .ForMember(d => d.Type,              o => o.Ignore()) 
                .ForMember(d => d.ExtraProperties,   o => o.MapFrom(s =>
                    s.ExtraProperties == null 
                        ? new ExtraPropertyDictionary()
                        : new ExtraPropertyDictionary(s.ExtraProperties)));

        CreateMap<PipelineNode, PipelineNodeDto>();

        CreateMap<PipelineNodeCreateDto, PipelineNode>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.Pipeline,         o => o.Ignore())
            .ForMember(d => d.Node,             o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        // ===== Groups =====
        CreateMap<Group, GroupDto>();

        CreateMap<GroupCreateDto, Group>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        CreateMap<GroupUpdateDto, Group>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        // ===== AI Models =====
        CreateMap<AiModel, AiModelDto>();

        CreateMap<AiModelCreateDto, AiModel>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());

        CreateMap<AiModelUpdateDto, AiModel>()
            .IgnoreFullAuditedObjectProperties()
            .ForMember(d => d.Id,               o => o.Ignore())
            .ForMember(d => d.TenantId,         o => o.Ignore())
            .ForMember(d => d.ConcurrencyStamp, o => o.Ignore())
            .ForMember(d => d.ExtraProperties,  o => o.Ignore());
    }

    
    public static IQueryable<ProjectSummaryDto> ProjectToSummaryWithNavigation(IQueryable<Project> query)
        => query.Select(p => new ProjectSummaryDto
        {
            Id = p.Id,
            Name = p.Name,
            
            TotalPipelinesCount  = 0,
            ActivePipelinesCount = 0
        });
}
