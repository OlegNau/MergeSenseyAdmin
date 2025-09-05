using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Volo.Abp.Security.Encryption;
using AICodeReview.AiModels;
using AICodeReview.Branches;
using AICodeReview.Groups;
using AICodeReview.Nodes;
using AICodeReview.Pipelines;
using AICodeReview.Projects;
using AICodeReview.Repositories;
using AICodeReview.Triggers;
using AICodeReview.EntityFrameworkCore.Configurations;

namespace AICodeReview.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class AICodeReviewDbContext :
    AbpDbContext<AICodeReviewDbContext>,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    public DbSet<AiModel> AiModels { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Repository> Repositories { get; set; }
    public DbSet<Branch> Branches { get; set; }
    public DbSet<TriggerType> TriggerTypes { get; set; }
    public DbSet<Trigger> Triggers { get; set; }
    public DbSet<Pipeline> Pipelines { get; set; }
    public DbSet<NodeType> NodeTypes { get; set; }
    public DbSet<Node> Nodes { get; set; }
    public DbSet<PipelineNode> PipelineNodes { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<GroupProject> GroupProjects { get; set; }

    // ABP module DbSets...
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }
    public DbSet<IdentitySession> Sessions { get; set; }
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    public AICodeReviewDbContext(DbContextOptions<AICodeReviewDbContext> options)
        : base(options)
    {
        EfEncryption.Service = LazyServiceProvider.LazyGetService<IStringEncryptionService>();
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

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
