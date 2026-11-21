using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nuclear.Api.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarCategorias : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdCategoria",
                table: "TB_EQUIPAMENTO",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TB_CATEGORIA",
                columns: table => new
                {
                    id_categoria = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descricao = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_CATEGORIA", x => x.id_categoria);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TB_EQUIPAMENTO_IdCategoria",
                table: "TB_EQUIPAMENTO",
                column: "IdCategoria");

            migrationBuilder.AddForeignKey(
                name: "FK_TB_EQUIPAMENTO_TB_CATEGORIA_IdCategoria",
                table: "TB_EQUIPAMENTO",
                column: "IdCategoria",
                principalTable: "TB_CATEGORIA",
                principalColumn: "id_categoria",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TB_EQUIPAMENTO_TB_CATEGORIA_IdCategoria",
                table: "TB_EQUIPAMENTO");

            migrationBuilder.DropTable(
                name: "TB_CATEGORIA");

            migrationBuilder.DropIndex(
                name: "IX_TB_EQUIPAMENTO_IdCategoria",
                table: "TB_EQUIPAMENTO");

            migrationBuilder.DropColumn(
                name: "IdCategoria",
                table: "TB_EQUIPAMENTO");
        }
    }
}
