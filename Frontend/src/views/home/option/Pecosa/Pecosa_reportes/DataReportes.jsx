        
export const userColumns = [

    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'Responsble',
        headerName: 'Responsble',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 350,
        valueGetter: (params) =>
            `${params.row.usuario.nombres + ' '}` +  
            `${params.row.usuario.apellido_paterno + ' '}` + 
            `${params.row.usuario.apellido_materno || ' '}`,
    },
    {
        field: 'Sedes',
        headerName: 'Sedes',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 550,
        valueGetter: (params) =>
            `${params.row.sede?.sede || ''}` + '  ' +  ' ' + `${params.row.sede?.descripcion || ''}`,
    },

    { field: 'fecha', headerName: 'Fecha de Pedido', width: 140 },
    {
        field: 'Bienes',
        headerName: 'Cantidad Bienes',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.inventarido_inicials?.length}`,
    }
];