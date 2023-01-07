
export const userColumns = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'fecha_registro', headerName: 'Fecha de Registro', width: 120 },
  { field: 'descripcion', headerName: 'Descripcion', width: 380 },
  { field: 'unidad', headerName: 'Unidad de Medida', width: 180 },
  { field: 'cantidad', headerName: 'Cantidad', width: 150 },
  { field: 'precio', headerName: 'P. Unitario', width: 150 },
  {
    field: 'P.Total',
    headerName: 'P.Total',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    valueGetter: (params) =>
      `${params.row.cantidad || ''}` * `${params.row.precio || ''}`,
  },

];