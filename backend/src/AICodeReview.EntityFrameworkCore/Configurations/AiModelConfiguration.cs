namespace AICodeReview.EntityFrameworkCore.Configurations;

using System;
using AICodeReview.AiModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.Security.Encryption;

public class AiModelConfiguration : IEntityTypeConfiguration<AiModel>
{
    public void Configure(EntityTypeBuilder<AiModel> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "AiModels", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.Property(x => x.Name).IsRequired().HasMaxLength(128);
        builder.Property(x => x.Provider).IsRequired().HasMaxLength(64);
        builder.Property(x => x.Model).IsRequired().HasMaxLength(128);
        builder.Property(x => x.ApiBaseUrl).HasMaxLength(256);

        var sp = builder.GetInfrastructure<IServiceProvider>();
        var encryption = sp.GetService<IStringEncryptionService>() ?? new NoopStringEncryptionService();
        builder.Property(x => x.ApiKey)
            .HasMaxLength(512)
            .HasConversion(
                v => v == null ? null : encryption.Encrypt(v),
                v => v == null ? null : encryption.Decrypt(v));

        builder.Property(x => x.IsActive).HasDefaultValue(true);
    }
}
