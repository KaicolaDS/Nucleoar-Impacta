using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nuclear.Api.Data;
using Nuclear.Api.Models;

namespace Nuclear.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/clientes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
    {
        var clientes = await _context.Clientes
            .AsNoTracking()
            .ToListAsync();

        return Ok(clientes);
    }

    // GET: api/clientes/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Cliente>> GetCliente(int id)
    {
        var cliente = await _context.Clientes
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.IdCliente == id);

        if (cliente == null)
        {
            return NotFound(new
            {
                mensagem = "Cliente não encontrado."
            });
        }

        return Ok(cliente);
    }

    // POST: api/clientes
    [HttpPost]
    public async Task<ActionResult<Cliente>> CriarCliente(
        [FromBody] Cliente cliente)
    {
        if (string.IsNullOrWhiteSpace(cliente.Nome))
        {
            return BadRequest(new
            {
                mensagem = "O nome do cliente é obrigatório."
            });
        }

        if (string.IsNullOrWhiteSpace(cliente.Telefone))
        {
            return BadRequest(new
            {
                mensagem = "O telefone do cliente é obrigatório."
            });
        }

        if (string.IsNullOrWhiteSpace(cliente.Email))
        {
            return BadRequest(new
            {
                mensagem = "O e-mail do cliente é obrigatório."
            });
        }

        if (string.IsNullOrWhiteSpace(cliente.Endereco))
        {
            return BadRequest(new
            {
                mensagem = "O endereço do cliente é obrigatório."
            });
        }

        cliente.IdCliente = 0;

        _context.Clientes.Add(cliente);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetCliente),
            new { id = cliente.IdCliente },
            cliente
        );
    }

    // PUT: api/clientes/1
    [HttpPut("{id:int}")]
    public async Task<IActionResult> AtualizarCliente(
        int id,
        [FromBody] Cliente cliente)
    {
        if (id != cliente.IdCliente)
        {
            return BadRequest(new
            {
                mensagem = "O ID informado não corresponde ao cliente."
            });
        }

        var clienteExistente = await _context.Clientes
            .FirstOrDefaultAsync(c => c.IdCliente == id);

        if (clienteExistente == null)
        {
            return NotFound(new
            {
                mensagem = "Cliente não encontrado."
            });
        }

        clienteExistente.Nome = cliente.Nome;
        clienteExistente.Telefone = cliente.Telefone;
        clienteExistente.Email = cliente.Email;
        clienteExistente.Endereco = cliente.Endereco;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/clientes/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> ExcluirCliente(int id)
    {
        var cliente = await _context.Clientes
            .FirstOrDefaultAsync(c => c.IdCliente == id);

        if (cliente == null)
        {
            return NotFound(new
            {
                mensagem = "Cliente não encontrado."
            });
        }

        _context.Clientes.Remove(cliente);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}