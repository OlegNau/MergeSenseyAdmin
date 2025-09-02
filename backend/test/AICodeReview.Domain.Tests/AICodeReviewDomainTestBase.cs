using Volo.Abp.Modularity;

namespace AICodeReview;

/* Inherit from this class for your domain layer tests. */
public abstract class AICodeReviewDomainTestBase<TStartupModule> : AICodeReviewTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
