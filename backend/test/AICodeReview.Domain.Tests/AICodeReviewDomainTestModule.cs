using Volo.Abp.Modularity;

namespace AICodeReview;

[DependsOn(
    typeof(AICodeReviewDomainModule),
    typeof(AICodeReviewTestBaseModule)
)]
public class AICodeReviewDomainTestModule : AbpModule
{

}
