using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Mvc;
[Route("api/[controller]")]
[ApiController]
public class ProductoController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductoController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Producto
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
    {
        return await _context.Productos.Where(p => p.Imagen != null).ToListAsync();
    }

    // POST: api/Producto
    [HttpPost]
    public async Task<ActionResult<Producto>> CreateProducto(Producto producto)
    {
        decimal margen = (producto.PrecioVenta - producto.Costo) / producto.PrecioVenta;
        if (margen < 0.1M)
        {
            return BadRequest("El margen de ganancia debe ser al menos del 10%");
        }

        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetProducto", new { id = producto.Id }, producto);
    }

    // PUT: api/Producto/5
    [HttpPut("{id}")]
    public async Task<IActionResult> EditProducto(int id, Producto producto)
    {
        decimal margen = (producto.PrecioVenta - producto.Costo) / producto.PrecioVenta;
        if (margen < 0.1M)
        {
            return BadRequest("El margen de ganancia debe ser al menos del 10%");
        }

        var productoExistente = await _context.Productos.FindAsync(id);
        if (productoExistente == null)
        {
            return NotFound();
        }

        productoExistente.Nombre = producto.Nombre;
        productoExistente.Descripcion = producto.Descripcion;
        productoExistente.PrecioVenta = producto.PrecioVenta;
        productoExistente.Costo = producto.Costo;
        productoExistente.SKU = producto.SKU;
        productoExistente.Inventario = producto.Inventario;
        productoExistente.Imagen = producto.Imagen;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/Producto/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProducto(int id)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null)
        {
            return NotFound();
        }

        if (producto.Inventario > 0)
        {
            return BadRequest("No se puede eliminar el producto, tiene inventario disponible");
        }

        _context.Productos.Remove(producto);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // Login: api/login/
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Username == loginRequest.Username && u.PasswordHash == loginRequest.Password);

        if (usuario == null)
        {
            return Unauthorized("Usuario o contraseña incorrectos");
        }

        return Ok(new { message = "Login exitoso", usuario.Id, usuario.Username, usuario.Role });
    }

}
