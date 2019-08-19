using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;

namespace PetHome.View.IdentityServer.Configuration
{
    public static class IdentityServerConfiguration
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            var roleResource = new IdentityResource("role", "Role", claimTypes: new[] { "role" });

            return new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                roleResource
            };
        }

        public static IEnumerable<ApiResource> GetApis()
        {
            return new[] {
                new ApiResource("PetHomeApi", "PetHome API")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new[] {
                new Client
                {
                    ClientId = "331E5618-9985-43FC-BB76-90260B21E168",
                    ClientName = "PetHome Client",

                    AllowedGrantTypes = GrantTypes.Implicit,
                    RequirePkce = true,
                    RequireClientSecret = false,

                    RedirectUris = { "https://localhost:5001/callback", "http://localhost:5000/callback" },
                    PostLogoutRedirectUris = { "https://localhost:5001/signout-callback-oidc", "http://localhost:5000/signout-callback-oidc" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "PetHomeApi",
                        "role"
                    },

                    AllowAccessTokensViaBrowser = true,
                }
            };
        }
    }
}
