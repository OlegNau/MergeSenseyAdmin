namespace AICodeReview.EntityFrameworkCore.Configurations;

using AICodeReview.Nodes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.EntityFrameworkCore.Modeling;

public class NodeConfiguration : IEntityTypeConfiguration<Node>
{
    public void Configure(EntityTypeBuilder<Node> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "Nodes", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.HasIndex(x => x.TypeId);

        builder.HasOne(x => x.Type)
            .WithMany()
            .HasForeignKey(x => x.TypeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
