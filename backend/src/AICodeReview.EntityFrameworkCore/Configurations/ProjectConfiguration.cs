namespace AICodeReview.EntityFrameworkCore.Configurations;

using AICodeReview.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.EntityFrameworkCore.Modeling;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "Projects", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.Property(x => x.Name).IsRequired().HasMaxLength(256);
        builder.Property(x => x.Description).HasMaxLength(2048);
        builder.Property(x => x.Provider).IsRequired().HasMaxLength(32);
        builder.Property(x => x.RepoPath).IsRequired().HasMaxLength(512);
        builder.Property(x => x.DefaultBranch).IsRequired().HasMaxLength(128);

        builder.Property(x => x.GitAccessToken)
            .HasMaxLength(512)
            .HasConversion(EfEncryption.Encrypt, EfEncryption.Decrypt);

        builder.Property(x => x.IsActive).HasDefaultValue(true);

        builder.HasIndex(x => new { x.TenantId, x.Name }).IsUnique();
    }
}
