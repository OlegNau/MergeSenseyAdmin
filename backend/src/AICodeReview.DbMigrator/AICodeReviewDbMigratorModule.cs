using AICodeReview.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace AICodeReview.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(AICodeReviewEntityFrameworkCoreModule),
    typeof(AICodeReviewApplicationContractsModule)
    )]
public class AICodeReviewDbMigratorModule : AbpModule
{
}
