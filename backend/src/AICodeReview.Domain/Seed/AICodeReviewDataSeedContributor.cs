using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Uow;
using AICodeReview.AiModels;
using AICodeReview.Branches;
using AICodeReview.Groups;
using AICodeReview.Nodes;
using AICodeReview.Pipelines;
using AICodeReview.Projects;
using AICodeReview.Repositories;
using AICodeReview.Triggers;

namespace AICodeReview.Seed;

public class AICodeReviewDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IRepository<TriggerType, long> _triggerTypeRepository;
    private readonly IRepository<NodeType, long> _nodeTypeRepository;
    private readonly IRepository<Project, Guid> _projectRepository;
    private readonly IRepository<Repository, Guid> _repositoryRepository;
    private readonly IRepository<Branch, Guid> _branchRepository;
    private readonly IRepository<Trigger, Guid> _triggerRepository;
    private readonly IRepository<Pipeline, Guid> _pipelineRepository;
    private readonly IRepository<Node, Guid> _nodeRepository;
    private readonly IRepository<PipelineNode, Guid> _pipelineNodeRepository;
    private readonly IRepository<Group, Guid> _groupRepository;
    private readonly IRepository<GroupProject, Guid> _groupProjectRepository;
    private readonly IRepository<AiModel, Guid> _aiModelRepository;

    public AICodeReviewDataSeedContributor(
        IRepository<TriggerType, long> triggerTypeRepository,
        IRepository<NodeType, long> nodeTypeRepository,
        IRepository<Project, Guid> projectRepository,
        IRepository<Repository, Guid> repositoryRepository,
        IRepository<Branch, Guid> branchRepository,
        IRepository<Trigger, Guid> triggerRepository,
        IRepository<Pipeline, Guid> pipelineRepository,
        IRepository<Node, Guid> nodeRepository,
        IRepository<PipelineNode, Guid> pipelineNodeRepository,
        IRepository<Group, Guid> groupRepository,
        IRepository<GroupProject, Guid> groupProjectRepository,
        IRepository<AiModel, Guid> aiModelRepository)
    {
        _triggerTypeRepository = triggerTypeRepository;
        _nodeTypeRepository = nodeTypeRepository;
        _projectRepository = projectRepository;
        _repositoryRepository = repositoryRepository;
        _branchRepository = branchRepository;
        _triggerRepository = triggerRepository;
        _pipelineRepository = pipelineRepository;
        _nodeRepository = nodeRepository;
        _pipelineNodeRepository = pipelineNodeRepository;
        _groupRepository = groupRepository;
        _groupProjectRepository = groupProjectRepository;
        _aiModelRepository = aiModelRepository;
    }

    [UnitOfWork]
    public async Task SeedAsync(DataSeedContext context)
    {
        await SeedTriggerTypesAsync();
        await SeedNodeTypesAsync();
        await SeedProjectsAsync();
        await SeedGroupsAsync();
        await SeedAiModelAsync();
    }

    private async Task SeedTriggerTypesAsync()
    {
        if (await _triggerTypeRepository.GetCountAsync() > 0)
        {
            return;
        }

        var seedTime = DateTime.UtcNow;
        await _triggerTypeRepository.InsertManyAsync(new List<TriggerType>
        {
            new TriggerType { Id = 1, Name = "manual",   CreationTime = seedTime, ConcurrencyStamp = "manual" },
            new TriggerType { Id = 2, Name = "push",     CreationTime = seedTime, ConcurrencyStamp = "push" },
            new TriggerType { Id = 3, Name = "schedule", CreationTime = seedTime, ConcurrencyStamp = "schedule" }
        }, true);
    }

    private async Task SeedNodeTypesAsync()
    {
        if (await _nodeTypeRepository.GetCountAsync() > 0)
        {
            return;
        }

        var seedTime = DateTime.UtcNow;
        await _nodeTypeRepository.InsertManyAsync(new List<NodeType>
        {
            new NodeType { Id = 1, Name = "lint",   CreationTime = seedTime, ConcurrencyStamp = "lint" },
            new NodeType { Id = 2, Name = "test",   CreationTime = seedTime, ConcurrencyStamp = "test" },
            new NodeType { Id = 3, Name = "build",  CreationTime = seedTime, ConcurrencyStamp = "build" },
            new NodeType { Id = 4, Name = "deploy", CreationTime = seedTime, ConcurrencyStamp = "deploy" },
            new NodeType { Id = 5, Name = "custom", CreationTime = seedTime, ConcurrencyStamp = "custom" }
        }, true);
    }

    private async Task SeedProjectsAsync()
    {
        if (await _projectRepository.GetCountAsync() > 0)
        {
            return;
        }

        var now = DateTime.UtcNow;

        // Project 1
        var project1 = await _projectRepository.InsertAsync(new Project
        {
            Name = "Sample Project",
            Description = "Demo project for CI/CD",
            Provider = "GitHub",
            RepoPath = "sample/project",
            DefaultBranch = "main",
            IsActive = true
        }, true);

        var repo1 = await _repositoryRepository.InsertAsync(new Repository
        {
            ProjectId = project1.Id,
            Name = "sample-repo",
            Url = "https://github.com/example/sample-repo.git",
            IsActive = true
        }, true);

        var repo1Main = await _branchRepository.InsertAsync(new Branch
        {
            RepositoryId = repo1.Id,
            Name = "main",
            IsDefault = true
        }, true);

        var repo1Dev = await _branchRepository.InsertAsync(new Branch
        {
            RepositoryId = repo1.Id,
            Name = "dev",
            IsDefault = false
        }, true);

        await _triggerRepository.InsertAsync(new Trigger
        {
            RepositoryId = repo1.Id,
            BranchId = repo1Main.Id,
            TypeId = 2 // push
        }, true);

        var pipeline1 = await _pipelineRepository.InsertAsync(new Pipeline
        {
            ProjectId = project1.Id,
            Name = "CI",
            Status = "Succeeded",
            StartedAt = now.AddDays(-2),
            FinishedAt = now.AddDays(-2).AddMinutes(5),
            DurationSeconds = 300,
            IsActive = true
        }, true);

        var pipeline2 = await _pipelineRepository.InsertAsync(new Pipeline
        {
            ProjectId = project1.Id,
            Name = "Deploy",
            Status = "Running",
            StartedAt = now.AddDays(-1)
        }, true);

        var node1 = await _nodeRepository.InsertAsync(new Node { TypeId = 1 }, true); // lint
        var node2 = await _nodeRepository.InsertAsync(new Node { TypeId = 2 }, true); // test
        var node3 = await _nodeRepository.InsertAsync(new Node { TypeId = 3 }, true); // build
        var node4 = await _nodeRepository.InsertAsync(new Node { TypeId = 4 }, true); // deploy

        await _pipelineNodeRepository.InsertManyAsync(new List<PipelineNode>
        {
            new PipelineNode { PipelineId = pipeline1.Id, NodeId = node1.Id, Order = 1 },
            new PipelineNode { PipelineId = pipeline1.Id, NodeId = node2.Id, Order = 2 },
            new PipelineNode { PipelineId = pipeline1.Id, NodeId = node3.Id, Order = 3 },
            new PipelineNode { PipelineId = pipeline2.Id, NodeId = node3.Id, Order = 1 },
            new PipelineNode { PipelineId = pipeline2.Id, NodeId = node4.Id, Order = 2 }
        }, true);

        // Project 2
        var project2 = await _projectRepository.InsertAsync(new Project
        {
            Name = "Backend Api",
            Description = "Backend service",
            Provider = "GitLab",
            RepoPath = "company/backend",
            DefaultBranch = "main",
            IsActive = true
        }, true);

        var repo2 = await _repositoryRepository.InsertAsync(new Repository
        {
            ProjectId = project2.Id,
            Name = "backend-repo",
            Url = "https://gitlab.com/company/backend.git",
            IsActive = true
        }, true);

        var repo2Main = await _branchRepository.InsertAsync(new Branch
        {
            RepositoryId = repo2.Id,
            Name = "main",
            IsDefault = true
        }, true);

        var repo2Dev = await _branchRepository.InsertAsync(new Branch
        {
            RepositoryId = repo2.Id,
            Name = "dev",
            IsDefault = false
        }, true);

        await _triggerRepository.InsertAsync(new Trigger
        {
            RepositoryId = repo2.Id,
            BranchId = repo2Main.Id,
            TypeId = 2 // push
        }, true);

        var pipeline3 = await _pipelineRepository.InsertAsync(new Pipeline
        {
            ProjectId = project2.Id,
            Name = "CI",
            Status = "Failed",
            StartedAt = now.AddDays(-3),
            FinishedAt = now.AddDays(-3).AddMinutes(7),
            DurationSeconds = 420,
            IsActive = true
        }, true);

        var node5 = await _nodeRepository.InsertAsync(new Node { TypeId = 1 }, true); // lint
        var node6 = await _nodeRepository.InsertAsync(new Node { TypeId = 2 }, true); // test
        var node7 = await _nodeRepository.InsertAsync(new Node { TypeId = 3 }, true); // build

        await _pipelineNodeRepository.InsertManyAsync(new List<PipelineNode>
        {
            new PipelineNode { PipelineId = pipeline3.Id, NodeId = node5.Id, Order = 1 },
            new PipelineNode { PipelineId = pipeline3.Id, NodeId = node6.Id, Order = 2 },
            new PipelineNode { PipelineId = pipeline3.Id, NodeId = node7.Id, Order = 3 }
        }, true);
    }

    private async Task SeedGroupsAsync()
    {
        if (await _groupRepository.GetCountAsync() > 0)
        {
            return;
        }

        var projectIds = await _projectRepository.GetListAsync();
        var project1Id = projectIds.First().Id;
        var project2Id = projectIds.Last().Id;

        var group1 = await _groupRepository.InsertAsync(new Group
        {
            Name = "Core Team",
            Description = "Main development team"
        }, true);

        var group2 = await _groupRepository.InsertAsync(new Group
        {
            Name = "Services",
            Description = "Service group"
        }, true);

        await _groupProjectRepository.InsertManyAsync(new List<GroupProject>
        {
            new GroupProject { GroupId = group1.Id, ProjectId = project1Id },
            new GroupProject { GroupId = group2.Id, ProjectId = project2Id }
        }, true);
    }

    private async Task SeedAiModelAsync()
    {
        if (await _aiModelRepository.GetCountAsync() > 0)
        {
            return;
        }

        await _aiModelRepository.InsertAsync(new AiModel
        {
            Name = "Default Model",
            Provider = "OpenAI",
            Model = "gpt-4",
            ApiBaseUrl = "https://api.openai.com/v1",
            ApiKey = "demo",
            IsActive = true
        }, true);
    }
}

