using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace AICodeReview.Data;

/* This is used if database provider does't define
 * IAICodeReviewDbSchemaMigrator implementation.
 */
public class NullAICodeReviewDbSchemaMigrator : IAICodeReviewDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
