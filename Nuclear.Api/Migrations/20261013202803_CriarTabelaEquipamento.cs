using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nuclear.Api.Migrations
{
    /// <inheritdoc />
    public partial class CriarTabelaEquipamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TB_EQUIPAMENTO",
                columns: table => new
                {
                    id_equipamento = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_cliente = table.Column<int>(type: "int", nullable: false),
                    marca = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    modelo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    tipo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    btus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_EQUIPAMENTO", x => x.id_equipamento);
                    table.ForeignKey(
                        name: "FK_TB_EQUIPAMENTO_TB_CLIENTE_id_cliente",
                        column: x => x.id_cliente,
                        principalTable: "TB_CLIENTE",
                        principalColumn: "id_cliente",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TB_EQUIPAMENTO_id_cliente",
                table: "TB_EQUIPAMENTO",
                column: "id_cliente");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TB_EQUIPAMENTO");
        }
    }
}
