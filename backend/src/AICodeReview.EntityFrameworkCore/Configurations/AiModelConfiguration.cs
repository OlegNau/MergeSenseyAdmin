namespace AICodeReview.EntityFrameworkCore.Configurations;

using AICodeReview.AiModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.EntityFrameworkCore.Modeling;

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

        builder.Property(x => x.ApiKey)
            .HasMaxLength(512)
            .HasConversion(EfEncryption.Encrypt, EfEncryption.Decrypt);

        builder.Property(x => x.IsActive).HasDefaultValue(true);
    }
}
