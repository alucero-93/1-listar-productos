USE [master]
GO
/****** Object:  Database [TiendaProductos]    Script Date: 1/9/2025 21:22:32 ******/
CREATE DATABASE [TiendaProductos]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TiendaProductos', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\TiendaProductos.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TiendaProductos_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\TiendaProductos_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [TiendaProductos] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TiendaProductos].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TiendaProductos] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TiendaProductos] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TiendaProductos] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TiendaProductos] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TiendaProductos] SET ARITHABORT OFF 
GO
ALTER DATABASE [TiendaProductos] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TiendaProductos] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TiendaProductos] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TiendaProductos] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TiendaProductos] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TiendaProductos] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TiendaProductos] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TiendaProductos] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TiendaProductos] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TiendaProductos] SET  ENABLE_BROKER 
GO
ALTER DATABASE [TiendaProductos] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TiendaProductos] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TiendaProductos] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TiendaProductos] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TiendaProductos] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TiendaProductos] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TiendaProductos] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TiendaProductos] SET RECOVERY FULL 
GO
ALTER DATABASE [TiendaProductos] SET  MULTI_USER 
GO
ALTER DATABASE [TiendaProductos] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TiendaProductos] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TiendaProductos] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TiendaProductos] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TiendaProductos] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TiendaProductos] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'TiendaProductos', N'ON'
GO
ALTER DATABASE [TiendaProductos] SET QUERY_STORE = OFF
GO
USE [TiendaProductos]
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 1/9/2025 21:22:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Descripcion] [nvarchar](255) NOT NULL,
	[PrecioVenta] [decimal](10, 2) NOT NULL,
	[Costo] [decimal](10, 2) NOT NULL,
	[SKU] [nvarchar](50) NOT NULL,
	[Inventario] [int] NOT NULL,
	[Imagen] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 1/9/2025 21:22:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 1/9/2025 21:22:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[PasswordHash] [nvarchar](255) NOT NULL,
	[Role] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 
GO
INSERT [dbo].[Roles] ([Id], [RoleName]) VALUES (1, N'Admin')
GO
INSERT [dbo].[Roles] ([Id], [RoleName]) VALUES (2, N'User')
GO
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
/****** Object:  StoredProcedure [dbo].[CreateProducto]    Script Date: 1/9/2025 21:22:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateProducto]
    @Nombre NVARCHAR(100),
    @Descripcion NVARCHAR(255),
    @PrecioVenta DECIMAL(10,2),
    @Costo DECIMAL(10,2),
    @SKU NVARCHAR(50),
    @Inventario INT,
    @Imagen NVARCHAR(255)
AS
BEGIN
    DECLARE @Margen DECIMAL(10,2);
    SET @Margen = (@PrecioVenta - @Costo) / @PrecioVenta;

    IF @Margen < 0.1
    BEGIN
        PRINT 'El margen de ganancia debe ser al menos del 10%';
        RETURN;
    END

    INSERT INTO Productos (Nombre, Descripcion, PrecioVenta, Costo, SKU, Inventario, Imagen)
    VALUES (@Nombre, @Descripcion, @PrecioVenta, @Costo, @SKU, @Inventario, @Imagen);
END;
GO
/****** Object:  StoredProcedure [dbo].[DeleteProducto]    Script Date: 1/9/2025 21:22:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteProducto]
    @Id INT
AS
BEGIN
    DECLARE @Inventario INT;

    SELECT @Inventario = Inventario FROM Productos WHERE Id = @Id;

    IF @Inventario > 0
    BEGIN
        PRINT 'No se puede eliminar el producto, tiene inventario disponible';
        RETURN;
    END

    DELETE FROM Productos WHERE Id = @Id;
END;
GO
/****** Object:  StoredProcedure [dbo].[EditProducto]    Script Date: 1/9/2025 21:22:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[EditProducto]
    @Id INT,
    @Nombre NVARCHAR(100),
    @Descripcion NVARCHAR(255),
    @PrecioVenta DECIMAL(10,2),
    @Costo DECIMAL(10,2),
    @SKU NVARCHAR(50),
    @Inventario INT,
    @Imagen NVARCHAR(255)
AS
BEGIN
    -- Validación del margen de ganancia
    DECLARE @Margen DECIMAL(10,2);
    SET @Margen = (@PrecioVenta - @Costo) / @PrecioVenta;

    IF @Margen < 0.1
    BEGIN
        PRINT 'El margen de ganancia debe ser al menos del 10%';
        RETURN;
    END

    -- Actualizar el producto
    UPDATE Productos
    SET 
        Nombre = @Nombre,
        Descripcion = @Descripcion,
        PrecioVenta = @PrecioVenta,
        Costo = @Costo,
        SKU = @SKU,
        Inventario = @Inventario,
        Imagen = @Imagen
    WHERE Id = @Id;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetProductos]    Script Date: 1/9/2025 21:22:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetProductos]
AS
BEGIN
    SELECT * FROM Productos WHERE Imagen IS NOT NULL;
END;
GO
USE [master]
GO
ALTER DATABASE [TiendaProductos] SET  READ_WRITE 
GO
