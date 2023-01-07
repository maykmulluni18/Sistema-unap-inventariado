import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataPecosaBienes";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./TablaPecosaBienes.scss"


const URI = 'http://localhost:8000/pecosabienes/'


const TablaPecosaBienes = () => {

    const [pecosabienes, setPecosaBienes] = useState([])
    useEffect(() => {
        getPecosaBienes()
    }, [])

    const getPecosaBienes = async () => {
        const res = await axios.get(URI)
        setPecosaBienes(res.data.reverse())
    }


    const deletePecosaBienes = async (id) => {
            Swal.fire({
              title: 'Esta Seguro que Desea Eliminar?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#160a3d',
              cancelButtonColor: '#3d0a0a',
              confirmButtonText: 'Si, Eliminar!',
              cancelButtonText: 'No, Canselar',
              timer: 15500
            }).then( async (result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: 'Eliminado!',
                  icon: 'success',
                  timer: 5500
                })
                const res = await axios.delete(`${URI}${id}`)
                getPecosaBienes(res.data)

              }
            })
          
    }


    const actionColumn = [
        {
            field: "opciones",
            headerName: "Opciones",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction">

                        <Link to={`edit/${params.id}`}>

                            <div className="EditButton">
                                <EditIcon />
                            </div>
                        </Link>


                        <div className="cellAction">

                            <div
                                className="deleteButton"
                                onClick={() => deletePecosaBienes(params.id)}
                            >
                                <DeleteIcon />
                            </div>

                        </div>
                    </div>
                );
            },

        },
    ];


    return (
        <>

            <div className="Tabledata_pecosa_bienes">
                <div className="top">
                    <h1>Añadir bienes a la Pecosas de la Oficina  de abastecimiento</h1>
                </div>
                <div className="Tabledata">
                    <div className="dataTitle">
                        Inventario Oficina de de abastecimiento
                        <Link to={'created-pecosa-bienes'}>
                            <div className="CrearButton">
                                <button className='crear_bienes'>Crear</button>
                            </div>
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={pecosabienes}
                        //getRowId={(row) => (row.id, row.neaEntradaId, row.bineneId)}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={18}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        //checkboxSelection
                        {...pecosabienes}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                            toolbar: {
                              showQuickFilter: true,
                              quickFilterProps: { debounceMs: 500 },
                            },
                          }}
                        //experimentalFeatures={{ newEditingApi: true }}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    />
                </div>
            </div>

        </>
    );

};

export default TablaPecosaBienes;
