using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PetHome.Persistence.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnimalsCollection",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Species = table.Column<string>(nullable: true),
                    Entered = table.Column<DateTime>(nullable: false),
                    Color = table.Column<string>(nullable: true),
                    Breed = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Weight = table.Column<int>(nullable: false),
                    Tag = table.Column<string>(nullable: true),
                    Circumstances = table.Column<string>(nullable: true),
                    VetRequired = table.Column<bool>(nullable: false),
                    Notes = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnimalsCollection", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnimalsCollection");
        }
    }
}
