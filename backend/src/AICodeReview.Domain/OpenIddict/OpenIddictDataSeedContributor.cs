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
        await CreateOrUpdateScopeAsync("AICodeReview", "AICodeReview API");
        await CreateOrUpdateSpaClientAsync();
    }

    private async Task CreateOrUpdateSpaClientAsync()
    {
        var clientId = "MergeSenseyAdmin_Angular";
        var existing = await _applicationManager.FindByClientIdAsync(clientId);

        var redirectUri = new Uri("http://localhost:4200");
        var postLogout = new Uri("http://localhost:4200");

        var descriptor = new OpenIddictApplicationDescriptor
        {
            ClientId = clientId,
            DisplayName = "MergeSensey Admin SPA",
            ClientType = ClientTypes.Public,              // ВАЖНО: SPA = Public
            ConsentType = ConsentTypes.Implicit,          // без экрана согласия
        };

        descriptor.RedirectUris.Add(redirectUri);
        descriptor.PostLogoutRedirectUris.Add(postLogout);

        descriptor.Permissions.UnionWith(new[]
        {
            Permissions.Endpoints.Authorization,
            Permissions.Endpoints.Token,

            Permissions.GrantTypes.AuthorizationCode,
            Permissions.ResponseTypes.Code,

            Permissions.Scopes.OpenId,
            Permissions.Scopes.Profile,
            // свои скоупы
            Permissions.Prefixes.Scope + "AICodeReview",
        });

        descriptor.Requirements.Add(Requirements.Features.ProofKeyForCodeExchange);

        if (existing == null)
        {
            await _applicationManager.CreateAsync(descriptor);
        }
        else
        {
            await _applicationManager.UpdateAsync(existing, descriptor);
        }
    }

    private async Task CreateOrUpdateScopeAsync(string name, string displayName)
    {
        var scope = await _scopeManager.FindByNameAsync(name);
        var desc = new OpenIddictScopeDescriptor
        {
            Name = name,
            DisplayName = displayName,
        };

        if (scope == null)
            await _scopeManager.CreateAsync(desc);
        else
            await _scopeManager.UpdateAsync(scope, desc);
    }
}
