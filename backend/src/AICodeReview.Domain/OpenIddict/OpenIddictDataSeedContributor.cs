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
            // 1-в-1 с Angular environment.oAuthConfig.redirectUri/postLogoutRedirectUri
            "http://localhost:4200"
        };
        var postLogoutRedirectUris = new[]
        {
            "http://localhost:4200"
        };

        var permissions = new HashSet<string>
        {
            // endpoints
            OpenIddictConstants.Permissions.Endpoints.Authorization,
            OpenIddictConstants.Permissions.Endpoints.Token,

            // code + PKCE
            OpenIddictConstants.Permissions.GrantTypes.AuthorizationCode,
            OpenIddictConstants.Permissions.ResponseTypes.Code,

            // обязательный грант под offline_access
            OpenIddictConstants.Permissions.GrantTypes.RefreshToken,

            // разрешённые скоупы
            OpenIddictConstants.Permissions.Prefixes.Scope + "openid",
            OpenIddictConstants.Permissions.Prefixes.Scope + "profile",
            OpenIddictConstants.Permissions.Prefixes.Scope + "offline_access",
            OpenIddictConstants.Permissions.Prefixes.Scope + "AICodeReview"
        };

        if (existing is null)
        {
            var descriptor = new OpenIddictApplicationDescriptor
            {
                ClientId = clientId,
                ClientType = OpenIddictConstants.ClientTypes.Public, // SPA
                DisplayName = "MergeSensey Admin SPA",

                // КЛЮЧЕВОЕ: не спрашивать согласие (никакой страницы «предоставить доступ»)
                ConsentType = OpenIddictConstants.ConsentTypes.Implicit
            };

            foreach (var uri in redirectUris)
                descriptor.RedirectUris.Add(new Uri(uri));

            foreach (var uri in postLogoutRedirectUris)
                descriptor.PostLogoutRedirectUris.Add(new Uri(uri));

            foreach (var p in permissions)
                descriptor.Permissions.Add(p);

            descriptor.Requirements.Add(OpenIddictConstants.Requirements.Features.ProofKeyForCodeExchange);

            await _appManager.CreateAsync(descriptor);
        }
        else
        {
            var descriptor = new OpenIddictApplicationDescriptor
            {
                ClientId = clientId,
                ClientType = OpenIddictConstants.ClientTypes.Public,
                DisplayName = "MergeSensey Admin SPA",

                // КЛЮЧЕВОЕ: отключаем экран согласия
                ConsentType = OpenIddictConstants.ConsentTypes.Implicit
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
