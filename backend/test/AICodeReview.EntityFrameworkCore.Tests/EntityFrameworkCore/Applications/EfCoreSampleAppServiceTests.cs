using AICodeReview.Samples;
using Xunit;

namespace AICodeReview.EntityFrameworkCore.Applications;

[Collection(AICodeReviewTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<AICodeReviewEntityFrameworkCoreTestModule>
{

}
