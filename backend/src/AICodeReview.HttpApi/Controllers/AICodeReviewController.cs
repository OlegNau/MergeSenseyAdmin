using AICodeReview.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace AICodeReview.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class AICodeReviewController : AbpControllerBase
{
    protected AICodeReviewController()
    {
        LocalizationResource = typeof(AICodeReviewResource);
    }
}
