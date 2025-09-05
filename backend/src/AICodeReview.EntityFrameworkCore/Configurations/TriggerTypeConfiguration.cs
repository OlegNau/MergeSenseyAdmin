namespace AICodeReview.EntityFrameworkCore.Configurations;

using System;
using AICodeReview.Triggers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore.Modeling;

public class TriggerTypeConfiguration : IEntityTypeConfiguration<TriggerType>
{
    public void Configure(EntityTypeBuilder<TriggerType> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "TriggerTypes", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.Property(x => x.Name).IsRequired().HasMaxLength(64);
        builder.HasIndex(x => x.Name).IsUnique();

        var seedTime = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        builder.HasData(
            new TriggerType { Id = 1, Name = "manual",   CreationTime = seedTime, ConcurrencyStamp = "manual",   ExtraProperties = new ExtraPropertyDictionary() },
            new TriggerType { Id = 2, Name = "push",     CreationTime = seedTime, ConcurrencyStamp = "push",     ExtraProperties = new ExtraPropertyDictionary() },
            new TriggerType { Id = 3, Name = "schedule", CreationTime = seedTime, ConcurrencyStamp = "schedule", ExtraProperties = new ExtraPropertyDictionary() }
        );
    }
}
