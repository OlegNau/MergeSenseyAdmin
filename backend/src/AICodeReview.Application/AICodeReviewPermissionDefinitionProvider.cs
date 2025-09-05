using AICodeReview.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace AICodeReview.Permissions;

public class AICodeReviewPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var group = context.AddGroup(AICodeReviewPermissions.GroupName, L("Permission:AICodeReview"));

        var projects = group.AddPermission(AICodeReviewPermissions.Projects.Default, L("Permission:Projects"));
        projects.AddChild(AICodeReviewPermissions.Projects.Create, L("Permission:Projects.Create"));
        projects.AddChild(AICodeReviewPermissions.Projects.Update, L("Permission:Projects.Update"));
        projects.AddChild(AICodeReviewPermissions.Projects.Delete, L("Permission:Projects.Delete"));

        var repositories = group.AddPermission(AICodeReviewPermissions.Repositories.Default, L("Permission:Repositories"));
        repositories.AddChild(AICodeReviewPermissions.Repositories.Create, L("Permission:Repositories.Create"));
        repositories.AddChild(AICodeReviewPermissions.Repositories.Update, L("Permission:Repositories.Update"));
        repositories.AddChild(AICodeReviewPermissions.Repositories.Delete, L("Permission:Repositories.Delete"));

        var branches = group.AddPermission(AICodeReviewPermissions.Branches.Default, L("Permission:Branches"));
        branches.AddChild(AICodeReviewPermissions.Branches.Create, L("Permission:Branches.Create"));
        branches.AddChild(AICodeReviewPermissions.Branches.Update, L("Permission:Branches.Update"));
        branches.AddChild(AICodeReviewPermissions.Branches.Delete, L("Permission:Branches.Delete"));

        var triggers = group.AddPermission(AICodeReviewPermissions.Triggers.Default, L("Permission:Triggers"));
        triggers.AddChild(AICodeReviewPermissions.Triggers.Create, L("Permission:Triggers.Create"));
        triggers.AddChild(AICodeReviewPermissions.Triggers.Update, L("Permission:Triggers.Update"));
        triggers.AddChild(AICodeReviewPermissions.Triggers.Delete, L("Permission:Triggers.Delete"));

        var pipelines = group.AddPermission(AICodeReviewPermissions.Pipelines.Default, L("Permission:Pipelines"));
        pipelines.AddChild(AICodeReviewPermissions.Pipelines.Create, L("Permission:Pipelines.Create"));
        pipelines.AddChild(AICodeReviewPermissions.Pipelines.Update, L("Permission:Pipelines.Update"));
        pipelines.AddChild(AICodeReviewPermissions.Pipelines.Delete, L("Permission:Pipelines.Delete"));

        var nodes = group.AddPermission(AICodeReviewPermissions.Nodes.Default, L("Permission:Nodes"));
        nodes.AddChild(AICodeReviewPermissions.Nodes.Create, L("Permission:Nodes.Create"));
        nodes.AddChild(AICodeReviewPermissions.Nodes.Update, L("Permission:Nodes.Update"));
        nodes.AddChild(AICodeReviewPermissions.Nodes.Delete, L("Permission:Nodes.Delete"));

        var groups = group.AddPermission(AICodeReviewPermissions.Groups.Default, L("Permission:Groups"));
        groups.AddChild(AICodeReviewPermissions.Groups.Create, L("Permission:Groups.Create"));
        groups.AddChild(AICodeReviewPermissions.Groups.Update, L("Permission:Groups.Update"));
        groups.AddChild(AICodeReviewPermissions.Groups.Delete, L("Permission:Groups.Delete"));

        var aiModels = group.AddPermission(AICodeReviewPermissions.AiModels.Default, L("Permission:AiModels"));
        aiModels.AddChild(AICodeReviewPermissions.AiModels.Create, L("Permission:AiModels.Create"));
        aiModels.AddChild(AICodeReviewPermissions.AiModels.Update, L("Permission:AiModels.Update"));
        aiModels.AddChild(AICodeReviewPermissions.AiModels.Delete, L("Permission:AiModels.Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<AICodeReviewResource>(name);
    }
}
