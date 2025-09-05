namespace AICodeReview.EntityFrameworkCore.Configurations;

using System;
using AICodeReview.Nodes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore.Modeling;

public class NodeTypeConfiguration : IEntityTypeConfiguration<NodeType>
{
    public void Configure(EntityTypeBuilder<NodeType> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "NodeTypes", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.Property(x => x.Name).IsRequired().HasMaxLength(64);
        builder.HasIndex(x => x.Name).IsUnique();

        var seedTime = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        builder.HasData(
            new NodeType { Id = 1, Name = "lint",    CreationTime = seedTime, ConcurrencyStamp = "lint",    ExtraProperties = new ExtraPropertyDictionary() },
            new NodeType { Id = 2, Name = "test",    CreationTime = seedTime, ConcurrencyStamp = "test",    ExtraProperties = new ExtraPropertyDictionary() },
            new NodeType { Id = 3, Name = "build",   CreationTime = seedTime, ConcurrencyStamp = "build",   ExtraProperties = new ExtraPropertyDictionary() },
            new NodeType { Id = 4, Name = "deploy",  CreationTime = seedTime, ConcurrencyStamp = "deploy",  ExtraProperties = new ExtraPropertyDictionary() },
            new NodeType { Id = 5, Name = "custom",  CreationTime = seedTime, ConcurrencyStamp = "custom",  ExtraProperties = new ExtraPropertyDictionary() }
        );
    }
}
