using Microsoft.EntityFrameworkCore.Migrations;

namespace PetHome.Persistence.Migrations
{
    public partial class ChangedWeightToUInt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Weight",
                table: "Animals",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Weight",
                table: "Animals",
                nullable: false,
                oldClrType: typeof(long));
        }
    }
}
