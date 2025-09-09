using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OpenIddict.Abstractions;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;

namespace AICodeReview.OpenIddict;

public class OpenIddictDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IOpenIddictApplicationManager _appManager;
    private readonly IOpenIddictScopeManager _scopeManager;

    public OpenIddictDataSeedContributor(
        IOpenIddictApplicationManager appManager,
        IOpenIddictScopeManager scopeManager)
    {
        _appManager = appManager;
        _scopeManager = scopeManager;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // 1) Только ваш API-скоуп – системные openid/profile/offline_access не сидируем
        await CreateOrUpdateApiScopeAsync();

        // 2) Клиент SPA (Angular) – авторизационный код + PKCE + refresh_token + offline_access
        await CreateOrUpdateSpaClientAsync();
    }

    private static string Scope(string name) =>
        OpenIddictConstants.Permissions.Prefixes.Scope + name;

    private async Task CreateOrUpdateApiScopeAsync()
    {
        const string apiScopeName = "AICodeReview";
        var existing = await _scopeManager.FindByNameAsync(apiScopeName);

        var descriptor = new OpenIddictScopeDescriptor
        {
            Name = apiScopeName,
            DisplayName = "AICodeReview API"
        };

        if (existing is null)
        {
            await _scopeManager.CreateAsync(descriptor);
        }
        else
        {
            await _scopeManager.UpdateAsync(existing, descriptor);
        }
    }

    private async Task CreateOrUpdateSpaClientAsync()
    {
        const string clientId = "MergeSenseyAdmin_Angular";

        var existing = await _appManager.FindByClientIdAsync(clientId);

        var redirectUris = new[]
        {
            // ДОЛЖНЫ 1в1 совпадать с Angular environment.oAuthConfig.redirectUri/postLogoutRedirectUri
            "http://localhost:4200"
        };
        var postLogoutRedirectUris = new[]
        {
            "http://localhost:4200"
        };

        // Набор разрешений для SPA: code+PKCE, token endpoint, refresh_token и нужные скоупы
        var permissions = new HashSet<string>
        {
            // endpoints
            OpenIddictConstants.Permissions.Endpoints.Authorization,
            OpenIddictConstants.Permissions.Endpoints.Token,

            // гранты/респонсы
            OpenIddictConstants.Permissions.GrantTypes.AuthorizationCode,
            OpenIddictConstants.Permissions.ResponseTypes.Code,

            // обязательный грант для offline_access
            OpenIddictConstants.Permissions.GrantTypes.RefreshToken,

            // разрешённые скоупы
            Scope("openid"),
            Scope("profile"),
            Scope("offline_access"),
            Scope("AICodeReview")
        };

        if (existing is null)
        {
            var descriptor = new OpenIddictApplicationDescriptor
            {
                ClientId = clientId,
                ClientType = OpenIddictConstants.ClientTypes.Public,   // SPA = public
                DisplayName = "MergeSensey Admin SPA",
                ConsentType = OpenIddictConstants.ConsentTypes.Systematic
            };

            foreach (var uri in redirectUris)
                descriptor.RedirectUris.Add(new Uri(uri));

            foreach (var uri in postLogoutRedirectUris)
                descriptor.PostLogoutRedirectUris.Add(new Uri(uri));

            foreach (var p in permissions)
                descriptor.Permissions.Add(p);

            // PKCE обязательно для публичного клиента
            descriptor.Requirements.Add(OpenIddictConstants.Requirements.Features.ProofKeyForCodeExchange);

            await _appManager.CreateAsync(descriptor);
        }
        else
        {
            var descriptor = new OpenIddictApplicationDescriptor
            {
                // ВАЖНО: при update тоже задаём ClientId/ClientType
                ClientId = clientId,
                ClientType = OpenIddictConstants.ClientTypes.Public,
                DisplayName = "MergeSensey Admin SPA",
                ConsentType = OpenIddictConstants.ConsentTypes.Systematic
            };

            foreach (var uri in redirectUris)
                descriptor.RedirectUris.Add(new Uri(uri));

            foreach (var uri in postLogoutRedirectUris)
                descriptor.PostLogoutRedirectUris.Add(new Uri(uri));

            foreach (var p in permissions)
                descriptor.Permissions.Add(p);

            descriptor.Requirements.Add(OpenIddictConstants.Requirements.Features.ProofKeyForCodeExchange);

            await _appManager.UpdateAsync(existing, descriptor);
        }
    }
}
