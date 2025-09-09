using System;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Security.Encryption;
using AICodeReview.EntityFrameworkCore.Configurations;
using AICodeReview.EntityFrameworkCore.Design;

namespace AICodeReview.EntityFrameworkCore;

public class AICodeReviewMigrationsDbContext : AbpDbContext<AICodeReviewMigrationsDbContext>
{
    public AICodeReviewMigrationsDbContext(DbContextOptions<AICodeReviewMigrationsDbContext> options)
        : base(options)
    {
        EfEncryption.Service ??= new Design.NoopStringEncryptionService();
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
