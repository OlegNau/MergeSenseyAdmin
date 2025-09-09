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

        
    }
}
