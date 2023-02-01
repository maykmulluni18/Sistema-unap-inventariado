import "./tablareporteinventariado.scss"
import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./Data";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from "axios";
import { DB_URL } from "../../../../../config/config";

const URI = DB_URL + 'invetinicial/'


const TablaReporte_Invet = () => {
  const [inventariado, setInvetariado] = useState([])

  useEffect(() => {
    getInventariado()
  }, [])

  const getInventariado = async () => {
    const res = await axios.get(URI)
    setInvetariado(res.data.reverse())
  };

  const actionColumn = [
    {
      field: "opciones",
      headerName: "Opciones",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">

            <Link to={`detalles/${params.row.fecha_registro}`} style={{ textDecoration: "none" }}>
              <div className="viewButton"><VisibilityIcon /></div>
            </Link>

            <Link to={`reporpdf/${params.row.fecha_registro}`} style={{ textDecoration: "none" }}>
              <div className="pdfButton"><PictureAsPdfIcon /></div>
            </Link>

          </div>
        );
      },
    },
  ];
  return (
    <div className="Table_inventariado">
      <div className="top">
        <h1><strong>Reportes de Inventario : </strong> Inicial de Bienes de la Oficina de abastecimiento</h1>
      </div>
      <div className="Tabledata">
        <div className="dataTitle">
          Reportes de Inventario
        </div>
        <DataGrid
          className="datagrid"
          rows={inventariado}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[5]}
          //disableColumnFilter
          disableColumnSelector
          //disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          {...inventariado}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}

          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>

  );
};

export default TablaReporte_Invet;
