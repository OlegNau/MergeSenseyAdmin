using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.PostgreSql;

using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;

using Volo.Abp.Modularity;

namespace AICodeReview.EntityFrameworkCore;

[DependsOn(
    typeof(AbpEntityFrameworkCorePostgreSqlModule),

    typeof(AbpIdentityEntityFrameworkCoreModule),
    typeof(AbpTenantManagementEntityFrameworkCoreModule),
    typeof(AbpOpenIddictEntityFrameworkCoreModule),

    typeof(AbpPermissionManagementEntityFrameworkCoreModule),
    typeof(AbpSettingManagementEntityFrameworkCoreModule),
    typeof(AbpFeatureManagementEntityFrameworkCoreModule),
    typeof(AbpAuditLoggingEntityFrameworkCoreModule)
)]
public class AICodeReviewEntityFrameworkCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAbpDbContext<AICodeReviewDbContext>(options =>
        {
            options.ReplaceDbContext<IIdentityDbContext>();
            options.ReplaceDbContext<ITenantManagementDbContext>();
            options.ReplaceDbContext<IOpenIddictDbContext>();
            options.ReplaceDbContext<IPermissionManagementDbContext>();
            options.ReplaceDbContext<ISettingManagementDbContext>();
            options.ReplaceDbContext<IFeatureManagementDbContext>();
            options.ReplaceDbContext<IAuditLoggingDbContext>();

            // Регистрируем репозитории для всех сущностей (включая ваши)
            options.AddDefaultRepositories(includeAllEntities: true);
        });

        Configure<AbpDbContextOptions>(opts =>
        {
            opts.UseNpgsql();
        });
    }
}
