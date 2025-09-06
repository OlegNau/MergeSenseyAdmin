using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.PostgreSql;
using Volo.Abp.Modularity;
using Volo.Abp.Uow;

namespace AICodeReview.EntityFrameworkCore;

[DependsOn(
    typeof(AbpEntityFrameworkCorePostgreSqlModule)
)]
public class AICodeReviewEntityFrameworkCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        // Runtime DbContext + репозитории (как и было)
        context.Services.AddAbpDbContext<AICodeReviewDbContext>(options =>
        {
            options.AddDefaultRepositories(includeAllEntities: true);
        });

        // Регистрируем MIGRATIONS DbContext в DI, чтобы DbMigrator мог его резолвить
        context.Services.AddAbpDbContext<AICodeReviewMigrationsDbContext>(options => { /* без репозиториев */ });

        Configure<AbpDbContextOptions>(options =>
        {
            options.UseNpgsql();
        });

        Configure<AbpUnitOfWorkDefaultOptions>(options =>
        {
            // Обычно в миграторах транзакции отключают
            options.TransactionBehavior = UnitOfWorkTransactionBehavior.Disabled;
        });
    }
}
