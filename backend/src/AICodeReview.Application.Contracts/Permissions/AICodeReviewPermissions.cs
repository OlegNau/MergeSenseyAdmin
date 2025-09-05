namespace AICodeReview.Permissions;

public static class AICodeReviewPermissions
{
    public const string GroupName = "AICodeReview";

    public static class Projects
    {
        public const string Default = GroupName + ".Projects";
        public const string Create  = Default + ".Create";
        public const string Update  = Default + ".Update";
        public const string Delete  = Default + ".Delete";
    }

    public static class Repositories
    {
        public const string Default = GroupName + ".Repositories";
        public const string Create  = Default + ".Create";
        public const string Update  = Default + ".Update";
        public const string Delete  = Default + ".Delete";
    }

    public static class Branches
    {
        public const string Default = GroupName + ".Branches";
        public const string Create  = Default + ".Create";
        public const string Update  = Default + ".Update";
        public const string Delete  = Default + ".Delete";
    }

    public static class Triggers
    {
        public const string Default = GroupName + ".Triggers";
        public const string Create  = Default + ".Create";
        public const string Update  = Default + ".Update";
        public const string Delete  = Default + ".Delete";
    }

    public static class Pipelines
    {
        public const string Default = GroupName + ".Pipelines";
        public const string Create  = Default + ".Create";
        public const string Update  = Default + ".Update";
        public const string Delete  = Default + ".Delete";
    }

    public static class Nodes
    {
        public const string Default = GroupName + ".Nodes";
        public const string Create  = Default + ".Create";
        public const string Update  = Default + ".Update";
        public const string Delete  = Default + ".Delete";
    }

    public static class Groups
    {
        public const string Default = GroupName + ".Groups";
        public const string Create  = Default + ".Create";
        public const string Update  = Default + ".Update";
        public const string Delete  = Default + ".Delete";
    }

    public static class AiModels
    {
        public const string Default = GroupName + ".AiModels";
        public const string Create  = Default + ".Create";
        public const string Update  = Default + ".Update";
        public const string Delete  = Default + ".Delete";
    }
}
