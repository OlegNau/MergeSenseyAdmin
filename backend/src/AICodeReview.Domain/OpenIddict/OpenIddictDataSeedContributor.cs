using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using OpenIddict.Abstractions;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.OpenIddict.Applications;
using Volo.Abp.OpenIddict.Scopes;

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
        // Создаём/обновляем только нужные скоупы приложения.
        await CreateOrUpdateScopeAsync("AICodeReview", "AICodeReview API");
        // openid/profile/offline_access — стандартные, их не создаём как кастомные.
    }

    private async Task CreateOrUpdateScopeAsync(string name, string displayName)
    {
        var existing = await _scopeManager.FindByNameAsync(name);
        if (existing is null)
        {
            var descriptor = new OpenIddictScopeDescriptor
            {
                Name = name,
                DisplayName = displayName
            };
            await _scopeManager.CreateAsync(descriptor);
        }
        else
        {
            var descriptor = new OpenIddictScopeDescriptor
            {
                Name = name,
                DisplayName = displayName
            };
            await _scopeManager.UpdateAsync(existing, descriptor);
        }
    }

    private async Task CreateOrUpdateSpaClientAsync()
    {
        const string clientId = "MergeSenseyAdmin_Angular";

        // Разрешаем ВСЕ необходимые redirect-uri варианты:
        var redirectUris = new[]
        {
            "http://localhost:4200",
            "http://localhost:4200/",
            "http://localhost:4200/index.html"
        };

        var postLogoutRedirectUris = new[]
        {
            "http://localhost:4200",
            "http://localhost:4200/",
            "http://localhost:4200/index.html"
        };

        var permissions = new HashSet<string>
        {
            // endpoints
            OpenIddictConstants.Permissions.Endpoints.Authorization,
            OpenIddictConstants.Permissions.Endpoints.Token,

            // code flow + PKCE
            OpenIddictConstants.Permissions.GrantTypes.AuthorizationCode,
            OpenIddictConstants.Permissions.ResponseTypes.Code,

            // refresh tokens (offline_access)
            OpenIddictConstants.Permissions.GrantTypes.RefreshToken,

            // scopes
            OpenIddictConstants.Permissions.Prefixes.Scope + OpenIddictConstants.Scopes.OpenId,
            OpenIddictConstants.Permissions.Prefixes.Scope + OpenIddictConstants.Scopes.Profile,
            OpenIddictConstants.Permissions.Prefixes.Scope + OpenIddictConstants.Scopes.OfflineAccess,
            OpenIddictConstants.Permissions.Prefixes.Scope + "AICodeReview"
        };

        var existing = await _appManager.FindByClientIdAsync(clientId);
        if (existing is null)
        {
            var descriptor = new OpenIddictApplicationDescriptor
            {
                ClientId = clientId,
                ClientType = OpenIddictConstants.ClientTypes.Public, // SPA
                DisplayName = "MergeSensey Admin SPA",
                // Без экрана согласия
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
