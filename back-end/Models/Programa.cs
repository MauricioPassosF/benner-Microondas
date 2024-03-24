using System.ComponentModel.DataAnnotations;

namespace Microondas;

public class Programa
{
  [Key]
  public int ProgramaId { get; set; }
  public string nome { get; set; } = String.Empty;
  public string alimento { get; set; } = String.Empty;
  public int tempo { get; set; }
  public int potencia { get; set; }
  public string? instrucoes { get; set; }
  public string caracter { get; set; } = String.Empty;
}