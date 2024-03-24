using Microsoft.EntityFrameworkCore;

namespace Microondas;
public class Context : DbContext, IContext
{
  private string _connectionString = "Server=127.0.0.1;Database=database_microondas;User=SA;Password=Microondas123@;TrustServerCertificate=true";
  public Context(DbContextOptions<Context> options) : base(options) { }
  public DbSet<Programa> Programas { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseSqlServer(_connectionString);
  }

}