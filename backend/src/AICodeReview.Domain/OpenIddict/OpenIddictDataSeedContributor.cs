using System;
using System.Collections.Generic;
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
        await CreateOrUpdateScopesAsync();
        await CreateOrUpdateSpaClientAsync();
    }

    private async Task CreateOrUpdateScopesAsync()
    {
        await CreateOrUpdateScopeAsync("AICodeReview", "AICodeReview API");

        // системные OIDC-скоупы
        await CreateOrUpdateScopeAsync("openid", "OpenID Connect");
        await CreateOrUpdateScopeAsync("profile", "User profile");
        await CreateOrUpdateScopeAsync("offline_access", "Offline access");
    }

    private async Task CreateOrUpdateScopeAsync(string name, string displayName)
    {
        var existing = await _scopeManager.FindByNameAsync(name);
        if (existing is null)
        {
            var desc = new OpenIddictScopeDescriptor
            {
                Name = name,
                DisplayName = displayName
            };
            await _scopeManager.CreateAsync(desc);
        }
        else
        {
            // В ЭТОЙ ВЕРСИИ OpenIddict при UpdateAsync имя ОБЯЗАТЕЛЬНО
            var desc = new OpenIddictScopeDescriptor
            {
                Name = name,
                DisplayName = displayName
            };
            await _scopeManager.UpdateAsync(existing, desc);
        }
    }

    private static string Scope(string name) =>
        OpenIddictConstants.Permissions.Prefixes.Scope + name;

    private async Task CreateOrUpdateSpaClientAsync()
    {
        const string clientId = "MergeSenseyAdmin_Angular";

        var existing = await _appManager.FindByClientIdAsync(clientId);

        var redirectUris = new[]
        {
            "http://localhost:4200"
        };
        var postLogoutRedirectUris = new[]
        {
            "http://localhost:4200"
        };

        // Разрешения для Authorization Code + PKCE
        var permissions = new HashSet<string>
        {
            // endpoints
            OpenIddictConstants.Permissions.Endpoints.Authorization,
            OpenIddictConstants.Permissions.Endpoints.Token,

            // grant/response
            OpenIddictConstants.Permissions.GrantTypes.AuthorizationCode,
            OpenIddictConstants.Permissions.ResponseTypes.Code,

            // scopes через префикс — кросс-версионно
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
                ClientType = OpenIddictConstants.ClientTypes.Public, // SPA = public
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
                // ВАЖНО: указать и ClientId, и ClientType при UPDATE
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

