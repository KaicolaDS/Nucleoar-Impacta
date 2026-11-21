
using Microsoft.EntityFrameworkCore;
using Nuclear.Api.Models;

namespace Nuclear.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Equipamento> Equipamentos { get; set; }
    public DbSet<Servico> Servicos { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.ToTable("TB_CLIENTE");

            entity.HasKey(c => c.IdCliente);

            entity.Property(c => c.IdCliente)
                .HasColumnName("id_cliente");

            entity.Property(c => c.Nome)
                .HasColumnName("nome")
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(c => c.Telefone)
                .HasColumnName("telefone")
                .HasMaxLength(20)
                .IsRequired();

            entity.Property(c => c.Email)
                .HasColumnName("email")
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(c => c.Endereco)
                .HasColumnName("endereco")
                .HasMaxLength(255)
                .IsRequired();
        });

        modelBuilder.Entity<Servico>(entity =>
        {
            entity.ToTable("TB_SERVICO");

            entity.HasKey(s => s.IdServico);

            entity.Property(s => s.IdServico)
                .HasColumnName("id_servico");

            entity.Property(s => s.Nome)
                .HasColumnName("nome")
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(s => s.Descricao)
                .HasColumnName("descricao")
                .HasMaxLength(255)
                .IsRequired();

            entity.Property(s => s.Valor)
                .HasColumnName("valor")
                .HasColumnType("decimal(10,2)")
                .IsRequired();
        });
        modelBuilder.Entity<Equipamento>(entity =>
        {
            entity.ToTable("TB_EQUIPAMENTO");

            entity.HasKey(e => e.IdEquipamento);

            entity.Property(e => e.IdEquipamento)
                .HasColumnName("id_equipamento");

            entity.Property(e => e.IdCliente)
                .HasColumnName("id_cliente");

            entity.Property(e => e.Marca)
                .HasColumnName("marca")
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(e => e.Modelo)
                .HasColumnName("modelo")
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(e => e.Tipo)
                .HasColumnName("tipo")
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(e => e.Btus)
                .HasColumnName("btus")
                .IsRequired();

            entity.HasOne(e => e.Cliente)
                .WithMany()
                .HasForeignKey(e => e.IdCliente)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Categoria>(entity =>
{
    entity.ToTable("TB_CATEGORIA");

    entity.HasKey(c => c.IdCategoria);

    entity.Property(c => c.IdCategoria)
        .HasColumnName("id_categoria");

    entity.Property(c => c.Nome)
        .HasColumnName("nome")
        .HasMaxLength(100)
        .IsRequired();

    entity.Property(c => c.Descricao)
        .HasColumnName("descricao")
        .HasMaxLength(255)
        .IsRequired();
});

        modelBuilder.Entity<Equipamento>()
            .HasOne(e => e.Categoria)
            .WithMany()
            .HasForeignKey(e => e.IdCategoria)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
