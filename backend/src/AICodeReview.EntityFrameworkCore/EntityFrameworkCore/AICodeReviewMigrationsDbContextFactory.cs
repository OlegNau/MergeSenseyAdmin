using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AICodeReview.EntityFrameworkCore;

/// <summary>
/// Design-time фабрика только для MIGRATIONS DbContext.
/// Никаких DbContext'ов здесь не объявляем, только фабрика.
/// </summary>
public sealed class AICodeReviewMigrationsDbContextFactory
    : IDesignTimeDbContextFactory<AICodeReviewMigrationsDbContext>
{
    public AICodeReviewMigrationsDbContext CreateDbContext(string[] args)
    {
        var builder = new DbContextOptionsBuilder<AICodeReviewMigrationsDbContext>();

        // Берём строку подключения из переменной окружения, иначе дефолт на локальный Postgres
        var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__Default")
                               ?? "Host=127.0.0.1;Port=5432;Database=aicodereview;Username=postgres;Password=password";

        builder.UseNpgsql(connectionString);

        return new AICodeReviewMigrationsDbContext(builder.Options);
    }
}