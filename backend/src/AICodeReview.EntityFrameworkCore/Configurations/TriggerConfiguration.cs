namespace AICodeReview.EntityFrameworkCore.Configurations;

using AICodeReview.Triggers;
using AICodeReview.Repositories;
using AICodeReview.Branches;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp.EntityFrameworkCore.Modeling;

public class TriggerConfiguration : IEntityTypeConfiguration<Trigger>
{
    public void Configure(EntityTypeBuilder<Trigger> builder)
    {
        builder.ToTable(AICodeReviewConsts.DbTablePrefix + "Triggers", AICodeReviewConsts.DbSchema);
        builder.ConfigureByConvention();

        builder.Property(x => x.ScheduleJson).HasColumnType("TEXT");

        builder.HasIndex(x => x.RepositoryId);
        builder.HasIndex(x => x.BranchId);
        builder.HasIndex(x => x.TypeId);

        builder.HasOne<Repository>().WithMany().HasForeignKey(x => x.RepositoryId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne<Branch>().WithMany().HasForeignKey(x => x.BranchId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne<TriggerType>().WithMany().HasForeignKey(x => x.TypeId).OnDelete(DeleteBehavior.Cascade);
    }
}
