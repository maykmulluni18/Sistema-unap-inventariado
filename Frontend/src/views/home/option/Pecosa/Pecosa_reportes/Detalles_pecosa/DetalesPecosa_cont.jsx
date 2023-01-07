import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./detallesreportespecosa.scss";

const URI = 'http://localhost:8000/pecosapedidos/'

const URI1 = 'http://localhost:8000/pecosabienespedidos/'

const URI2 = 'http://localhost:8000/metas/'


const columnsb = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'U. Medida',
        headerName: 'U. Medida',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.unidad || params.row.nea_bien?.medida }`,
    },
    {
        field: 'Descripcion',
        headerName: 'Descripcion',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 450,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.descripcion || params.row.nea_bien?.descripcion  }`,
    },
    {
        field: 'cuenta_contable',
        headerName: 'Cuenta Contable',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 230,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.cuenta || params.row.nea_bien?.cuenta_contable}`,
    },
    { field: 'cantidad', headerName: 'Cantidad', width: 100 },
    {
        field: 'p_unitario',
        headerName: 'P.Unitario',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 100,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.precio || params.row.nea_bien?.p_unitario}`,
    },
    {
        field: 'P.Total',
        headerName: 'P.Total',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row?.cantidad}` * `${params.row.inventarido_inicial?.precio || params.row.nea_bien?.p_unitario}`,
    },
    { field: 'observaciones', headerName: 'Observaciones', width: 270 },


];


const DetallesPecosa_cont = () => {
    useEffect(() => {
        getPedidosPecosa()
        getPecosaBienes()
    }, [])
    const [dependencias, setDependencias] = useState('')
    const [id_sedes, setIdSedes] = useState('')
    const [fecha, setFecha] = useState('')
    const [almacen, setAlmacen] = useState('')
    const [id_administradores, setIdAdministradores] = useState('')
    const [id_metas, setIdMetas] = useState('')
    const { id } = useParams()




    const getPedidosPecosa = async () => {

        const res = await axios.get(URI + id,)
        setDependencias(res.data.dependencias)
        setIdSedes(res.data.sede.sede)
        setAlmacen(res.data.almacen)
        setFecha(res.data.fecha)
        setIdAdministradores(res.data.usuario.nombres + ' ' +
            res.data.usuario.apellido_paterno + ' ' +
            res.data.usuario.apellido_materno)
        setIdMetas(res.data.Meta.obra + '  => Meta: ' +res.data.Meta.meta_1)    
    }


    const [pecosaPedidoId, setPecosaPedidosId] = useState([])

    const getPecosaBienes = async () => {
        const res = await axios.get(URI1 + id,)
        console.log(res.data)
        setPecosaPedidosId(res.data)
    }


    return (
        <>
            <div className="Tabledata_pecosa_reportes_detalles">
                <div className="top">
                    <h1>Inventario de Pecosas de Oficina  de abastecimiento: {id}</h1>
                    <div className='crearButtom_B'>
                        <Link to={'../'} >
                            <button className='button2'> Salir</button>
                        </Link>
                    </div>
                </div>
                <div className="cont_detalls">
                    <div className='form_cont'>
                        <div className='formInput'>

                            <strong>Dependencias Solicitante: </strong>
                            <input
                                value={dependencias}
                                onChange={(e) => setDependencias(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Solicitante: </strong>
                            <input
                                value={id_administradores}
                                onChange={(e) => setIdAdministradores(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Obra: </strong>
                            <input
                                value={id_metas}
                                onChange={(e) => setIdMetas(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Con Destino a: </strong>
                            <input
                                value={id_sedes}
                                onChange={(e) => setIdSedes(e.target.value)}
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Solicitante Entrgar a: </strong>
                            <input
                                value={almacen}
                                onChange={(e) => setAlmacen(e.target.value)}
                            />
                        </div>
                        <div className='formInput'>

                            <strong>Fecha: </strong>
                            <input
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="Tabledata">
                    <div className="dataTitle">
                        Inventario Oficina de de abastecimiento

                    </div>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={pecosaPedidoId}
                            columns={columnsb}

                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default DetallesPecosa_cont
