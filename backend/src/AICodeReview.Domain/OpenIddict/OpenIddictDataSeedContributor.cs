using System;
using System.Threading.Tasks;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;

namespace AICodeReview.OpenIddict;

public class OpenIddictDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IOpenIddictApplicationManager _applicationManager;
    private readonly IOpenIddictScopeManager _scopeManager;

    public OpenIddictDataSeedContributor(
        IOpenIddictApplicationManager applicationManager,
        IOpenIddictScopeManager scopeManager)
    {
        _applicationManager = applicationManager;
        _scopeManager = scopeManager;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // Создаём только наш API-скоуп
        await CreateOrUpdateScopeAsync("AICodeReview", "AICodeReview API");

        // SPA клиент под PKCE Authorization Code
        await CreateOrUpdateSpaClientAsync();
    }

    private async Task CreateOrUpdateScopeAsync(string name, string displayName)
    {
        var scope = await _scopeManager.FindByNameAsync(name);
        var desc = new OpenIddictScopeDescriptor
        {
            Name = name,
            DisplayName = displayName
        };

        if (scope is null)
            await _scopeManager.CreateAsync(desc);
        else
            await _scopeManager.UpdateAsync(scope, desc);
    }

    private async Task CreateOrUpdateSpaClientAsync()
    {
        const string clientId = "MergeSenseyAdmin_Angular";

        var existing = await _applicationManager.FindByClientIdAsync(clientId);

        var descriptor = new OpenIddictApplicationDescriptor
        {
            ClientId = clientId,
            DisplayName = "MergeSensey Admin SPA",
            ClientType = ClientTypes.Public,          // SPA = Public
            ConsentType = ConsentTypes.Implicit       // без экрана согласия
        };

        // Разрешённые редиректы (dev)
        var redirect = new Uri("http://localhost:4200");
        descriptor.RedirectUris.Add(redirect);
        descriptor.PostLogoutRedirectUris.Add(redirect);

        // Разрешённые endpoints
        descriptor.Permissions.UnionWith(new[]
        {
            Permissions.Endpoints.Authorization,
            Permissions.Endpoints.Token,

            // Code Flow + PKCE
            Permissions.GrantTypes.AuthorizationCode,
            Permissions.ResponseTypes.Code,

            // Scopes (через префикс Scope + имя)
            Permissions.Prefixes.Scope + Scopes.OpenId,
            Permissions.Prefixes.Scope + Scopes.Profile,
            Permissions.Prefixes.Scope + "AICodeReview",
        });

        // Если понадобится refresh token/offline_access, РАСКомментируй:
        // descriptor.Permissions.Add(Permissions.GrantTypes.RefreshToken);
        // descriptor.Permissions.Add(Permissions.Prefixes.Scope + Scopes.OfflineAccess);

        descriptor.Requirements.Add(Requirements.Features.ProofKeyForCodeExchange);

        if (existing is null)
            await _applicationManager.CreateAsync(descriptor);
        else
            await _applicationManager.UpdateAsync(existing, descriptor);
    }
}

