using System;
using System.Threading.Tasks;
using AICodeReview.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.DependencyInjection;

namespace AICodeReview.EntityFrameworkCore;

public class EntityFrameworkCoreAICodeReviewDbSchemaMigrator
    : IAICodeReviewDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreAICodeReviewDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        // Сначала применяем миграции MIGRATIONS-контекста (содержит App* таблицы)
        var migrationsCtx = _serviceProvider.GetService<AICodeReviewMigrationsDbContext>();
        if (migrationsCtx != null)
        {
            await migrationsCtx.Database.MigrateAsync();
            return;
        }

        // Фоллбек: runtime-контекст
        var runtimeCtx = _serviceProvider.GetRequiredService<AICodeReviewDbContext>();
        await runtimeCtx.Database.MigrateAsync();
    }
}