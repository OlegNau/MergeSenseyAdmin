using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenIddict.Abstractions;
using Serilog;
using Serilog.Events;

namespace AICodeReview;

public class Program
{
    public static async Task<int> Main(string[] args)
    {
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
                .AddAppSettingsSecretsJson()
                .UseAutofac()
                .UseSerilog();

            await builder.AddApplicationAsync<AICodeReviewHttpApiHostModule>();
            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapGet("/dev/openiddict/client/{clientId}", async (string clientId, IServiceProvider sp) =>
                {
                    var manager = sp.GetRequiredService<IOpenIddictApplicationManager>();
                    var appEntity = await manager.FindByClientIdAsync(clientId);
                    if (appEntity is null) return Results.NotFound(new { clientId });

                    var type = appEntity.GetType();
                    var redirectUris = (IEnumerable<Uri>)(type.GetProperty("RedirectUris")?.GetValue(appEntity) as IEnumerable<Uri> ?? Enumerable.Empty<Uri>());
                    var postLogoutUris = (IEnumerable<Uri>)(type.GetProperty("PostLogoutRedirectUris")?.GetValue(appEntity) as IEnumerable<Uri> ?? Enumerable.Empty<Uri>());

                    return Results.Ok(new
                    {
                        clientId,
                        redirectUris = redirectUris.Select(u => u.ToString()).ToArray(),
                        postLogoutRedirectUris = postLogoutUris.Select(u => u.ToString()).ToArray()
                    });
                });
            }

            app.UseCors();

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