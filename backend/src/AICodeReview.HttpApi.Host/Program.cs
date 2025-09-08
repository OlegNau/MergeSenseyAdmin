using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;

namespace AICodeReview;

public class Program
{
    public static async Task<int> Main(string[] args)
    {
        // Для Npgsql 8+ на случай сторонних Local DateTime
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        Log.Logger = new LoggerConfiguration()
#if DEBUG
            .MinimumLevel.Debug()
#else
            .MinimumLevel.Information()
#endif
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .WriteTo.Async(c => c.File("Logs/logs.txt"))
            .WriteTo.Async(c => c.Console())
            .CreateLogger();

        try
        {
            Log.Information("Starting AICodeReview.HttpApi.Host.");

            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    var origins = configuration["App:CorsOrigins"]
                        ?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                        ?? Array.Empty<string>();

                    policy.WithOrigins(origins)
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            builder.Host
                .AddAppSettingsSecretsJson() // подхватит appsettings.secrets.json при наличии
                .UseAutofac()
                .UseSerilog();

            await builder.AddApplicationAsync<AICodeReviewHttpApiHostModule>();
            var app = builder.Build();

            app.UseCors(); // place before auth

            await app.InitializeApplicationAsync();
            await app.RunAsync();
            return 0;
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "Host terminated unexpectedly!");
            return 1;
        }
        finally
        {
            Log.CloseAndFlush();
        }
    }
}