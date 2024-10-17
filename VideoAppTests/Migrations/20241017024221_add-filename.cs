using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VideoAppTests.Migrations
{
    /// <inheritdoc />
    public partial class addfilename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Videos",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Videos");
        }
    }
}
