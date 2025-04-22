package economark.mobile.models

data class Columna(val key: String, val label: String)

data class EntidadReporte(
    val label: String,
    val url: String,
    val columnas: List<Columna>
)

object ReportesConfig {
    val entidades = mapOf(
        "Usuarios" to EntidadReporte(
            label = "Usuarios",
            url = "http://10.0.2.2:3000/credenciales",
            columnas = listOf(
                Columna("id", "ID"),
                Columna("rol", "ROL"),
                Columna("username", "USUARIO"),
                Columna("correo", "CORREO"),
                Columna("password", "CONTRASEÑA")
            )
        ),
        "Productos" to EntidadReporte(
            label = "Productos",
            url = "http://10.0.2.2:3000/productos",
            columnas = listOf(
                Columna("idProducto", "ID"),
                Columna("nombreProducto", "ARTICULO"),
                Columna("idCategoria", "CATEGORIA"),
                Columna("precioVenta", "PRECIO"),
                Columna("stock", "STOCK"),
                Columna("estado", "ESTADO")
            )
        ),
        "Categorias" to EntidadReporte(
            label = "Categorias",
            url = "http://10.0.2.2:3000/categorias",
            columnas = listOf(
                Columna("idCategoria", "ID"),
                Columna("nombreCategoria", "NOMBRE"),
                Columna("descripcionCategoria", "DESCRIPCIÓN"),
                Columna("estado", "ESTADO")
            )
        ),
        "Clientes" to EntidadReporte(
            label = "Clientes",
            url = "http://10.0.2.2:3000/clientes",
            columnas = listOf(
                Columna("idCliente", "ID"),
                Columna("nombreCliente", "NOMBRE"),
                Columna("telefono", "TELEFONO"),
                Columna("email", "EMAIL")
            )
        ),
        "Entradas" to EntidadReporte(
            label = "Entradas",
            url = "http://10.0.2.2:3000/entradas",
            columnas = listOf(
                Columna("idEntrada", "ID"),
                Columna("idProveedor", "PROVEEDOR"),
                Columna("idUsuario", "USUARIO"),
                Columna("tipo_comprobante", "TIPO COMPROBANTE"),
                Columna("serie_comprobante", "SERIE COMPROBANTE"),
                Columna("num_comprobante", "NUMERO COMPROBANTE"),
                Columna("fecha", "FECHA"),
                Columna("impuesto", "IMPUESTO"),
                Columna("total", "TOTAL"),
                Columna("estado", "ESTADO")
            )
        ),
        "Proveedores" to EntidadReporte(
            label = "Proveedores",
            url = "http://10.0.2.2:3000/proveedores",
            columnas = listOf(
                Columna("idProveedor", "ID"),
                Columna("nombreProveedor", "NOMBRE"),
                Columna("email", "EMAIL"),
                Columna("telefono", "TELÉFONO")
            )
        ),
        "Detalle Entradas" to EntidadReporte(
            label = "Detalle Entradas",
            url = "http://10.0.2.2:3000/detalle_entradas",
            columnas = listOf(
                Columna("idDetalle_entrada", "ID"),
                Columna("idEntrada", "ENTRADA"),
                Columna("idProducto", "PRODUCTO"),
                Columna("cantidad", "CANTIDAD"),
                Columna("precio", "PRECIO")
            )
        ),
        "Ventas" to EntidadReporte(
            label = "Ventas",
            url = "http://10.0.2.2:3000/ventas",
            columnas = listOf(
                Columna("idVenta", "ID"),
                Columna("idCliente", "CLIENTE"),
                Columna("idUsuario", "USUARIO"),
                Columna("tipo_comprobante", "TIPO DE COMPROBANTE"),
                Columna("serie_comprobante", "SERIE COMPROBANTE"),
                Columna("num_comprobante", "NÚMERO DE COMPROBANTE"),
                Columna("fecha_hora", "FECHA Y HORA"),
                Columna("impuesto", "IMPUESTO"),
                Columna("total", "TOTAL"),
                Columna("estado", "ESTADO")
            )
        ),
        "Detalle Ventas" to EntidadReporte(
            label = "Detalle Ventas",
            url = "http://10.0.2.2:3000/detalle_ventas",
            columnas = listOf(
                Columna("idDetalle_venta", "ID"),
                Columna("idVenta", "VENTA"),
                Columna("idProducto", "PRODUCTO"),
                Columna("cantidad", "CANTIDAD"),
                Columna("precio", "PRECIO"),
                Columna("descuento", "DESCUENTO")
            )
        )
    )
}
