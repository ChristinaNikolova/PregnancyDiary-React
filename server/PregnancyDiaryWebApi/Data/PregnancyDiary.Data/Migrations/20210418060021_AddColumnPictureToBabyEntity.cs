namespace PregnancyDiary.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddColumnPictureToBabyEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "Babies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: string.Empty);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Babies");
        }
    }
}
