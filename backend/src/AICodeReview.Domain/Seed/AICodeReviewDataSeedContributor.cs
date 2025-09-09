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
    private readonly IRepository<Project, Guid> _projectRepository;
    private readonly IRepository<Repository, Guid> _repositoryRepository;
    private readonly IRepository<Branch, Guid> _branchRepository;
    private readonly IRepository<Trigger, Guid> _triggerRepository;
    private readonly IRepository<TriggerType, long> _triggerTypeRepository;
    private readonly IRepository<Pipeline, Guid> _pipelineRepository;
    private readonly IRepository<Node, Guid> _nodeRepository;
    private readonly IRepository<NodeType, long> _nodeTypeRepository;
    private readonly IRepository<PipelineNode, Guid> _pipelineNodeRepository;
    private readonly IRepository<Group, Guid> _groupRepository;
    private readonly IRepository<GroupProject, Guid> _groupProjectRepository;
    private readonly IRepository<AiModel, Guid> _aiModelRepository;

    public AICodeReviewDataSeedContributor(
        IRepository<Project, Guid> projectRepository,
        IRepository<Repository, Guid> repositoryRepository,
        IRepository<Branch, Guid> branchRepository,
        IRepository<Trigger, Guid> triggerRepository,
        IRepository<TriggerType, long> triggerTypeRepository,
        IRepository<Pipeline, Guid> pipelineRepository,
        IRepository<Node, Guid> nodeRepository,
        IRepository<NodeType, long> nodeTypeRepository,
        IRepository<PipelineNode, Guid> pipelineNodeRepository,
        IRepository<Group, Guid> groupRepository,
        IRepository<GroupProject, Guid> groupProjectRepository,
        IRepository<AiModel, Guid> aiModelRepository)
    {
        _projectRepository = projectRepository;
        _repositoryRepository = repositoryRepository;
        _branchRepository = branchRepository;
        _triggerRepository = triggerRepository;
        _triggerTypeRepository = triggerTypeRepository;
        _pipelineRepository = pipelineRepository;
        _nodeRepository = nodeRepository;
        _nodeTypeRepository = nodeTypeRepository;
        _pipelineNodeRepository = pipelineNodeRepository;
        _groupRepository = groupRepository;
        _groupProjectRepository = groupProjectRepository;
        _aiModelRepository = aiModelRepository;
    }

    [UnitOfWork]
    public async Task SeedAsync(DataSeedContext context)
    {
        
        await EnsureTriggerTypesAsync();
        await EnsureNodeTypesAsync();

        
        if (await _projectRepository.GetCountAsync() > 0)
            return;

        
        var project = await _projectRepository.InsertAsync(new Project
        {
            Name = "Demo Project",
            Provider = "GitHub",
            RepoPath = "example/sample-repo",
            DefaultBranch = "main",
            IsActive = true
        }, autoSave: true);

        
        var repo = await _repositoryRepository.InsertAsync(new Repository
        {
            ProjectId = project.Id,
            Name = "sample-repo",
            Url = "https://github.com/example/sample-repo.git",
            IsActive = true
        }, autoSave: true);

        
        var mainBranch = await _branchRepository.InsertAsync(new Branch
        {
            RepositoryId = repo.Id,
            Name = "main",
            IsDefault = true,
            LastCommitSha = null
        }, autoSave: true);

        var devBranch = await _branchRepository.InsertAsync(new Branch
        {
            RepositoryId = repo.Id,
            Name = "dev",
            IsDefault = false,
            LastCommitSha = null
        }, autoSave: true);

        
        var manualType = await _triggerTypeRepository.FirstOrDefaultAsync(t => t.Name == "Manual");
        var scheduleType = await _triggerTypeRepository.FirstOrDefaultAsync(t => t.Name == "Schedule");

        if (manualType != null)
        {
            await _triggerRepository.InsertAsync(new Trigger
            {
                RepositoryId = repo.Id,
                BranchId = mainBranch.Id,
                TypeId = manualType.Id,
                ScheduleJson = null
            }, autoSave: true);
        }

        if (scheduleType != null)
        {
            await _triggerRepository.InsertAsync(new Trigger
            {
                RepositoryId = repo.Id,
                BranchId = devBranch.Id,
                TypeId = scheduleType.Id,
                ScheduleJson = """{ "cron": "0 9 * * *" }"""
            }, autoSave: true);
        }

        
        var pipeline = await _pipelineRepository.InsertAsync(new Pipeline
        {
            ProjectId = project.Id,
            Name = "Default CI",
            Status = "Idle",
            IsActive = true
        }, autoSave: true);

        var checkoutType = await _nodeTypeRepository.FirstOrDefaultAsync(x => x.Name == "Checkout");
        var testType = await _nodeTypeRepository.FirstOrDefaultAsync(x => x.Name == "Test");
        var deployType = await _nodeTypeRepository.FirstOrDefaultAsync(x => x.Name == "Deploy");

        var checkoutNode = checkoutType != null
            ? await _nodeRepository.InsertAsync(new Node { TypeId = checkoutType.Id }, autoSave: true)
            : null;

        var testNode = testType != null
            ? await _nodeRepository.InsertAsync(new Node { TypeId = testType.Id }, autoSave: true)
            : null;

        var deployNode = deployType != null
            ? await _nodeRepository.InsertAsync(new Node { TypeId = deployType.Id }, autoSave: true)
            : null;

        var order = 1;
        if (checkoutNode != null)
            await _pipelineNodeRepository.InsertAsync(new PipelineNode { PipelineId = pipeline.Id, NodeId = checkoutNode.Id, Order = order++ }, autoSave: true);
        if (testNode != null)
            await _pipelineNodeRepository.InsertAsync(new PipelineNode { PipelineId = pipeline.Id, NodeId = testNode.Id, Order = order++ }, autoSave: true);
        if (deployNode != null)
            await _pipelineNodeRepository.InsertAsync(new PipelineNode { PipelineId = pipeline.Id, NodeId = deployNode.Id, Order = order++ }, autoSave: true);

        
        var group = await _groupRepository.InsertAsync(new Group
        {
            Name = "Default Group",
            Description = "Demo group"
        }, autoSave: true);

        await _groupProjectRepository.InsertAsync(new GroupProject
        {
            GroupId = group.Id,
            ProjectId = project.Id
        }, autoSave: true);

        
        await _aiModelRepository.InsertAsync(new AiModel
        {
            Name = "OpenAI GPT-4o-mini",
            Provider = "OpenAI",
            Model = "gpt-4o-mini",
            ApiBaseUrl = null,
            ApiKey = null,
            IsActive = false
        }, autoSave: true);
    }

    private async Task EnsureTriggerTypesAsync()
    {
        if (await _triggerTypeRepository.GetCountAsync() > 0)
            return;

        var items = new[]
        {
            new TriggerType { Name = "Manual" },
            new TriggerType { Name = "Schedule" },
            new TriggerType { Name = "Push" },
            new TriggerType { Name = "PullRequest" }
        };

        foreach (var t in items)
            await _triggerTypeRepository.InsertAsync(t, autoSave: true);
    }

    private async Task EnsureNodeTypesAsync()
    {
        if (await _nodeTypeRepository.GetCountAsync() > 0)
            return;

        var items = new[]
        {
            new NodeType { Name = "Checkout" },
            new NodeType { Name = "Build" },
            new NodeType { Name = "Test" },
            new NodeType { Name = "Deploy" }
        };

        foreach (var n in items)
            await _nodeTypeRepository.InsertAsync(n, autoSave: true);
    }
}

