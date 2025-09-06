using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using AICodeReview.EntityFrameworkCore.Configurations;
using AICodeReview.EntityFrameworkCore.Design;

namespace AICodeReview.EntityFrameworkCore;

public class AICodeReviewDbContextFactory : IDesignTimeDbContextFactory<AICodeReviewDbContext>
{
    public AICodeReviewDbContext CreateDbContext(string[] args)
    {
        var cs = Environment.GetEnvironmentVariable("ConnectionStrings__Default")
                 ?? "Host=127.0.0.1;Port=5432;Database=AICodeReview;Username=postgres;Password=password;Timezone=UTC";
        var builder = new DbContextOptionsBuilder<AICodeReviewDbContext>();
        EfEncryption.Service ??= new NoopStringEncryptionService();
        builder.UseNpgsql(cs);
        return new AICodeReviewDbContext(builder.Options);
    }
}
