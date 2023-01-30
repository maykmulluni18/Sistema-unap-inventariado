

export const userColumns = [

  {
    field: 'id',
    headerName: 'ID',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 70,
    valueGetter: (params) =>
      `${params.row.id || ''}`

  },
  { field: 'fecha_registro', headerName: 'Fecha Registro', width: 180 },

  {
    field: 'item',
    headerName: 'Codigo',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
    valueGetter: (params) =>
      `${params.row.biene.item || ''}`

  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 380,
    valueGetter: (params) =>
      `${params.row.biene.description || ''}`

  },
  {
    field: 'medida',
    headerName: 'U. Medida',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    valueGetter: (params) =>
      `${params.row.biene.unidad_de_medida || ''}`

  },
  { field: 'cantidad_inicial', headerName: 'Cantidad', width: 100 },
  { field: 'cantidad', headerName: 'Stock', width: 90 },
  { field: 'precio', headerName: 'P. Unitario', width: 140 },
  {
    field: 'P. Total',
    headerName: 'Precio Total',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
    valueGetter: (params) =>
    Number.parseFloat(`${params.row.cantidad_inicial}` * `${params.row.precio}`).toFixed(2),  

}
];