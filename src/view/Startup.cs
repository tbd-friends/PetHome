using System.Reflection;
using System.Text;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PetHome.Persistence;
using PetHome.Persistence.Repositories;
using PetHome.Persistence.Repositories.Interfaces;
using PetHome.View.Data;
using PetHome.View.Data.Models;
using PetHome.View.IdentityServer.Configuration;

namespace PetHome.View {
    public class Startup {
        public Startup (IConfiguration configuration, IHostingEnvironment environment) {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddDbContext<IdentityContext> (options =>
                options.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection")));

            services.AddDbContext<ApplicationContext> (options =>
                options.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection")));

            // services.AddIdentity<AppUser, IdentityRole>()
            //     .AddEntityFrameworkStores<IdentityContext>()
            //     .AddDefaultTokenProviders();
            //     options.UseSqlServer(
            //         Configuration.GetConnectionString("DefaultConnection")));

            //services.AddDefaultIdentity<ApplicationUser>()
            //    .AddEntityFrameworkStores<IdentityContext>();

            var builder = services.AddIdentityServer ()
                .AddInMemoryIdentityResources (IdentityServerConfiguration.GetIdentityResources ())
                .AddInMemoryApiResources (IdentityServerConfiguration.GetApis ())
                .AddInMemoryClients (IdentityServerConfiguration.GetClients ())
                .AddTestUsers (IdentityServerConfiguration.GetUsers ());

            if (Environment.IsDevelopment ()) {
                builder.AddDeveloperSigningCredential ();
            } else {
                throw new System.Exception ("need to configure key material");
            }

            services.AddAuthentication (option => {
                    option.DefaultScheme = "Cookies";
                    option.DefaultChallengeScheme = "oidc";
                })
                .AddCookie ("Cookies")
                .AddOpenIdConnect ("oidc", options => {
                    options.SignInScheme = "Cookies";

                    options.Authority = "https://localhost:5000";
                    options.RequireHttpsMetadata = false;

                    options.TokenValidationParameters.NameClaimType = "name";

                    options.ClientId = "331E5618-9985-43FC-BB76-90260B21E168";
                    options.SaveTokens = true;
                });

            services.AddTransient<IUnitOfWork, UnitOfWork> ();

            services.AddMediatR (Assembly.Load ("PetHome.Handlers"));

            services.AddMvc ().SetCompatibilityVersion (CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles (configuration => {
                configuration.RootPath = "ClientApp/build";
            });

            // Add views from Identity
            services.Configure<RazorViewEngineOptions> (options => {
                // {2} is area, {1} is controller, {0} is the action
                options.ViewLocationFormats.Add ("/IdentityServer/Views/{1}/{0}" + RazorViewEngine.ViewExtension);
                options.ViewLocationFormats.Add ("/IdentityServer/Views/Shared/{0}" + RazorViewEngine.ViewExtension);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app) {
            if (Environment.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
                app.UseDatabaseErrorPage ();
            } else {
                app.UseExceptionHandler ("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts ();
            }

            app.UseHttpsRedirection ();

            app.UseStaticFiles ();
            app.UseSpaStaticFiles ();

            app.UseAuthentication ();
            app.UseIdentityServer ();

            app.UseMvc (routes => {
                routes.MapRoute (
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa (spa => {
                spa.Options.SourcePath = "ClientApp";

                if (Environment.IsDevelopment ()) {
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:3000/");
                    spa.UseReactDevelopmentServer ("start");
                }
            });
        }
    }
}