using System;
using System.Collections.Generic;
using System.Text;
using AICodeReview.Localization;
using Volo.Abp.Application.Services;

namespace AICodeReview;

/* Inherit your application services from this class.
 */
public abstract class AICodeReviewAppService : ApplicationService
{
    protected AICodeReviewAppService()
    {
        LocalizationResource = typeof(AICodeReviewResource);
    }
}
