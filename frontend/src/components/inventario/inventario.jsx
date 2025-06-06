const Inventario = {
    usuarios: {
        label: "Usuarios",
        url: "http://172.210.65.94:3000/credenciales/",
        columns: [
            { key: "id", label: "ID" },
            { key: "rol", label: "ROL" },
            { key: "username", label: "USUARIO" },
            { key: "correo", label: "CORREO" },
            { key: "password", label: "CONTRASEÑA" }
        ],
        initialData: {
            rol: "", username: "", correo: "", password: ""
        },
        idField: "id"
    },
    products: {
        label: "Productos",
        url: "http://172.210.65.94:3000/productos/",
        columns: [
            { key: "idProducto", label: "ID" },
            { key: "nombreProducto", label: "ARTICULO" },
            { key: "idCategoria", label: "CATEGORIA" },
            { key: "precioVenta", label: "PRECIO" },
            { key: "stock", label: "STOCK" },
            { key: "estado", label: "ESTADO" }
        ],
        initialData: {
            nombreProducto: "", idCategoria: "", precioVenta: "", stock: "", estado: ""
        },
        idField: "idProducto"
    },
    categorias: {
        label: "Categorias",
        url: "http://172.210.65.94:3000/categorias/",
        columns: [
            { key: "idCategoria", label: "ID" },
            { key: "nombreCategoria", label: "NOMBRE" },
            { key: "descripcionCategoria", label: "DESCRIPCIÓN" },
            { key: "estado", label: "ESTADO" }
        ],
        initialData: {
            nombreCategoria: "", descripcionCategoria: "", estado: ""
        },
        idField: "idCategoria"
    },
    clientes: {
        label: "Clientes",
        url: "http://172.210.65.94:3000/clientes/",
        columns: [
            { key: "idCliente", label: "ID" },
            { key: "nombreCliente", label: "NOMBRE" },
            { key: "telefono", label: "TELEFONO" },
            { key: "email", label: "EMAIL" }
        ],
        initialData: {
            nombreCliente: "", telefono: "", email: ""
        },
        idField: "idCliente"
    },
    entradas: {
        label: "Entradas",
        url: "http://172.210.65.94:3000/entradas/",
        columns: [
            { key: "idEntrada", label: "ID" },
            { key: "idProveedor", label: "PROVEEDOR" },
            { key: "productos", label: "PRODUCTOS" },
            { key: "cantidad", label: "CANTIDAD" },   
            { key: "idUsuario", label: "USUARIO" },
            { key: "tipo_comprobante", label: "TIPO COMPROBANTE" },
            { key: "serie_comprobante", label: "SERIE COMPROBANTE" },
            { key: "num_comprobante", label: "NUMERO COMPROBANTE" },
            { key: "fecha", label: "FECHA" },
            { key: "impuesto", label: "IMPUESTO" },
            { key: "total", label: "TOTAL" },
            { key: "estado", label: "ESTADO" }

        ],
        initialData: {
            productos: [],
            cantidad: [],
            idProveedor: "",
            idUsuario: "",
            tipo_comprobante: "",
            serie_comprobante: "",
            num_comprobante: "",
            fecha: "",
            impuesto: "",
            total: "",
            estado: ""
        },
        idField: "idEntrada"
    }
    ,
    proveedores: {
        label: "Proveedores",
        url: "http://172.210.65.94:3000/proveedores/",
        columns: [
            { key: "idProveedor", label: "ID" },
            { key: "nombreProveedor", label: "NOMBRE" },
            { key: "email", label: "EMAIL" },
            { key: "telefono", label: "TELÉFONO" },
        ],
        initialData: {
            nombreProveedor: "", telefono: ""
        },
        idField: "idProveedor"
    },
    detalle_entradas: {
        label: "Detalle Entradas",
        url: "http://172.210.65.94:3000/detalle_entradas/",
        columns: [
            { key: "idDetalle_entrada", label: "ID" },
            { key: "idEntrada", label: "ENTRADA" },
            { key: "idProducto", label: "PRODUCTO" },
            { key: "cantidad", label: "CANTIDAD" },
            { key: "precio", label: "PRECIO" }
        ],
        initialData: {
            idEntrada: "",
            idProducto: "",
            cantidad: "",
            precio: ""
        },
        idField: "idDetalle_entrada"
    },
    ventas: {
        label: "Ventas",
        url: "http://172.210.65.94:3000/ventas/",
        columns: [
            { key: "idVenta", label: "ID" },
            { key: "idCliente", label: "CLIENTE" },
            { key: "idUsuario", label: "USUARIO" },
            { key: "tipo_comprobante", label: "TIPO DE COMPROBANTE" },
            { key: "serie_comprobante", label: "SERIE COMPROBANTE" },
            { key: "num_comprobante", label: "NÚMERO DE COMPROBANTE" },
            { key: "fecha_hora", label: "FECHA Y HORA" },
            { key: "impuesto", label: "IMPUESTO" },
            { key: "total", label: "TOTAL" },
            { key: "estado", label: "ESTADO" }
        ],
        initialData: {
            idCliente: "", idUsuario: "", tipo_comprobante: "", serie_comprobante: "", num_comprobante: "", fecha_hora: "", impuesto: "", total: "", estado: ""
        },
        idField: "idVenta"
    },
    detalle_ventas: {
        label: "Detalle Ventas",
        url: "http://172.210.65.94:3000/detalle_ventas/",
        columns: [
            { key: "idDetalle_venta", label: "ID" },
            { key: "idVenta", label: "VENTA" },
            { key: "idProducto", label: "PRODUCTO" },
            { key: "cantidad", label: "CANTIDAD" },
            { key: "precio", label: "PRECIO" },
            { key: "descuento", label: "DESCUENTO" }
        ],
        initialData: {
            idVenta: "",
            idProducto: "",
            cantidad: "",
            precio: "",
            descuento: ""
        },
        idField: "idDetalle_venta"
    }
};

export default Inventario;