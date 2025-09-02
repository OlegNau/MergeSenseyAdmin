using Volo.Abp.Settings;

namespace AICodeReview.Settings;

public class AICodeReviewSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(AICodeReviewSettings.MySetting1));
    }
}
