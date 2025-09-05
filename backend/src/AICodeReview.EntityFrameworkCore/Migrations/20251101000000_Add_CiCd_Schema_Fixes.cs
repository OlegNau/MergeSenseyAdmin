using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AICodeReview.Migrations
{
    /// <inheritdoc />
    public partial class Add_CiCd_Schema_Fixes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "IX_AppProjects_TenantId_Name",
                table: "AppProjects",
                columns: new[] { "TenantId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppPipelines_ProjectId_Name",
                table: "AppPipelines",
                columns: new[] { "ProjectId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppTriggers_RepositoryId_BranchId_TypeId",
                table: "AppTriggers",
                columns: new[] { "RepositoryId", "BranchId", "TypeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppNodeTypes_Name",
                table: "AppNodeTypes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppTriggerTypes_Name",
                table: "AppTriggerTypes",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppBranches_RepositoryId_Name",
                table: "AppBranches");

            migrationBuilder.DropIndex(
                name: "IX_AppBranches_RepositoryId_IsDefault",
                table: "AppBranches");

            migrationBuilder.DropIndex(
                name: "IX_AppRepositories_ProjectId_Name",
                table: "AppRepositories");

            migrationBuilder.DropIndex(
                name: "IX_AppRepositories_TenantId_Url",
                table: "AppRepositories");

            migrationBuilder.DropIndex(
                name: "IX_AppProjects_TenantId_Name",
                table: "AppProjects");

            migrationBuilder.DropIndex(
                name: "IX_AppPipelines_ProjectId_Name",
                table: "AppPipelines");

            migrationBuilder.DropIndex(
                name: "IX_AppTriggers_RepositoryId_BranchId_TypeId",
                table: "AppTriggers");

            migrationBuilder.DropIndex(
                name: "IX_AppNodeTypes_Name",
                table: "AppNodeTypes");

            migrationBuilder.DropIndex(
                name: "IX_AppTriggerTypes_Name",
                table: "AppTriggerTypes");
        }
    }
}
