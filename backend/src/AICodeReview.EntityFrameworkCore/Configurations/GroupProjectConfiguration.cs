namespace AICodeReview.EntityFrameworkCore.Configurations;

using AICodeReview.Groups;
using AICodeReview.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.EntityFrameworkCore.Modeling;

public class GroupProjectConfiguration : IEntityTypeConfiguration<GroupProject>
{
    public void Configure(EntityTypeBuilder<GroupProject> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "GroupProjects", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.HasIndex(x => x.GroupId);
        builder.HasIndex(x => x.ProjectId);
        builder.HasIndex(x => new { x.GroupId, x.ProjectId }).IsUnique();

        builder.HasOne(x => x.Group)
            .WithMany()
            .HasForeignKey(x => x.GroupId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Project)
            .WithMany()
            .HasForeignKey(x => x.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
