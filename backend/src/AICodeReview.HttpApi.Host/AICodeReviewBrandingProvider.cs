using Microsoft.Extensions.Localization;
using AICodeReview.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace AICodeReview;

[Dependency(ReplaceServices = true)]
public class AICodeReviewBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<AICodeReviewResource> _localizer;

    public AICodeReviewBrandingProvider(IStringLocalizer<AICodeReviewResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
