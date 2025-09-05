using AICodeReview.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace AICodeReview.Permissions;

public class AICodeReviewPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var group = context.GetGroupOrNull(AICodeReviewPermissions.GroupName)
                   ?? context.AddGroup(AICodeReviewPermissions.GroupName, L("Permission:AICodeReview"));

        var projects = context.GetPermissionOrNull(AICodeReviewPermissions.Projects.Default)
                      ?? group.AddPermission(AICodeReviewPermissions.Projects.Default, L("Permission:Projects"));

        if (context.GetPermissionOrNull(AICodeReviewPermissions.Projects.Create) == null)
            projects.AddChild(AICodeReviewPermissions.Projects.Create, L("Permission:Projects.Create"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Projects.Update) == null)
            projects.AddChild(AICodeReviewPermissions.Projects.Update, L("Permission:Projects.Update"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Projects.Delete) == null)
            projects.AddChild(AICodeReviewPermissions.Projects.Delete, L("Permission:Projects.Delete"));

        var repositories = context.GetPermissionOrNull(AICodeReviewPermissions.Repositories.Default)
                           ?? group.AddPermission(AICodeReviewPermissions.Repositories.Default, L("Permission:Repositories"));

        if (context.GetPermissionOrNull(AICodeReviewPermissions.Repositories.Create) == null)
            repositories.AddChild(AICodeReviewPermissions.Repositories.Create, L("Permission:Repositories.Create"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Repositories.Update) == null)
            repositories.AddChild(AICodeReviewPermissions.Repositories.Update, L("Permission:Repositories.Update"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Repositories.Delete) == null)
            repositories.AddChild(AICodeReviewPermissions.Repositories.Delete, L("Permission:Repositories.Delete"));

        var branches = context.GetPermissionOrNull(AICodeReviewPermissions.Branches.Default)
                       ?? group.AddPermission(AICodeReviewPermissions.Branches.Default, L("Permission:Branches"));

        if (context.GetPermissionOrNull(AICodeReviewPermissions.Branches.Create) == null)
            branches.AddChild(AICodeReviewPermissions.Branches.Create, L("Permission:Branches.Create"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Branches.Update) == null)
            branches.AddChild(AICodeReviewPermissions.Branches.Update, L("Permission:Branches.Update"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Branches.Delete) == null)
            branches.AddChild(AICodeReviewPermissions.Branches.Delete, L("Permission:Branches.Delete"));

        var triggers = context.GetPermissionOrNull(AICodeReviewPermissions.Triggers.Default)
                       ?? group.AddPermission(AICodeReviewPermissions.Triggers.Default, L("Permission:Triggers"));

        if (context.GetPermissionOrNull(AICodeReviewPermissions.Triggers.Create) == null)
            triggers.AddChild(AICodeReviewPermissions.Triggers.Create, L("Permission:Triggers.Create"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Triggers.Update) == null)
            triggers.AddChild(AICodeReviewPermissions.Triggers.Update, L("Permission:Triggers.Update"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Triggers.Delete) == null)
            triggers.AddChild(AICodeReviewPermissions.Triggers.Delete, L("Permission:Triggers.Delete"));

        var pipelines = context.GetPermissionOrNull(AICodeReviewPermissions.Pipelines.Default)
                        ?? group.AddPermission(AICodeReviewPermissions.Pipelines.Default, L("Permission:Pipelines"));

        if (context.GetPermissionOrNull(AICodeReviewPermissions.Pipelines.Create) == null)
            pipelines.AddChild(AICodeReviewPermissions.Pipelines.Create, L("Permission:Pipelines.Create"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Pipelines.Update) == null)
            pipelines.AddChild(AICodeReviewPermissions.Pipelines.Update, L("Permission:Pipelines.Update"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Pipelines.Delete) == null)
            pipelines.AddChild(AICodeReviewPermissions.Pipelines.Delete, L("Permission:Pipelines.Delete"));

        var nodes = context.GetPermissionOrNull(AICodeReviewPermissions.Nodes.Default)
                     ?? group.AddPermission(AICodeReviewPermissions.Nodes.Default, L("Permission:Nodes"));

        if (context.GetPermissionOrNull(AICodeReviewPermissions.Nodes.Create) == null)
            nodes.AddChild(AICodeReviewPermissions.Nodes.Create, L("Permission:Nodes.Create"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Nodes.Update) == null)
            nodes.AddChild(AICodeReviewPermissions.Nodes.Update, L("Permission:Nodes.Update"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Nodes.Delete) == null)
            nodes.AddChild(AICodeReviewPermissions.Nodes.Delete, L("Permission:Nodes.Delete"));

        var groups = context.GetPermissionOrNull(AICodeReviewPermissions.Groups.Default)
                      ?? group.AddPermission(AICodeReviewPermissions.Groups.Default, L("Permission:Groups"));

        if (context.GetPermissionOrNull(AICodeReviewPermissions.Groups.Create) == null)
            groups.AddChild(AICodeReviewPermissions.Groups.Create, L("Permission:Groups.Create"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Groups.Update) == null)
            groups.AddChild(AICodeReviewPermissions.Groups.Update, L("Permission:Groups.Update"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.Groups.Delete) == null)
            groups.AddChild(AICodeReviewPermissions.Groups.Delete, L("Permission:Groups.Delete"));
        
        var aiModels = context.GetPermissionOrNull(AICodeReviewPermissions.AiModels.Default)
                        ?? group.AddPermission(AICodeReviewPermissions.AiModels.Default, L("Permission:AiModels"));

        if (context.GetPermissionOrNull(AICodeReviewPermissions.AiModels.Create) == null)
            aiModels.AddChild(AICodeReviewPermissions.AiModels.Create, L("Permission:AiModels.Create"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.AiModels.Update) == null)
            aiModels.AddChild(AICodeReviewPermissions.AiModels.Update, L("Permission:AiModels.Update"));
        if (context.GetPermissionOrNull(AICodeReviewPermissions.AiModels.Delete) == null)
            aiModels.AddChild(AICodeReviewPermissions.AiModels.Delete, L("Permission:AiModels.Delete"));
    }

    private static LocalizableString L(string name)
        => LocalizableString.Create<AICodeReviewResource>(name);
}
