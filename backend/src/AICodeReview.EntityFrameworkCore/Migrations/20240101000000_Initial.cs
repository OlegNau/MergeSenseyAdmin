using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AICodeReview.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppProjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    Description = table.Column<string>(maxLength: 2048, nullable: true),
                    Provider = table.Column<string>(maxLength: 32, nullable: false),
                    RepoPath = table.Column<string>(maxLength: 512, nullable: false),
                    DefaultBranch = table.Column<string>(maxLength: 128, nullable: false),
                    GitAccessToken = table.Column<string>(maxLength: 512, nullable: true),
                    IsActive = table.Column<bool>(nullable: false, defaultValue: true),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppProjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppTriggerTypes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    Name = table.Column<string>(maxLength: 64, nullable: false),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppTriggerTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppNodeTypes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    Name = table.Column<string>(maxLength: 64, nullable: false),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppNodeTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    Description = table.Column<string>(maxLength: 2048, nullable: true),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppAiModels",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 128, nullable: false),
                    Provider = table.Column<string>(maxLength: 64, nullable: false),
                    Model = table.Column<string>(maxLength: 128, nullable: false),
                    ApiBaseUrl = table.Column<string>(maxLength: 256, nullable: true),
                    ApiKey = table.Column<string>(maxLength: 512, nullable: true),
                    IsActive = table.Column<bool>(nullable: false, defaultValue: true),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAiModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppRepositories",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ProjectId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    Url = table.Column<string>(maxLength: 2048, nullable: false),
                    WebhookUrl = table.Column<string>(maxLength: 2048, nullable: true),
                    IsActive = table.Column<bool>(nullable: false, defaultValue: true),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppRepositories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppRepositories_AppProjects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "AppProjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppPipelines",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ProjectId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    Status = table.Column<string>(maxLength: 32, nullable: false),
                    StartedAt = table.Column<DateTime>(nullable: true),
                    FinishedAt = table.Column<DateTime>(nullable: true),
                    DurationSeconds = table.Column<int>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false, defaultValue: true),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPipelines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppPipelines_AppProjects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "AppProjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppNodes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TypeId = table.Column<long>(nullable: false),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppNodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppNodes_AppNodeTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "AppNodeTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppBranches",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RepositoryId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: false),
                    LastCommitSha = table.Column<string>(maxLength: 64, nullable: true),
                    IsDefault = table.Column<bool>(nullable: false),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBranches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppBranches_AppRepositories_RepositoryId",
                        column: x => x.RepositoryId,
                        principalTable: "AppRepositories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppTriggers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RepositoryId = table.Column<Guid>(nullable: false),
                    BranchId = table.Column<Guid>(nullable: false),
                    TypeId = table.Column<long>(nullable: false),
                    ScheduleJson = table.Column<string>(type: "TEXT", nullable: true),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppTriggers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppTriggers_AppBranches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "AppBranches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppTriggers_AppRepositories_RepositoryId",
                        column: x => x.RepositoryId,
                        principalTable: "AppRepositories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppTriggers_AppTriggerTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "AppTriggerTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppPipelineNodes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    PipelineId = table.Column<Guid>(nullable: false),
                    NodeId = table.Column<Guid>(nullable: false),
                    Order = table.Column<int>(nullable: false),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPipelineNodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppPipelineNodes_AppNodes_NodeId",
                        column: x => x.NodeId,
                        principalTable: "AppNodes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppPipelineNodes_AppPipelines_PipelineId",
                        column: x => x.PipelineId,
                        principalTable: "AppPipelines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppGroupProjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    GroupId = table.Column<Guid>(nullable: false),
                    ProjectId = table.Column<Guid>(nullable: false),
                    TenantId = table.Column<Guid>(nullable: true),
                    ExtraProperties = table.Column<string>(nullable: false, defaultValue: "{}"),
                    ConcurrencyStamp = table.Column<string>(maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorId = table.Column<Guid>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierId = table.Column<Guid>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppGroupProjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppGroupProjects_AppGroups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "AppGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppGroupProjects_AppProjects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "AppProjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppProjects_TenantId_Name",
                table: "AppProjects",
                columns: new[] { "TenantId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppRepositories_ProjectId",
                table: "AppRepositories",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRepositories_ProjectId_Name",
                table: "AppRepositories",
                columns: new[] { "ProjectId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppRepositories_TenantId_Url",
                table: "AppRepositories",
                columns: new[] { "TenantId", "Url" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppBranches_RepositoryId",
                table: "AppBranches",
                column: "RepositoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AppBranches_RepositoryId_Name",
                table: "AppBranches",
                columns: new[] { "RepositoryId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppBranches_RepositoryId_IsDefault",
                table: "AppBranches",
                columns: new[] { "RepositoryId", "IsDefault" },
                unique: true,
                filter: "IsDefault = 1");

            migrationBuilder.CreateIndex(
                name: "IX_AppPipelines_ProjectId",
                table: "AppPipelines",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPipelines_ProjectId_Name",
                table: "AppPipelines",
                columns: new[] { "ProjectId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppTriggers_RepositoryId",
                table: "AppTriggers",
                column: "RepositoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AppTriggers_BranchId",
                table: "AppTriggers",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_AppTriggers_TypeId",
                table: "AppTriggers",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppTriggers_Unique",
                table: "AppTriggers",
                columns: new[] { "RepositoryId", "BranchId", "TypeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppNodes_TypeId",
                table: "AppNodes",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPipelineNodes_PipelineId",
                table: "AppPipelineNodes",
                column: "PipelineId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPipelineNodes_NodeId",
                table: "AppPipelineNodes",
                column: "NodeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPipelineNodes_PipelineId_Order",
                table: "AppPipelineNodes",
                columns: new[] { "PipelineId", "Order" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppGroupProjects_GroupId",
                table: "AppGroupProjects",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_AppGroupProjects_ProjectId",
                table: "AppGroupProjects",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_AppGroupProjects_GroupId_ProjectId",
                table: "AppGroupProjects",
                columns: new[] { "GroupId", "ProjectId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppTriggerTypes_Name",
                table: "AppTriggerTypes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppNodeTypes_Name",
                table: "AppNodeTypes",
                column: "Name",
                unique: true);

            migrationBuilder.InsertData(
                table: "AppTriggerTypes",
                columns: new[] { "Id", "Name", "ExtraProperties", "ConcurrencyStamp", "CreationTime", "IsDeleted" },
                values: new object[,]
                {
                    { 1L, "manual", "{}", Guid.Empty.ToString(), new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc), false },
                    { 2L, "push", "{}", Guid.Empty.ToString(), new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc), false },
                    { 3L, "schedule", "{}", Guid.Empty.ToString(), new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc), false }
                });

            migrationBuilder.InsertData(
                table: "AppNodeTypes",
                columns: new[] { "Id", "Name", "ExtraProperties", "ConcurrencyStamp", "CreationTime", "IsDeleted" },
                values: new object[,]
                {
                    { 1L, "lint", "{}", Guid.Empty.ToString(), new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc), false },
                    { 2L, "test", "{}", Guid.Empty.ToString(), new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc), false },
                    { 3L, "build", "{}", Guid.Empty.ToString(), new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc), false },
                    { 4L, "deploy", "{}", Guid.Empty.ToString(), new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc), false },
                    { 5L, "custom", "{}", Guid.Empty.ToString(), new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc), false }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "AppGroupProjects");
            migrationBuilder.DropTable(name: "AppPipelineNodes");
            migrationBuilder.DropTable(name: "AppTriggers");
            migrationBuilder.DropTable(name: "AppNodes");
            migrationBuilder.DropTable(name: "AppPipelines");
            migrationBuilder.DropTable(name: "AppNodeTypes");
            migrationBuilder.DropTable(name: "AppGroups");
            migrationBuilder.DropTable(name: "AppRepositories");
            migrationBuilder.DropTable(name: "AppTriggerTypes");
            migrationBuilder.DropTable(name: "AppBranches");
            migrationBuilder.DropTable(name: "AppProjects");
            migrationBuilder.DropTable(name: "AppAiModels");
        }
    }
}

