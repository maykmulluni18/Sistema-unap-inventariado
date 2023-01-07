import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import "./detallesinventariado.scss"

const URI = 'http://localhost:8000/invetinicialfilterdate/'


const columns = [
    { field: 'fecha_registro', headerName: 'Fecha de Registro', width: 120 },
    { field: 'item', headerName: 'ITEM', width: 150 },
    { field: 'descripcion', headerName: 'Descripcion', width: 380 },
    { field: 'cuenta', headerName: 'Cuenta Contable', width: 150 },
    { field: 'unidad', headerName: 'Unidad de Medida', width: 180 },
    { field: 'cantidad', headerName: 'Cantida', width: 150 },
    { field: 'precio', headerName: 'P. Unitario', width: 150 },
    {
        field: 'P. Total',
        headerName: 'Precio Total',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.cantidad}` * `${params.row.precio}`,
    }
];


const DetallesInvetariado_cont = () => {

    useEffect(() => {
        getInventariadoInicial()
    }, [])

    let {fecha_registro}  = useParams()
    console.log(fecha_registro)

    const [invenriadoinicial, setInventariadoInicial] = useState([])
    const getInventariadoInicial = async () => {
        const res = await axios.get(URI + fecha_registro)
        console.log(res.data)
        setInventariadoInicial(res.data.reverse())
    }

    return (
        <>
            <div className="Tabledata_inventario_deatlls">
                <div className="top">
                    <h1>Inventario de Pecosas de Oficina  de abastecimiento: {fecha_registro}</h1>
                    <div className='crearButtom_B'>
                        <Link to={'../'} >
                            <button className='button2'> Salir</button>
                        </Link>
                    </div>
                </div>
                <div className="cont_detalls">
                    <div className='form_cont'>

                        <div className='formInput'>
                            <strong>UNIDAD EJECUTORA: </strong>
                            <p>UNIVERSIDAD NACIONAL DEL ALTIPLANO</p>

                        </div>

                        <div className='formInput'>
                            <strong>ALMACEN: </strong>
                            <p>ALMACEN CENTRAL DE OBRAS</p>
                        </div>
                        <div className='formInput'>
                            <strong>SUB ALMACEN: </strong>
                            <p>ALMACEN CENTRAL DE OBRAS - OBRAS</p>
                        </div>
                    </div>
                </div>
                <div className="Tabledata">
                    <div className="dataTitle">
                        Inventario Oficina de de abastecimiento

                    </div>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={invenriadoinicial}
                            columns={columns}

                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default DetallesInvetariado_cont