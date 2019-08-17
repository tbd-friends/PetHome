using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;

namespace PetHome.View.Configuration
{
    public static class IdentityServerConfiguration
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        public static IEnumerable<ApiResource> GetApis()
        {
            return new [] {
                new ApiResource("PetHomeApi", "PetHome API")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new [] {
                new Client
                {
                    ClientId = "331E5618-9985-43FC-BB76-90260B21E168",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RequirePkce = true,
                    RequireClientSecret = false,

                    RedirectUris = { "https://localhost:5001/callback", "http://localhost:5000/callback" },
                    PostLogoutRedirectUris = { "https://localhost:5001/signout-callback-oidc", "http://localhost:5000/signout-callback-oidc" },
                    
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "PetHomeApi"
                    },

                    AllowAccessTokensViaBrowser = true,
                }
            };
        }

        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>() {
                new TestUser {
                    SubjectId= "1",
                    Username="test@my.com",
                    Claims = new [] { new Claim("name", "Test User") },
                    Password = "Hello01!"
                }
            };
        }
    }
}
