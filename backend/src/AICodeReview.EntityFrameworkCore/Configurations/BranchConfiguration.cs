namespace AICodeReview.EntityFrameworkCore.Configurations;

using AICodeReview.Branches;
using AICodeReview.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.EntityFrameworkCore.Modeling;

public class BranchConfiguration : IEntityTypeConfiguration<Branch>
{
    public void Configure(EntityTypeBuilder<Branch> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "Branches", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.Property(x => x.Name).IsRequired().HasMaxLength(256);
        builder.Property(x => x.LastCommitSha).HasMaxLength(64);

        builder.HasIndex(x => x.RepositoryId);
        builder.HasIndex(x => new { x.RepositoryId, x.Name }).IsUnique();
        builder.HasIndex(x => new { x.RepositoryId, x.IsDefault }).HasFilter("\"IsDefault\" = TRUE").IsUnique();

        builder.HasOne(x => x.Repository)
            .WithMany()
            .HasForeignKey(x => x.RepositoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
