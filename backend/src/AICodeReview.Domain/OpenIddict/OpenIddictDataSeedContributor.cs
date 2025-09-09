using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
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
        await CreateOrUpdateScopeAsync(
            name: "AICodeReview",
            displayName: "AICodeReview API"
        );

        await CreateOrUpdateScopeAsync("openid", "OpenID Connect");
        await CreateOrUpdateScopeAsync("profile", "User profile");
        await CreateOrUpdateScopeAsync("offline_access", "Offline access");
    }

    private async Task CreateOrUpdateScopeAsync(string name, string displayName)
    {
        var existing = await _scopeManager.FindByNameAsync(name);
        if (existing == null)
        {
            var desc = new OpenIddictScopeDescriptor
            {
                Name = name,
                DisplayName = displayName,
            };
            await _scopeManager.CreateAsync(desc);
        }
        else
        {
            var desc = new OpenIddictScopeDescriptor
            {
                DisplayName = displayName
            };
            await _scopeManager.UpdateAsync(existing, desc);
        }
    }

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

        var permissions = new HashSet<string>
        {
            OpenIddictConstants.Permissions.Endpoints.Authorization,
            OpenIddictConstants.Permissions.Endpoints.Logout,
            OpenIddictConstants.Permissions.Endpoints.Token,

            OpenIddictConstants.Permissions.GrantTypes.AuthorizationCode,
            OpenIddictConstants.Permissions.ResponseTypes.Code,

            OpenIddictConstants.Permissions.Scopes.OpenId,
            OpenIddictConstants.Permissions.Scopes.Profile,
            OpenIddictConstants.Permissions.Scopes.OfflineAccess,
            OpenIddictConstants.Permissions.Prefixes.Scope + "AICodeReview"
        };

        if (existing == null)
        {
            var descriptor = new OpenIddictApplicationDescriptor
            {
                ClientId = clientId,
                DisplayName = "MergeSensey Admin SPA",
                Type = OpenIddictConstants.ClientTypes.Public,
                ConsentType = OpenIddictConstants.ConsentTypes.Systematic,
                Requirements =
                {
                    OpenIddictConstants.Requirements.Features.ProofKeyForCodeExchange
                }
            };

            foreach (var uri in redirectUris)
                descriptor.RedirectUris.Add(new Uri(uri));

            foreach (var uri in postLogoutRedirectUris)
                descriptor.PostLogoutRedirectUris.Add(new Uri(uri));

            foreach (var p in permissions)
                descriptor.Permissions.Add(p);

            await _appManager.CreateAsync(descriptor);
        }
        else
        {
            var descriptor = new OpenIddictApplicationDescriptor
            {
                DisplayName = "MergeSensey Admin SPA",
                Type = OpenIddictConstants.ClientTypes.Public,
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
