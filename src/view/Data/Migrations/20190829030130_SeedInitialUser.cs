using Microsoft.EntityFrameworkCore.Migrations;

namespace PetHome.View.Data.Migrations
{
    public partial class SeedInitialUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "7afb4539-8ab2-44d1-a881-2dbc8fdd7ab8", 0, "3d406bb9-460b-44ad-8bf0-513908f095f6", "manager@pethome.app", true, true, null, "MANAGER@PETHOME.APP", "MANAGER@PETHOME.APP", "AQAAAAEAACcQAAAAEIVDPe+D2k9DYm8aaZlygE1ycvP2BRWCG5m/08oxAWV/yXRq84CDZIl+GZQBVp7rTA==", null, false, "60032225-177c-4d2c-bfad-f31b1988dad2", false, "manager@pethome.app" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7afb4539-8ab2-44d1-a881-2dbc8fdd7ab8");
        }
    }
}
