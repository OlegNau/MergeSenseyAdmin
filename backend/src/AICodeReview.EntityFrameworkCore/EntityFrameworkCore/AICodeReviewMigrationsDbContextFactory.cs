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

        // Берём ту же строку, что использует DbMigrator
        var cs = configuration.GetConnectionString("Default")
                 ?? "localhost;Port=5432;Database=aicodereview;Username=postgres;Password=password;Timezone=UTC";

        var builder = new DbContextOptionsBuilder<AICodeReviewMigrationsDbContext>()
            .UseNpgsql(cs, o =>
            {
                // опционально: история миграций в public
                o.MigrationsHistoryTable("__EFMigrationsHistory", "public");
            });

        return new AICodeReviewMigrationsDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        // Базовый путь — на проект DbMigrator (чтобы считывать его appsettings)
        var basePath = Path.Combine(Directory.GetCurrentDirectory(), "../AICodeReview.DbMigrator");

        return new ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile("appsettings.json", optional: false)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .AddEnvironmentVariables()
            .Build();
    }
}