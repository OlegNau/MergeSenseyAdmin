namespace AICodeReview.EntityFrameworkCore.Configurations;

using AICodeReview.Nodes;
using AICodeReview.Pipelines;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.EntityFrameworkCore.Modeling;

public class PipelineNodeConfiguration : IEntityTypeConfiguration<PipelineNode>
{
    public void Configure(EntityTypeBuilder<PipelineNode> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "PipelineNodes", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.HasIndex(x => x.PipelineId);
        builder.HasIndex(x => x.NodeId);
        builder.HasIndex(x => new { x.PipelineId, x.Order }).IsUnique();

        builder.HasOne(x => x.Pipeline)
            .WithMany()
            .HasForeignKey(x => x.PipelineId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Node)
            .WithMany()
            .HasForeignKey(x => x.NodeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
