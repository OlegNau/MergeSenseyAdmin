using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AICodeReview.Migrations
{
    [DbContext(typeof(AICodeReview.EntityFrameworkCore.AICodeReviewDbContext))]
    partial class AICodeReviewDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "9.0.8");

            modelBuilder.Entity("AICodeReview.Projects.Project", b =>
            {
                b.Property<Guid>("Id");
                b.Property<string>("Name").IsRequired().HasMaxLength(256);
                b.Property<string>("Description").HasMaxLength(2048);
                b.Property<string>("Provider").IsRequired().HasMaxLength(32);
                b.Property<string>("RepoPath").IsRequired().HasMaxLength(512);
                b.Property<string>("DefaultBranch").IsRequired().HasMaxLength(128);
                b.Property<string>("GitAccessToken").HasMaxLength(512);
                b.Property<bool>("IsActive").HasDefaultValue(true);
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("TenantId", "Name").IsUnique();
                b.ToTable("AppProjects", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Repositories.Repository", b =>
            {
                b.Property<Guid>("Id");
                b.Property<Guid>("ProjectId");
                b.Property<string>("Name").IsRequired().HasMaxLength(256);
                b.Property<string>("Url").IsRequired().HasMaxLength(2048);
                b.Property<string>("WebhookUrl").HasMaxLength(2048);
                b.Property<bool>("IsActive").HasDefaultValue(true);
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("ProjectId");
                b.HasIndex("ProjectId", "Name").IsUnique();
                b.HasIndex("TenantId", "Url").IsUnique();
                b.ToTable("AppRepositories", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Branches.Branch", b =>
            {
                b.Property<Guid>("Id");
                b.Property<Guid>("RepositoryId");
                b.Property<string>("Name").IsRequired().HasMaxLength(256);
                b.Property<string>("LastCommitSha").HasMaxLength(64);
                b.Property<bool>("IsDefault");
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("RepositoryId");
                b.HasIndex("RepositoryId", "Name").IsUnique();
                b.HasIndex("RepositoryId", "IsDefault").IsUnique().HasFilter("IsDefault = 1");
                b.ToTable("AppBranches", (string)null);
            });

            modelBuilder.Entity("AICodeReview.TriggerTypes.TriggerType", b =>
            {
                b.Property<long>("Id");
                b.Property<string>("Name").IsRequired().HasMaxLength(64);
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("Name").IsUnique();
                b.ToTable("AppTriggerTypes", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Triggers.Trigger", b =>
            {
                b.Property<Guid>("Id");
                b.Property<Guid>("RepositoryId");
                b.Property<Guid>("BranchId");
                b.Property<long>("TypeId");
                b.Property<string>("ScheduleJson").HasColumnType("TEXT");
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("RepositoryId");
                b.HasIndex("BranchId");
                b.HasIndex("TypeId");
                b.HasIndex("RepositoryId", "BranchId", "TypeId").IsUnique();
                b.ToTable("AppTriggers", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Nodes.NodeType", b =>
            {
                b.Property<long>("Id");
                b.Property<string>("Name").IsRequired().HasMaxLength(64);
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("Name").IsUnique();
                b.ToTable("AppNodeTypes", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Nodes.Node", b =>
            {
                b.Property<Guid>("Id");
                b.Property<long>("TypeId");
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("TypeId");
                b.ToTable("AppNodes", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Pipelines.Pipeline", b =>
            {
                b.Property<Guid>("Id");
                b.Property<Guid>("ProjectId");
                b.Property<string>("Name").IsRequired().HasMaxLength(256);
                b.Property<string>("Status").IsRequired().HasMaxLength(32);
                b.Property<DateTime?>("StartedAt");
                b.Property<DateTime?>("FinishedAt");
                b.Property<int?>("DurationSeconds");
                b.Property<bool>("IsActive").HasDefaultValue(true);
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("ProjectId");
                b.HasIndex("ProjectId", "Name").IsUnique();
                b.ToTable("AppPipelines", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Nodes.PipelineNode", b =>
            {
                b.Property<Guid>("Id");
                b.Property<Guid>("PipelineId");
                b.Property<Guid>("NodeId");
                b.Property<int>("Order");
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("PipelineId");
                b.HasIndex("NodeId");
                b.HasIndex("PipelineId", "Order").IsUnique();
                b.ToTable("AppPipelineNodes", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Groups.Group", b =>
            {
                b.Property<Guid>("Id");
                b.Property<string>("Name").IsRequired().HasMaxLength(256);
                b.Property<string>("Description").HasMaxLength(2048);
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.ToTable("AppGroups", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Groups.GroupProject", b =>
            {
                b.Property<Guid>("Id");
                b.Property<Guid>("GroupId");
                b.Property<Guid>("ProjectId");
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.HasIndex("GroupId");
                b.HasIndex("ProjectId");
                b.HasIndex("GroupId", "ProjectId").IsUnique();
                b.ToTable("AppGroupProjects", (string)null);
            });

            modelBuilder.Entity("AICodeReview.AiModels.AiModel", b =>
            {
                b.Property<Guid>("Id");
                b.Property<string>("Name").IsRequired().HasMaxLength(128);
                b.Property<string>("Provider").IsRequired().HasMaxLength(64);
                b.Property<string>("Model").IsRequired().HasMaxLength(128);
                b.Property<string>("ApiBaseUrl").HasMaxLength(256);
                b.Property<string>("ApiKey").HasMaxLength(512);
                b.Property<bool>("IsActive").HasDefaultValue(true);
                b.Property<Guid?>("TenantId");
                b.Property<string>("ExtraProperties").IsRequired().HasDefaultValue("{}");
                b.Property<string>("ConcurrencyStamp").HasMaxLength(40);
                b.Property<DateTime>("CreationTime");
                b.Property<Guid?>("CreatorId");
                b.Property<DateTime?>("LastModificationTime");
                b.Property<Guid?>("LastModifierId");
                b.Property<bool>("IsDeleted").HasDefaultValue(false);
                b.Property<Guid?>("DeleterId");
                b.Property<DateTime?>("DeletionTime");
                b.HasKey("Id");
                b.ToTable("AppAiModels", (string)null);
            });

            modelBuilder.Entity("AICodeReview.Triggers.Trigger", b =>
            {
                b.HasOne("AICodeReview.Branches.Branch", "Branch")
                    .WithMany()
                    .HasForeignKey("BranchId")
                    .OnDelete(DeleteBehavior.Cascade);
                b.HasOne("AICodeReview.Repositories.Repository", "Repository")
                    .WithMany()
                    .HasForeignKey("RepositoryId")
                    .OnDelete(DeleteBehavior.Cascade);
                b.HasOne("AICodeReview.TriggerTypes.TriggerType", "Type")
                    .WithMany()
                    .HasForeignKey("TypeId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity("AICodeReview.Nodes.Node", b =>
            {
                b.HasOne("AICodeReview.Nodes.NodeType", "Type")
                    .WithMany()
                    .HasForeignKey("TypeId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity("AICodeReview.Nodes.PipelineNode", b =>
            {
                b.HasOne("AICodeReview.Nodes.Node", "Node")
                    .WithMany()
                    .HasForeignKey("NodeId")
                    .OnDelete(DeleteBehavior.Cascade);
                b.HasOne("AICodeReview.Pipelines.Pipeline", "Pipeline")
                    .WithMany()
                    .HasForeignKey("PipelineId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity("AICodeReview.Branches.Branch", b =>
            {
                b.HasOne("AICodeReview.Repositories.Repository", "Repository")
                    .WithMany()
                    .HasForeignKey("RepositoryId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity("AICodeReview.Repositories.Repository", b =>
            {
                b.HasOne("AICodeReview.Projects.Project", "Project")
                    .WithMany()
                    .HasForeignKey("ProjectId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity("AICodeReview.Pipelines.Pipeline", b =>
            {
                b.HasOne("AICodeReview.Projects.Project", "Project")
                    .WithMany()
                    .HasForeignKey("ProjectId")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity("AICodeReview.Groups.GroupProject", b =>
            {
                b.HasOne("AICodeReview.Groups.Group", "Group")
                    .WithMany()
                    .HasForeignKey("GroupId")
                    .OnDelete(DeleteBehavior.Cascade);
                b.HasOne("AICodeReview.Projects.Project", "Project")
                    .WithMany()
                    .HasForeignKey("ProjectId")
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}

