using System;
using Microsoft.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;

// ABP Identity & Tenants
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

// ABP OpenIddict
using Volo.Abp.OpenIddict;
using Volo.Abp.OpenIddict.EntityFrameworkCore;

// ABP Permission/Setting/Feature/Audit
using Volo.Abp.PermissionManagement;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.FeatureManagement;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.AuditLogging;
using Volo.Abp.AuditLogging.EntityFrameworkCore;

// (опционально) фоновые задания, если используешь
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;

// Ваши пространства имён доменных сущностей/конфигураций
using AICodeReview.AiModels;
using AICodeReview.Branches;
using AICodeReview.Groups;
using AICodeReview.Nodes;
using AICodeReview.Pipelines;
using AICodeReview.Projects;
using AICodeReview.Repositories;
using AICodeReview.Triggers;
using AICodeReview.EntityFrameworkCore.Configurations;
using Volo.Abp.OpenIddict.Applications;
using Volo.Abp.OpenIddict.Authorizations;
using Volo.Abp.OpenIddict.Scopes;
using Volo.Abp.OpenIddict.Tokens;

namespace AICodeReview.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ReplaceDbContext(typeof(IOpenIddictDbContext))]
[ReplaceDbContext(typeof(IPermissionManagementDbContext))]
[ReplaceDbContext(typeof(ISettingManagementDbContext))]
[ReplaceDbContext(typeof(IFeatureManagementDbContext))]
[ReplaceDbContext(typeof(IAuditLoggingDbContext))]
[ConnectionStringName("Default")]
public class AICodeReviewDbContext :
    AbpDbContext<AICodeReviewDbContext>,
    IIdentityDbContext,
    IOpenIddictDbContext,
    ITenantManagementDbContext,
    IPermissionManagementDbContext,
    ISettingManagementDbContext,
    IFeatureManagementDbContext,
    IAuditLoggingDbContext
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

    // ===== ABP OpenIddict =====
    public DbSet<OpenIddictApplication> Applications { get; set; } = default!;
    public DbSet<OpenIddictAuthorization> Authorizations { get; set; } = default!;
    public DbSet<OpenIddictScope> Scopes { get; set; } = default!;
    public DbSet<OpenIddictToken> Tokens { get; set; } = default!;

    // ===== ABP PermissionManagement =====
    public DbSet<PermissionGrant> PermissionGrants { get; set; } = default!;
    public DbSet<PermissionGroupDefinitionRecord> PermissionGroups { get; set; } = default!;
    public DbSet<PermissionDefinitionRecord> Permissions { get; set; } = default!;

    // ===== ABP SettingManagement =====
    public DbSet<SettingDefinitionRecord> SettingDefinitionRecords { get; set; } = default!;
    public DbSet<Setting> Settings { get; set; } = default!;

    // ===== ABP FeatureManagement =====
    public DbSet<FeatureGroupDefinitionRecord> FeatureGroups { get; set; } = default!;
    public DbSet<FeatureDefinitionRecord> Features { get; set; } = default!;
    public DbSet<FeatureValue> FeatureValues { get; set; } = default!;

    // ===== ABP AuditLogging =====
    public DbSet<AuditLog> AuditLogs { get; set; } = default!;
    public DbSet<AuditLogAction> AuditLogActions { get; set; } = default!;
    public DbSet<EntityChange> EntityChanges { get; set; } = default!;
    public DbSet<EntityPropertyChange> EntityPropertyChanges { get; set; } = default!;
    public DbSet<AuditLogExcelFile> AuditLogExcelFiles { get; set; } = default!;

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
