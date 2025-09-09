using System;
using System.Threading.Tasks;
using OpenIddict.Abstractions;
using static OpenIddict.Abstractions.OpenIddictConstants;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;

namespace AICodeReview.OpenIddict;

public class OpenIddictDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly IOpenIddictApplicationManager _applications;
    private readonly IOpenIddictScopeManager _scopes;

    public OpenIddictDataSeedContributor(
        IOpenIddictApplicationManager applications,
        IOpenIddictScopeManager scopes)
    {
        _applications = applications;
        _scopes = scopes;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        // кастомный API-скоуп
        await CreateOrUpdateScopeAsync("AICodeReview", "AICodeReview API");

        // SPA-клиент
        await CreateOrUpdateSpaClientAsync();
    }

    private async Task CreateOrUpdateSpaClientAsync()
    {
        const string clientId = "MergeSenseyAdmin_Angular";
        var existing = await _applications.FindByClientIdAsync(clientId);

        var descriptor = new OpenIddictApplicationDescriptor
        {
            ClientId = clientId,
            DisplayName = "MergeSensey Admin SPA",
            ClientType = ClientTypes.Public,         // SPA = Public
            ConsentType = ConsentTypes.Implicit,     // без экрана согласия
        };

        // redirect / post-logout
        descriptor.RedirectUris.Add(new Uri("http://localhost:4200"));
        descriptor.PostLogoutRedirectUris.Add(new Uri("http://localhost:4200"));

        // разрешения
        descriptor.Permissions.UnionWith(new[]
        {
            // endpoints
            Permissions.Endpoints.Authorization,
            Permissions.Endpoints.Token,

            // code flow + PKCE
            Permissions.GrantTypes.AuthorizationCode,
            Permissions.GrantTypes.RefreshToken,
            Permissions.ResponseTypes.Code,

            // стандартные скоупы
            Permissions.Scopes.OpenId,
            Permissions.Scopes.Profile,
            Permissions.Scopes.OfflineAccess,

            // кастомный скоуп API
            Permissions.Prefixes.Scope + "AICodeReview",
        });

        descriptor.Requirements.Add(Requirements.Features.ProofKeyForCodeExchange);

        if (existing is null)
            await _applications.CreateAsync(descriptor);
        else
            await _applications.UpdateAsync(existing, descriptor);
    }

    private async Task CreateOrUpdateScopeAsync(string name, string displayName)
    {
        var scope = await _scopes.FindByNameAsync(name);
        var desc = new OpenIddictScopeDescriptor
        {
            Name = name,
            DisplayName = displayName
        };

        if (scope is null)
            await _scopes.CreateAsync(desc);
        else
            await _scopes.UpdateAsync(scope, desc);
    }
}
