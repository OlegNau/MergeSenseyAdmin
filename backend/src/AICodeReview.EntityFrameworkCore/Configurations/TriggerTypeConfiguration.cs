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

        
    }
}
