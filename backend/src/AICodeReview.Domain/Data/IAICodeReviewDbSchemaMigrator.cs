using System.Threading.Tasks;

namespace AICodeReview.Data;

public interface IAICodeReviewDbSchemaMigrator
{
    Task MigrateAsync();
}
