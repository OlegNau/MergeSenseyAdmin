using System;
using AICodeReview.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Timing;

namespace AICodeReview.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(AICodeReviewEntityFrameworkCoreModule),
    typeof(AICodeReviewApplicationContractsModule), // тип в namespace AICodeReview
    typeof(AbpIdentityEntityFrameworkCoreModule),
    typeof(AbpPermissionManagementEntityFrameworkCoreModule),
    typeof(AbpSettingManagementEntityFrameworkCoreModule),
    typeof(AbpTenantManagementEntityFrameworkCoreModule),
    typeof(AbpOpenIddictEntityFrameworkCoreModule),
    typeof(AbpFeatureManagementEntityFrameworkCoreModule),
    typeof(AbpBackgroundJobsEntityFrameworkCoreModule),
    typeof(AbpAuditLoggingEntityFrameworkCoreModule)
)]
public class AICodeReviewDbMigratorModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpClockOptions>(o => o.Kind = DateTimeKind.Utc);
        
        Configure<AbpBackgroundJobOptions>(o => o.IsJobExecutionEnabled = false);

        var configuration = context.Services.GetConfiguration();

        // Explicitly register the migrations DbContext so Autofac can resolve its options
        context.Services.AddDbContext<AICodeReview.EntityFrameworkCore.AICodeReviewMigrationsDbContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("Default"));
        });

        context.Services.AddTransient<AICodeReview.Data.AICodeReviewDbMigrationService>();
    }
}