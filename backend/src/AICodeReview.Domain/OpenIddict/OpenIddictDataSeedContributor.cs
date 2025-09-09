using System;
using System.Threading.Tasks;
using OpenIddict.Abstractions;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using static OpenIddict.Abstractions.OpenIddictConstants;

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
        await CreateOrUpdateSpaClientAsync();
        await CreateOrUpdateApiScopeAsync();
    }

    private async Task CreateOrUpdateSpaClientAsync()
    {
        const string clientId = "MergeSenseiAdmin_Angular"; // совпадает с фронтом
        var existing = await _applicationManager.FindByClientIdAsync(clientId);

        var redirectUri = new Uri("http://localhost:4200");
        var postLogoutUri = new Uri("http://localhost:4200");

        if (existing is null)
        {
            var d = new OpenIddictApplicationDescriptor
            {
                ClientId = clientId,
                DisplayName = "MergeSensei Admin Angular",
                ClientType = ClientTypes.Public,
                ConsentType = ConsentTypes.Explicit,
            };

            d.RedirectUris.Add(redirectUri);
            d.PostLogoutRedirectUris.Add(postLogoutUri);

            d.Permissions.Add(Permissions.Endpoints.Authorization);
            d.Permissions.Add(Permissions.Endpoints.Token);

            d.Permissions.Add(Permissions.GrantTypes.AuthorizationCode);
            d.Permissions.Add(Permissions.GrantTypes.RefreshToken);
            d.Permissions.Add(Permissions.ResponseTypes.Code);
            d.Requirements.Add(Requirements.Features.ProofKeyForCodeExchange);

            // стандартные скоупы
            d.Permissions.Add(Permissions.Scopes.Profile);
            d.Permissions.Add(Permissions.Scopes.Email);
            d.Permissions.Add(Permissions.Scopes.Roles);

            // явно — то, что запрашивает фронт
            d.Permissions.Add(Permissions.Prefixes.Scope + "openid");
            d.Permissions.Add(Permissions.Prefixes.Scope + "offline_access");
            d.Permissions.Add(Permissions.Prefixes.Scope + "MergeSensei");

            await _applicationManager.CreateAsync(d);
        }
        else
        {
            var d = new OpenIddictApplicationDescriptor();
            await _applicationManager.PopulateAsync(existing, d);

            d.ClientId = clientId; // важно при Update
            d.DisplayName = "MergeSensei Admin Angular";
            d.ClientType = ClientTypes.Public;
            d.ConsentType = ConsentTypes.Explicit;

            d.RedirectUris.Clear();
            d.PostLogoutRedirectUris.Clear();
            d.RedirectUris.Add(redirectUri);
            d.PostLogoutRedirectUris.Add(postLogoutUri);

            d.Permissions.Clear();
            d.Permissions.Add(Permissions.Endpoints.Authorization);
            d.Permissions.Add(Permissions.Endpoints.Token);

            d.Permissions.Add(Permissions.GrantTypes.AuthorizationCode);
            d.Permissions.Add(Permissions.GrantTypes.RefreshToken);
            d.Permissions.Add(Permissions.ResponseTypes.Code);

            d.Permissions.Add(Permissions.Scopes.Profile);
            d.Permissions.Add(Permissions.Scopes.Email);
            d.Permissions.Add(Permissions.Scopes.Roles);

            d.Permissions.Add(Permissions.Prefixes.Scope + "openid");
            d.Permissions.Add(Permissions.Prefixes.Scope + "offline_access");
            d.Permissions.Add(Permissions.Prefixes.Scope + "MergeSensei");

            d.Requirements.Clear();
            d.Requirements.Add(Requirements.Features.ProofKeyForCodeExchange);

            await _applicationManager.UpdateAsync(existing, d);
        }
    }

    private async Task CreateOrUpdateApiScopeAsync()
    {
        const string apiScope = "MergeSensei";
        var scope = await _scopeManager.FindByNameAsync(apiScope);

        if (scope is null)
        {
            var sd = new OpenIddictScopeDescriptor
            {
                Name = apiScope,
                DisplayName = "MergeSensei API",
            };
            sd.Resources.Add(apiScope);
            await _scopeManager.CreateAsync(sd);
        }
        else
        {
            var sd = new OpenIddictScopeDescriptor();
            await _scopeManager.PopulateAsync(scope, sd);

            sd.Name = apiScope; // обязательно при Update
            sd.DisplayName = "MergeSensei API";
        const string clientId = "MergeSenseiAdmin_Angular"; // совпадает с фронтом
                ClientType = ClientTypes.Public,
            // стандартные скоупы
            // явно — то, что запрашивает фронт
            d.Permissions.Add(Permissions.Prefixes.Scope + "openid");
            d.Permissions.Add(Permissions.Prefixes.Scope + "offline_access");
            d.Permissions.Add(Permissions.Prefixes.Scope + "MergeSensei");
            d.ClientId = clientId; // важно при Update
            d.Permissions.Add(Permissions.Prefixes.Scope + "openid");

            sd.Name = apiScope; // обязательно при Update
            sd.Resources.Clear();
            sd.Resources.Add(apiScope);

            await _scopeManager.UpdateAsync(scope, sd);
        }
    }
}
