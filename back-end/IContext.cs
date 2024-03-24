using Microsoft.EntityFrameworkCore;

namespace Microondas;

public interface IContext
{
  public DbSet<Programa> Programas { get; set; }
  public int SaveChanges();
}