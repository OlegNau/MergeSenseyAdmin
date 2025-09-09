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
        await CreateOrUpdateScopeAsync("AICodeReview", "AICodeReview API");
        await CreateOrUpdateSpaClientAsync();
    }

    private async Task CreateOrUpdateSpaClientAsync()
    {
        const string clientId = "MergeSenseyAdmin_Angular";

        var app = await _applications.FindByClientIdAsync(clientId);

        var descriptor = new OpenIddictApplicationDescriptor
        {
            ClientId = clientId,
            DisplayName = "MergeSensey Admin SPA",
            ClientType = ClientTypes.Public,          // SPA = Public
            ConsentType = ConsentTypes.Implicit       // без экрана согласия
        };

        descriptor.RedirectUris.Add(new Uri("http://localhost:4200"));
        descriptor.PostLogoutRedirectUris.Add(new Uri("http://localhost:4200"));

        descriptor.Permissions.UnionWith(new[]
        {
            // endpoints
            Permissions.Endpoints.Authorization,
            Permissions.Endpoints.Token,

            // code + refresh
            Permissions.GrantTypes.AuthorizationCode,
            Permissions.GrantTypes.RefreshToken,

            // response type
            Permissions.ResponseTypes.Code,

            // scopes (ВАЖНО: через Prefixes.Scope + Scopes.*)
            Permissions.Prefixes.Scope + Scopes.OpenId,
            Permissions.Prefixes.Scope + Scopes.Profile,
            Permissions.Prefixes.Scope + Scopes.OfflineAccess,
            Permissions.Prefixes.Scope + "AICodeReview"
        });

        descriptor.Requirements.Add(Requirements.Features.ProofKeyForCodeExchange); // PKCE

        if (app is null)
            await _applications.CreateAsync(descriptor);
        else
            await _applications.UpdateAsync(app, descriptor);
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
