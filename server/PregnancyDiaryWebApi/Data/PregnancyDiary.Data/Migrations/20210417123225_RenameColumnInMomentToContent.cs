namespace PregnancyDiary.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class RenameColumnInMomentToContent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Moments",
                newName: "Content");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Moments",
                newName: "Description");
        }
    }
}
