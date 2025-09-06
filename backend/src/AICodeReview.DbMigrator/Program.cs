using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Volo.Abp;
using Volo.Abp.Autofac;

namespace AICodeReview.DbMigrator;

public class Program
{
    public static async Task Main(string[] args)
    {
        var host = Host.CreateDefaultBuilder(args)
            .ConfigureLogging(l => l.AddSimpleConsole())
            .Build();

        var configuration = host.Services.GetRequiredService<IConfiguration>();

        using var app = await AbpApplicationFactory.CreateAsync<AICodeReviewDbMigratorModule>(options =>
        {
            options.UseAutofac();
            options.Services.ReplaceConfiguration(configuration); // важно
            options.Services.AddLogging(c => c.AddSimpleConsole());
        });

        await app.InitializeAsync();

        var migrator = app.ServiceProvider.GetRequiredService<AICodeReview.Data.AICodeReviewDbMigrationService>();
        await migrator.MigrateAsync();

        await app.ShutdownAsync();
    }
}