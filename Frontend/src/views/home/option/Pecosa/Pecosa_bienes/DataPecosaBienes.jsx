
export const userColumns = [

    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'pecosaPedidoId', headerName: 'Pecosa', width: 80 },

    {
        field: 'Bienes_Descripcion',
        headerName: 'Bienes Descripcion',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 350,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.descripcion || params.row.nea_bien?.descripcion}` ,
    },
    {
        field: 'items',
        headerName: 'Item',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 90,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.item || params.row.nea_bien?.item}`,
    },
    {
        field: 'u_medida',
        headerName: 'U. Medida',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 90,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.unidad || params.row.nea_bien?.medida}`,
    },
    { field: 'cantidad', headerName: 'Cantidad', width: 100 },
    { field: 'observaciones', headerName: 'Observaciones', width: 210 },    
    { field: 'fecha', headerName: 'Fecha de Pedido', width: 140 },
    {
        field: 'P.Total',
        headerName: 'P.Total',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 100,
        valueGetter: (params) =>
            `${params.row.cantidad || ''}` * `${params.row.inventarido_inicial?.precio || params.row.nea_bien?.p_unitario}`,
    },
];