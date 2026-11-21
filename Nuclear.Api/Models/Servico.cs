
namespace Nuclear.Api.Models;

public class Servico
{
    public int IdServico { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; }
}
