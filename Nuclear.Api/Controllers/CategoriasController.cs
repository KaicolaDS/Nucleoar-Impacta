
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nuclear.Api.Data;
using Nuclear.Api.Models;

namespace Nuclear.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
    {
        return Ok(await _context.Categorias
            .AsNoTracking()
            .ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Categoria>> GetCategoria(int id)
    {
        var categoria = await _context.Categorias
            .FindAsync(id);

        if (categoria == null)
            return NotFound();

        return Ok(categoria);
    }

    [HttpPost]
    public async Task<ActionResult<Categoria>> CriarCategoria(
        Categoria categoria)
    {
        if (string.IsNullOrWhiteSpace(categoria.Nome))
            return BadRequest("O nome da categoria é obrigatório.");

        categoria.IdCategoria = 0;

        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetCategoria),
            new { id = categoria.IdCategoria },
            categoria);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> AtualizarCategoria(
        int id, Categoria categoria)
    {
        if (id != categoria.IdCategoria)
            return BadRequest();

        if (string.IsNullOrWhiteSpace(categoria.Nome))
            return BadRequest("O nome da categoria é obrigatório.");

        var existente = await _context.Categorias.FindAsync(id);

        if (existente == null)
            return NotFound();

        existente.Nome = categoria.Nome;
        existente.Descricao = categoria.Descricao;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> ExcluirCategoria(int id)
    {
        var categoria = await _context.Categorias.FindAsync(id);

        if (categoria == null)
            return NotFound();

        var possuiEquipamentos = await _context.Equipamentos
            .AnyAsync(e => e.IdCategoria == id);

        if (possuiEquipamentos)
            return Conflict("Não é possível excluir uma categoria vinculada a equipamentos.");

        _context.Categorias.Remove(categoria);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
