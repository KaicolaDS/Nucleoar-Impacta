
namespace Nuclear.Api.Models;

public class Equipamento
{
    public int IdEquipamento { get; set; }

    public int IdCliente { get; set; }

    public string Marca { get; set; } = string.Empty;

    public string Modelo { get; set; } = string.Empty;

    public string Tipo { get; set; } = string.Empty;

    public int Btus { get; set; }

    // Relacionamento com o cliente
    public Cliente? Cliente { get; set; }
}
