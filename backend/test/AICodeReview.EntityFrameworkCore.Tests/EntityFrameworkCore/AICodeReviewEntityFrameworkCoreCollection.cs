using Xunit;

namespace AICodeReview.EntityFrameworkCore;

[CollectionDefinition(AICodeReviewTestConsts.CollectionDefinitionName)]
public class AICodeReviewEntityFrameworkCoreCollection : ICollectionFixture<AICodeReviewEntityFrameworkCoreFixture>
{

}
