using AICodeReview.Samples;
using Xunit;

namespace AICodeReview.EntityFrameworkCore.Domains;

[Collection(AICodeReviewTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<AICodeReviewEntityFrameworkCoreTestModule>
{

}
