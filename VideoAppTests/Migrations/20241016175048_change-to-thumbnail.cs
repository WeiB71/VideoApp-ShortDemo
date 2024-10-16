using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VideoAppTests.Migrations
{
    /// <inheritdoc />
    public partial class changetothumbnail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ThumbnailPath",
                table: "Videos",
                newName: "Thumbnail");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Thumbnail",
                table: "Videos",
                newName: "ThumbnailPath");
        }
    }
}
