import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./DataNeasBienes";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./TablaNeasBienes.scss"
import ImportNeasExcel from './importarExcel/ImportNeasExcel';


const URI = 'http://localhost:8000/neasbienes/'


const TablaNeasBienes = () => {

    const [neasbienes, setNeasBienes] = useState([])
    useEffect(() => {
        getNeasBienes()
    }, [])

    const getNeasBienes = async () => {
        const res = await axios.get(URI)
        setNeasBienes(res.data.reverse())
        console.log(res.data.id)
    }


    const deleteNeasBienes = (id) => {

        Swal.fire({
            title: 'Esta Seguro que Desea Eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#160a3d',
            cancelButtonColor: '#3d0a0a',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Canselar',
            timer: 15500
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Eliminado!',
                    icon: 'success',
                    timer: 5500
                })
                const res = await axios.delete(`${URI}${id}`)
                getNeasBienes(res.data)

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
                                onClick={() => deleteNeasBienes(params.id)}
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

            <div className="Tabledata_neas_bienes">
                <div className="top">
                    <h1>Inventario de Neas de Oficina  de abastecimiento</h1>
                </div>
                <div className="top_1">
                    <ImportNeasExcel/>

                </div>
                <div className="Tabledata">
                    <div className="dataTitle">
                        Inventario Oficina de de abastecimiento
                        <Link to={'created-neas-bienes'}>
                            <div className="CrearButton">
                                <button className="crear_bienes">Crear</button>
                            </div>
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={neasbienes}
                        //getRowId={(row) => (row.id, row.neaEntradaId, row.bineneId)}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[10]}
                        checkboxSelection


                        experimentalFeatures={{ newEditingApi: true }}

                        //checkboxSelection
                        {...neasbienes}
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

export default TablaNeasBienes;
