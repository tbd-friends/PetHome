using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using PetHome.Persistence;
using PetHome.View;
using PetHome.View.Data;
using PetHome.View.Data.Models;
using System;
using System.Threading.Tasks;
using Xunit;

namespace view.tests
{
    public class SeedDataTests
    {
        private (IServiceProvider, Mock<IMigrationRunner>, Mock<UserManager<AppUser>>) MockServiceProviderWithoutUser(IdentityResult result)
        {
            var identityOptions = new DbContextOptionsBuilder<IdentityContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var testIdentityContext = new IdentityContext(identityOptions);
            var applicationOptions = new DbContextOptionsBuilder<ApplicationContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var testApplicationContext = new ApplicationContext(applicationOptions);

            var configuration = new Mock<IConfiguration>();
            var migrationRunner = new Mock<IMigrationRunner>();
            var serviceProvider = new Mock<IServiceProvider>();
            var userStore = new Mock<IUserStore<AppUser>>();
            var userManager = new Mock<UserManager<AppUser>>(userStore.Object, null, null, null, null, null, null, null, null);
            var serviceScope = new Mock<IServiceScope>();
            var serviceScopeFactory = new Mock<IServiceScopeFactory>();

            serviceScope.Setup(x => x.ServiceProvider).Returns(serviceProvider.Object);

            serviceScopeFactory.Setup(x => x.CreateScope()).Returns(serviceScope.Object);

            userManager.Setup(x => x.FindByNameAsync(It.Is<string>(v => v == "manager@pethome.app"))).Returns(Task.FromResult<AppUser>(null));
            userManager.Setup(x => x.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>())).Returns(Task.FromResult(result));

            serviceProvider.Setup(x => x.GetService(typeof(IConfiguration))).Returns(configuration.Object);
            serviceProvider.Setup(x => x.GetService(typeof(IServiceScopeFactory))).Returns(serviceScopeFactory.Object);
            serviceProvider.Setup(x => x.GetService(typeof(IMigrationRunner))).Returns(migrationRunner.Object);
            serviceProvider.Setup(x => x.GetService(typeof(UserManager<AppUser>))).Returns(userManager.Object);
            serviceProvider.Setup(x => x.GetService(typeof(IdentityContext))).Returns(testIdentityContext);
            serviceProvider.Setup(x => x.GetService(typeof(ApplicationContext))).Returns(testApplicationContext);

            return (serviceProvider.Object, migrationRunner, userManager);
        }

        private (IServiceProvider, Mock<IMigrationRunner>, Mock<UserManager<AppUser>>) MockServiceProviderWithUser()
        {
            var identityOptions = new DbContextOptionsBuilder<IdentityContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var testIdentityContext = new IdentityContext(identityOptions);
            var applicationOptions = new DbContextOptionsBuilder<ApplicationContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var testApplicationContext = new ApplicationContext(applicationOptions);

            var configuration = new Mock<IConfiguration>();
            var migrationRunner = new Mock<IMigrationRunner>();
            var serviceProvider = new Mock<IServiceProvider>();
            var userStore = new Mock<IUserStore<AppUser>>();
            var userManager = new Mock<UserManager<AppUser>>(userStore.Object, null, null, null, null, null, null, null, null);
            var serviceScope = new Mock<IServiceScope>();
            var serviceScopeFactory = new Mock<IServiceScopeFactory>();

            serviceScope.Setup(x => x.ServiceProvider).Returns(serviceProvider.Object);

            serviceScopeFactory.Setup(x => x.CreateScope()).Returns(serviceScope.Object);
            userManager.Setup(x => x.FindByNameAsync(It.Is<string>(v => v == "manager@pethome.app"))).Returns(Task.FromResult(new AppUser()));

            serviceProvider.Setup(x => x.GetService(typeof(IConfiguration))).Returns(configuration.Object);
            serviceProvider.Setup(x => x.GetService(typeof(IServiceScopeFactory))).Returns(serviceScopeFactory.Object);
            serviceProvider.Setup(x => x.GetService(typeof(IMigrationRunner))).Returns(migrationRunner.Object);
            serviceProvider.Setup(x => x.GetService(typeof(UserManager<AppUser>))).Returns(userManager.Object);
            serviceProvider.Setup(x => x.GetService(typeof(IdentityContext))).Returns(testIdentityContext);
            serviceProvider.Setup(x => x.GetService(typeof(ApplicationContext))).Returns(testApplicationContext);

            return (serviceProvider.Object, migrationRunner, userManager);
        }

        [Fact]
        public void Calls_Migrate_on_Databases()
        {
            var (serviceProvider, migrationRunner, _) = MockServiceProviderWithoutUser(IdentityResult.Success);

            SeedData.EnsureDataSeeded(serviceProvider);

            migrationRunner.Verify(v => v.Migrate(It.IsAny<IdentityContext>()));
            migrationRunner.Verify(v => v.Migrate(It.IsAny<ApplicationContext>()));
        }

        [Fact]
        public void Creates_User_if_not_exist()
        {
            var (serviceProvider, _, userManager) = MockServiceProviderWithoutUser(IdentityResult.Success);

            SeedData.EnsureDataSeeded(serviceProvider);

            userManager.Verify(v => v.CreateAsync(It.Is<AppUser>(x => x.UserName == "manager@pethome.app"), It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public void Throws_exception_if_failed_to_create()
        {
            var (serviceProvider, _, userManager) = MockServiceProviderWithoutUser(IdentityResult.Failed(new IdentityError() { Description = "Error" }));

            Action act = () => SeedData.EnsureDataSeeded(serviceProvider);

            act.Should().Throw<Exception>();
        }

        [Fact]
        public void Wont_Create_user_if_one_exist()
        {
            var (serviceProvider, _, userManager) = MockServiceProviderWithUser();

            SeedData.EnsureDataSeeded(serviceProvider);

            userManager.Verify(v => v.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>()), Times.Never());
        }
    }
}
