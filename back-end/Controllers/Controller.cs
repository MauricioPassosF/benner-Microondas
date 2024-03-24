using Microsoft.AspNetCore.Mvc;

namespace Microondas;

[ApiController]
[Route("programas")]

public class ProgramasController : Controller
{
  protected readonly IContext _context;
  public ProgramasController(IContext context)
  {
    _context = context;
  }
  [HttpGet]
  public IActionResult GetAll()
  {
    return Ok(_context.Programas.ToList());
  }

  [HttpPost]
  public IActionResult Add([FromBody] Programa programa)
  {
    _context.Programas.Add(programa);
    _context.SaveChanges();
    return Created("", programa);
  }
}