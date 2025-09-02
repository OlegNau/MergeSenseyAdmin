using Volo.Abp.Modularity;

namespace AICodeReview;

public abstract class AICodeReviewApplicationTestBase<TStartupModule> : AICodeReviewTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
