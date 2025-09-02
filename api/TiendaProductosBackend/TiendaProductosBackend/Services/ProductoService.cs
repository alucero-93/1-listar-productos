using System.Data;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

public class ProductoService
{
    private readonly IDbConnection _db;

    public ProductoService(IConfiguration configuration)
    {
        _db = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
    }

    // Obtener productos
    public IEnumerable<Producto> GetProductos()
    {
        var query = "EXEC GetProductos";
        return _db.Query<Producto>(query);
    }

    // Crear producto
    public void CreateProducto(Producto producto)
    {
        var query = "EXEC CreateProducto @Nombre, @Descripcion, @PrecioVenta, @Costo, @SKU, @Inventario, @Imagen";
        _db.Execute(query, producto);
    }

    // Editar producto
    public void EditProducto(Producto producto)
    {
        var query = "EXEC EditProducto @Id, @Nombre, @Descripcion, @PrecioVenta, @Costo, @SKU, @Inventario, @Imagen";
        _db.Execute(query, producto);
    }

    // Eliminar producto
    public void DeleteProducto(int id)
    {
        var query = "EXEC DeleteProducto @Id";
        _db.Execute(query, new { Id = id });
    }
}
