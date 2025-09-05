using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace AICodeReview.EntityFrameworkCore;

public class AICodeReviewMigrationsDbContextFactory
    : IDesignTimeDbContextFactory<AICodeReviewMigrationsDbContext>
{
    public AICodeReviewMigrationsDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<AICodeReviewMigrationsDbContext>()
            .UseNpgsql(configuration.GetConnectionString("Default"));

        return new AICodeReviewMigrationsDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        // читаем connection string из Host
        var basePath = Path.Combine(Directory.GetCurrentDirectory(), "../AICodeReview.HttpApi.Host");
        return new ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile("appsettings.json", optional: true)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .Build();
    }
}