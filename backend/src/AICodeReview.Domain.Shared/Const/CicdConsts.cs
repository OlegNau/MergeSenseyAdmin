namespace AICodeReview.Consts;

public static class CicdConsts
{
    public static class Lengths
    {
        public const int NameShort   = 64;
        public const int Name        = 128;
        public const int NameLong    = 256;
        public const int Url         = 2048;
        public const int Description = 2048;
        public const int Provider    = 64;
        public const int Model       = 128;
        public const int ApiBaseUrl  = 256;
        public const int AccessToken = 512;
        public const int ApiKey      = 512;
        public const int BranchSha   = 64;
        public const int BranchName  = 256;
        public const int PipelineStatus = 32;
        public const int RepoPath    = 512;
        public const int DefaultBranch = 128;
    }

    public static class Providers
    {
        public const string GitHub      = "github";
        public const string GitLab      = "gitlab";
        public const string AzureDevOps = "azuredevops";
        public const string Local       = "local";
    }

    public static class PipelineStatuses
    {
        public const string Queued    = "queued";
        public const string Running   = "running";
        public const string Succeeded = "succeeded";
        public const string Failed    = "failed";
        public const string Canceled  = "canceled";
    }

    public static class TriggerTypeNames
    {
        public const string Manual   = "manual";
        public const string Push     = "push";
        public const string Schedule = "schedule";
    }

    public static class NodeTypeNames
    {
        public const string Lint   = "lint";
        public const string Test   = "test";
        public const string Build  = "build";
        public const string Deploy = "deploy";
        public const string Custom = "custom";
    }
}