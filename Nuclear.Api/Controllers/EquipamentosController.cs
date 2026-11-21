
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nuclear.Api.Data;
using Nuclear.Api.Models;

namespace Nuclear.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EquipamentosController : ControllerBase
{
    private readonly AppDbContext _context;

    public EquipamentosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Equipamento>>> GetEquipamentos()
    {
        var equipamentos = await _context.Equipamentos
            .AsNoTracking()
            .Include(e => e.Cliente)
.Include(e => e.Categoria)
            .ToListAsync();

        return Ok(equipamentos);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Equipamento>> GetEquipamento(int id)
    {
        var equipamento = await _context.Equipamentos
            .AsNoTracking()
            .Include(e => e.Cliente)
            .Include(e => e.Categoria)
            .FirstOrDefaultAsync(e => e.IdEquipamento == id);

        if (equipamento == null)
            return NotFound(new { mensagem = "Equipamento não encontrado." });

        return Ok(equipamento);
    }

    [HttpPost]
    public async Task<ActionResult<Equipamento>> CriarEquipamento(
        [FromBody] Equipamento equipamento)
    {
        if (equipamento.IdCategoria.HasValue)
{
    var categoriaExiste = await _context.Categorias
        .AnyAsync(c => c.IdCategoria == equipamento.IdCategoria);

    if (!categoriaExiste)
        return BadRequest(new { mensagem = "A categoria informada não existe." });
}
        if (string.IsNullOrWhiteSpace(equipamento.Marca))
            return BadRequest(new { mensagem = "A marca é obrigatória." });

        if (string.IsNullOrWhiteSpace(equipamento.Modelo))
            return BadRequest(new { mensagem = "O modelo é obrigatório." });

        if (string.IsNullOrWhiteSpace(equipamento.Tipo))
            return BadRequest(new { mensagem = "O tipo é obrigatório." });

        if (equipamento.Btus <= 0)
            return BadRequest(new { mensagem = "Os BTUs devem ser maiores que zero." });

        var clienteExiste = await _context.Clientes
            .AnyAsync(c => c.IdCliente == equipamento.IdCliente);

        if (!clienteExiste)
            return BadRequest(new { mensagem = "O cliente informado não existe." });

        equipamento.IdEquipamento = 0;
        equipamento.Cliente = null;
        equipamento.Categoria = null;

        _context.Equipamentos.Add(equipamento);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetEquipamento),
            new { id = equipamento.IdEquipamento },
            equipamento);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> AtualizarEquipamento(
        int id,
        [FromBody] Equipamento equipamento)
    {
        if (equipamento.IdCategoria.HasValue)
{
    var categoriaExiste = await _context.Categorias
        .AnyAsync(c => c.IdCategoria == equipamento.IdCategoria);

    if (!categoriaExiste)
        return BadRequest(new { mensagem = "A categoria informada não existe." });
}

        if (id != equipamento.IdEquipamento)
            return BadRequest(new { mensagem = "O ID informado não corresponde ao equipamento." });

        if (string.IsNullOrWhiteSpace(equipamento.Marca) ||
            string.IsNullOrWhiteSpace(equipamento.Modelo) ||
            string.IsNullOrWhiteSpace(equipamento.Tipo))
        {
            return BadRequest(new
            {
                mensagem = "Marca, modelo e tipo são obrigatórios."
            });
        }

        if (equipamento.Btus <= 0)
            return BadRequest(new { mensagem = "Os BTUs devem ser maiores que zero." });

        var clienteExiste = await _context.Clientes
            .AnyAsync(c => c.IdCliente == equipamento.IdCliente);

        if (!clienteExiste)
            return BadRequest(new { mensagem = "O cliente informado não existe." });

        var existente = await _context.Equipamentos
            .FirstOrDefaultAsync(e => e.IdEquipamento == id);

        if (existente == null)
            return NotFound(new { mensagem = "Equipamento não encontrado." });

        existente.IdCliente = equipamento.IdCliente;
        existente.IdCategoria = equipamento.IdCategoria;
        existente.Marca = equipamento.Marca;
        existente.Modelo = equipamento.Modelo;
        existente.Tipo = equipamento.Tipo;
        existente.Btus = equipamento.Btus;
        

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> ExcluirEquipamento(int id)
    {
        var equipamento = await _context.Equipamentos
            .FirstOrDefaultAsync(e => e.IdEquipamento == id);

        if (equipamento == null)
            return NotFound(new { mensagem = "Equipamento não encontrado." });

        _context.Equipamentos.Remove(equipamento);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
