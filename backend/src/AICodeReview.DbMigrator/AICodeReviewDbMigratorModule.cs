using System;
using AICodeReview;                              // Domain module (сидинг и др.)
using AICodeReview.Data;                         // AICodeReviewDbMigrationService
using AICodeReview.EntityFrameworkCore;          // EF контексты
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement.EntityFrameworkCore; // ITenantRepository
using Volo.Abp.Timing;

// ABP EFCore модули, дающие репозитории/сторы для сидеров
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;

namespace AICodeReview.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),

    // ваш модуль EF (регистрация DbContext-ов)
    typeof(AICodeReviewEntityFrameworkCoreModule),

    // доменный модуль (сидеры/контрибуторы)
    typeof(AICodeReviewDomainModule),

    // контракты
    typeof(AICodeReviewApplicationContractsModule),

    // критично для сидеров Identity/Permissions и пр.
    typeof(AbpIdentityEntityFrameworkCoreModule),
    typeof(AbpOpenIddictEntityFrameworkCoreModule),
    typeof(AbpPermissionManagementEntityFrameworkCoreModule),
    typeof(AbpSettingManagementEntityFrameworkCoreModule),
    typeof(AbpFeatureManagementEntityFrameworkCoreModule),
    typeof(AbpAuditLoggingEntityFrameworkCoreModule),
    typeof(AbpBackgroundJobsEntityFrameworkCoreModule),
    typeof(AbpTenantManagementEntityFrameworkCoreModule)
)]
public class AICodeReviewDbMigratorModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        // Разрешить запись Local DateTime в timestamptz (защита на случай сторонних значений).
        // Рекомендуется всё равно держать UTC (см. ConfigureServices ниже).
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        // Гарантируем, что ABP всегда выдаёт UTC-время (CreationTime и т.п.)
        Configure<AbpClockOptions>(o => o.Kind = DateTimeKind.Utc);

        // мигратору не нужны фоновые задачи на старте
        Configure<AbpBackgroundJobOptions>(o => o.IsJobExecutionEnabled = false);

        // явная регистрация сид-сервиса (на случай если авто-скан не подхватит)
        context.Services.AddTransient<AICodeReviewDbMigrationService>();
    }
}

