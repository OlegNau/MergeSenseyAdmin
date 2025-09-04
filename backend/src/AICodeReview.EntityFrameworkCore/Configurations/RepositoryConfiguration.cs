namespace AICodeReview.EntityFrameworkCore.Configurations;

using AICodeReview.Repositories;
using AICodeReview.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.EntityFrameworkCore.Modeling;

public class RepositoryConfiguration : IEntityTypeConfiguration<Repository>
{
    public void Configure(EntityTypeBuilder<Repository> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "Repositories", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.Property(x => x.Name).IsRequired().HasMaxLength(256);
        builder.Property(x => x.Url).IsRequired().HasMaxLength(2048);
        builder.Property(x => x.WebhookUrl).HasMaxLength(2048);
        builder.Property(x => x.IsActive).HasDefaultValue(true);

        builder.HasIndex(x => x.ProjectId);
        builder.HasOne<Project>().WithMany().HasForeignKey(x => x.ProjectId).OnDelete(DeleteBehavior.Cascade);
    }
}
