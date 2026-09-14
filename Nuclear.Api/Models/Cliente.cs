namespace Nuclear.Api.Models;

public class Cliente
{
    public int IdCliente { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string Telefone { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Endereco { get; set; } = string.Empty;
}