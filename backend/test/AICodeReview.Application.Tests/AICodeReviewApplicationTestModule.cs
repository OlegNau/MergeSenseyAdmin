using Volo.Abp.Modularity;

namespace AICodeReview;

[DependsOn(
    typeof(AICodeReviewApplicationModule),
    typeof(AICodeReviewDomainTestModule)
)]
public class AICodeReviewApplicationTestModule : AbpModule
{

}
