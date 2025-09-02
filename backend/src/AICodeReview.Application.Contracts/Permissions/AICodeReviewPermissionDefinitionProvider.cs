using AICodeReview.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace AICodeReview.Permissions;

public class AICodeReviewPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(AICodeReviewPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(AICodeReviewPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<AICodeReviewResource>(name);
    }
}
