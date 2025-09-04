namespace AICodeReview.EntityFrameworkCore.Configurations;

using System;
using AICodeReview.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.Security.Encryption;

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

        var sp = builder.GetInfrastructure<IServiceProvider>();
        var encryption = sp.GetRequiredService<IStringEncryptionService>();
        builder.Property(x => x.GitAccessToken)
            .HasMaxLength(512)
            .HasConversion(
                v => v == null ? null : encryption.Encrypt(v),
                v => v == null ? null : encryption.Decrypt(v));

        builder.Property(x => x.IsActive).HasDefaultValue(true);
    }
}
