using System;
using Microsoft.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
// using Volo.Abp.Data; // не нужен, чтобы не дублировать
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

using AICodeReview.AiModels;
using AICodeReview.Branches;
using AICodeReview.Groups;
using AICodeReview.Nodes;
using AICodeReview.Pipelines;
using AICodeReview.Projects;
using AICodeReview.Repositories;
using AICodeReview.Triggers;
using AICodeReview.EntityFrameworkCore.Configurations;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;

namespace AICodeReview.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class AICodeReviewDbContext :
    AbpDbContext<AICodeReviewDbContext>,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    // ===== ABP Identity =====
    public DbSet<IdentityUser> Users { get; set; } = default!;
    public DbSet<IdentityRole> Roles { get; set; } = default!;
    public DbSet<IdentityClaimType> ClaimTypes { get; set; } = default!;
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; } = default!;
    public DbSet<OrganizationUnitRole> OrganizationUnitRoles { get; set; } = default!;
    public DbSet<IdentityUserOrganizationUnit> UserOrganizationUnits { get; set; } = default!;
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; } = default!;
    public DbSet<IdentityLinkUser> LinkUsers { get; set; } = default!;
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; } = default!;
    public DbSet<IdentitySession> Sessions { get; set; } = default!;

    // ===== ABP TenantManagement =====
    public DbSet<Tenant> Tenants { get; set; } = default!;
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; } = default!;

    // ===== Ваши сущности =====
    public DbSet<Project> Projects { get; set; } = default!;
    public DbSet<Repository> Repositories { get; set; } = default!;
    public DbSet<Branch> Branches { get; set; } = default!;
    public DbSet<TriggerType> TriggerTypes { get; set; } = default!;
    public DbSet<Trigger> Triggers { get; set; } = default!;
    public DbSet<Pipeline> Pipelines { get; set; } = default!;
    public DbSet<NodeType> NodeTypes { get; set; } = default!;
    public DbSet<Node> Nodes { get; set; } = default!;
    public DbSet<PipelineNode> PipelineNodes { get; set; } = default!;
    public DbSet<Group> Groups { get; set; } = default!;
    public DbSet<GroupProject> GroupProjects { get; set; } = default!;
    public DbSet<AiModel> AiModels { get; set; } = default!;

    public AICodeReviewDbContext(DbContextOptions<AICodeReviewDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // ABP модули
        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        // Конфигурации доменных сущностей
        builder.ApplyConfiguration(new AiModelConfiguration());
        builder.ApplyConfiguration(new ProjectConfiguration());
        builder.ApplyConfiguration(new RepositoryConfiguration());
        builder.ApplyConfiguration(new BranchConfiguration());
        builder.ApplyConfiguration(new TriggerTypeConfiguration());
        builder.ApplyConfiguration(new TriggerConfiguration());
        builder.ApplyConfiguration(new PipelineConfiguration());
        builder.ApplyConfiguration(new NodeTypeConfiguration());
        builder.ApplyConfiguration(new NodeConfiguration());
        builder.ApplyConfiguration(new PipelineNodeConfiguration());
        builder.ApplyConfiguration(new GroupConfiguration());
        builder.ApplyConfiguration(new GroupProjectConfiguration());
    }
}
