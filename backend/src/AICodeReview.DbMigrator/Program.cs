using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Volo.Abp;
using Volo.Abp.Autofac;

namespace AICodeReview.DbMigrator;

public class Program
{
    public static async Task Main(string[] args)
    {
        
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        var baseDir = AppContext.BaseDirectory; // bin/Debug/net9.0/...
        var projectDir = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..")); 

        var host = Host.CreateDefaultBuilder(args)
            .UseContentRoot(baseDir)
            .ConfigureAppConfiguration((ctx, cfg) =>
            {
                cfg.Sources.Clear();

                
                cfg.SetBasePath(baseDir);
                cfg.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                cfg.AddJsonFile($"appsettings.{ctx.HostingEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: true);
                cfg.AddJsonFile("appsettings.secrets.json", optional: true, reloadOnChange: true);

                
                cfg.AddJsonFile(new PhysicalFileProvider(projectDir), "appsettings.json", optional: true, reloadOnChange: true);
                cfg.AddJsonFile(new PhysicalFileProvider(projectDir), $"appsettings.{ctx.HostingEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: true);
                cfg.AddJsonFile(new PhysicalFileProvider(projectDir), "appsettings.secrets.json", optional: true, reloadOnChange: true);

                
                cfg.AddEnvironmentVariables();
            })
            .ConfigureLogging(l => l.AddSimpleConsole())
            .Build();

        var configuration = host.Services.GetRequiredService<IConfiguration>();

        
        Console.WriteLine("ConnectionStrings:Default = " + (configuration.GetConnectionString("Default") ?? "<null>"));

        using var app = await AbpApplicationFactory.CreateAsync<AICodeReviewDbMigratorModule>(options =>
        {
            options.UseAutofac();
            options.Services.ReplaceConfiguration(configuration);
            options.Services.AddLogging(c => c.AddSimpleConsole());
        });

        await app.InitializeAsync();

        var migrator = app.ServiceProvider.GetRequiredService<AICodeReview.Data.AICodeReviewDbMigrationService>();
        await migrator.MigrateAsync();

        await app.ShutdownAsync();
    }
}
