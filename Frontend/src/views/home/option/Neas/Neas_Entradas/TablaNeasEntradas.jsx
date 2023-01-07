import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataNeasEntradas";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./TablaNeasEntradas.scss"


const URI = 'http://localhost:8000/neasentradas/'


const TablaNeasEntradas = () => {

    const [neasentradas, setNeasEntradas] = useState([])
    useEffect(() => {
        getNeasEntradas()
    }, [])

    const getNeasEntradas = async () => {
        const res = await axios.get(URI)
        setNeasEntradas(res.data.reverse())
        console.log(res.data.id)
    }


    const deleteNeasEntradas = async (id) => {
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
                getNeasEntradas(res.data)
      
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
                                onClick={() => deleteNeasEntradas(params.id)}
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

            <div className="Tabledata_neas_entradas">
                
                <div className="top">
                    <h1>Inventario de Neas de Oficina  de abastecimiento</h1>
                </div>

                <div className="Tabledata">
                    <div className="dataTitle">
                        Inventario Oficina de de abastecimiento
                        <Link to={'created-neas-entrada'}>
                            <div className="CrearButton">
                                <button className="crear_bienes" >Crear</button>
                            </div>
                        </Link>
                    </div>

                    <DataGrid
                        className="datagrid"
                        rows={neasentradas}
                        //getRowId={(row) => (row.id, row.neaEntradaId, row.bineneId)}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={18}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                        SortbyDESC
                        experimentalFeatures={{ newEditingApi: true }}

                        //checkboxSelection
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

export default TablaNeasEntradas