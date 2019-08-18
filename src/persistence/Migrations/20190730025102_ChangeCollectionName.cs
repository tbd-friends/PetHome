using Microsoft.EntityFrameworkCore.Migrations;

namespace PetHome.Persistence.Migrations
{
    public partial class ChangeCollectionName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AnimalsCollection",
                table: "AnimalsCollection");

            migrationBuilder.RenameTable(
                name: "AnimalsCollection",
                newName: "Animals");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Animals",
                table: "Animals",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Animals",
                table: "Animals");

            migrationBuilder.RenameTable(
                name: "Animals",
                newName: "AnimalsCollection");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnimalsCollection",
                table: "AnimalsCollection",
                column: "Id");
        }
    }
}
