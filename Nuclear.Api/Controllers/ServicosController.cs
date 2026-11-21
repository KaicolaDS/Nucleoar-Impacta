
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nuclear.Api.Data;
using Nuclear.Api.Models;

namespace Nuclear.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServicosController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Servicos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Servico>>> GetServicos()
    {
        return await _context.Servicos
            .AsNoTracking()
            .ToListAsync();
    }

    // GET: api/Servicos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Servico>> GetServico(int id)
    {
        var servico = await _context.Servicos.FindAsync(id);

        if (servico == null)
            return NotFound(new { mensagem = "Serviço não encontrado." });

        return Ok(servico);
    }

    // POST: api/Servicos
    [HttpPost]
    public async Task<ActionResult<Servico>> CriarServico(Servico servico)
    {
        if (string.IsNullOrWhiteSpace(servico.Nome))
            return BadRequest(new { mensagem = "O nome é obrigatório." });

        if (servico.Nome.Length > 100)
            return BadRequest(new { mensagem = "O nome deve ter no máximo 100 caracteres." });

        if (string.IsNullOrWhiteSpace(servico.Descricao))
            return BadRequest(new { mensagem = "A descrição é obrigatória." });

        if (servico.Descricao.Length > 255)
            return BadRequest(new { mensagem = "A descrição deve ter no máximo 255 caracteres." });

        if (servico.Valor < 0)
            return BadRequest(new { mensagem = "O valor não pode ser negativo." });

        _context.Servicos.Add(servico);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetServico),
            new { id = servico.IdServico },
            servico
        );
    }

    // PUT: api/Servicos/5
    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarServico(int id, Servico servico)
    {
        if (id != servico.IdServico)
            return BadRequest(new { mensagem = "O ID informado não corresponde ao serviço." });

        if (string.IsNullOrWhiteSpace(servico.Nome) || servico.Nome.Length > 100)
            return BadRequest(new { mensagem = "Informe um nome válido com até 100 caracteres." });

        if (string.IsNullOrWhiteSpace(servico.Descricao) || servico.Descricao.Length > 255)
            return BadRequest(new { mensagem = "Informe uma descrição válida com até 255 caracteres." });

        if (servico.Valor < 0)
            return BadRequest(new { mensagem = "O valor não pode ser negativo." });

        var servicoExistente = await _context.Servicos.FindAsync(id);

        if (servicoExistente == null)
            return NotFound(new { mensagem = "Serviço não encontrado." });

        servicoExistente.Nome = servico.Nome;
        servicoExistente.Descricao = servico.Descricao;
        servicoExistente.Valor = servico.Valor;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Servicos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> ExcluirServico(int id)
    {
        var servico = await _context.Servicos.FindAsync(id);

        if (servico == null)
            return NotFound(new { mensagem = "Serviço não encontrado." });

        _context.Servicos.Remove(servico);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
