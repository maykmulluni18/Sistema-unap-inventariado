import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from "../../../../Layout";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./editarpecosabienes.scss"
import { DB_URL } from '../../../../../../config/config';
import { getGridNumericColumnOperators } from '@mui/x-data-grid';

const URI = DB_URL + 'pecosabienes/'

const URI1 = DB_URL + 'pecosapedidos/'

const URI2 = DB_URL + 'invetinicial/'

const URI3 = DB_URL + 'neasbienes/'

const EditarPecosaBienes_cont = () => {
    const [pecosapedidos, setPecosaPedidos] = useState([])
    const [bienes, setBienes] = useState([])
    const [neasbien, setNeasdBieneIdd] = useState([])

    const getPecosaPedidos = async () => {
        const res = await axios.get(URI1)
        setPecosaPedidos(res.data)
    }
    const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data)
    }
    const getNeasBien = async () => {
        const res = await axios.get(URI3)
        setNeasdBieneIdd(res.data)
    }

    useEffect(() => {
        getPecosaPedidos()
        getNeasBien()
        getBienes()
        getPecosaBienes()
        updatePecosaBienes()

    }, [])

    const [pecosaPedidoId, setPecosaPedidoId] = useState('')
    const [inventaridoInicialId, setInventariadoInicialId] = useState('')
    const [nea_bien_id, setNeasdBieneId] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [observaciones, set_Observaciones] = useState('')
    const [fecha, setFecha] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    const [cantidadi, setCantidadI] = useState('')

    const updatePecosaBienes = async (e) => {
        e.preventDefault();
        const respon = await axios.put(URI + id, {
            pecosaPedidoId: pecosaPedidoId,
            inventaridoInicialId: inventaridoInicialId || null,
            nea_bien_id: nea_bien_id || null,
            cantidad: cantidad,
            observaciones: observaciones,
            fecha: fecha
        })
        if (respon.status === 200) {
            Swal.fire(
                {
                    title: 'Creado con Exito..',
                    // text: 'Presione Clik para cerrar!',
                    icon: 'success',
                    timer: 5500
                }
            )
            navigate('/pecosa-bienes')

        } else {
            Swal.fire(
                {
                    title: 'Error!',
                    // text: 'Presione Clik para cerrar!',
                    icon: 'error',
                    timer: 5500
                }
            )
        }
    }

    const getPecosaBienes = async () => {
        const res = await axios.get(URI + id,)
        setPecosaPedidoId(res.data.pecosaPedidoId)
        setInventariadoInicialId(res.data.inventaridoInicialId)
        setNeasdBieneId(res.data.nea_bien_id)
        setCantidad(res.data.cantidad)
        set_Observaciones(res.data.observaciones)
        setFecha(res.data.fecha)
    }

    return (
        <>
            <div className='editarpecosabienes'>
                <div className="top">
                    <h1>Editar Bienes de la Pecosa: {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updatePecosaBienes}>
                            <div className='formInput_pecosa'>
                                <label>Pecosa</label>
                                <input
                                    type="text"
                                    list="datap"
                                    placeholder='filtrar'
                                    value={pecosaPedidoId}
                                    onChange={(e) => setPecosaPedidoId(e.target.value)}

                                />
                                <datalist className='datalistt' id="datap">
                                    {
                                        pecosapedidos
                                            .map(res => {
                                                return (
                                                    <option className='options' key={res.id} value={res.id}>{res.dependencias}  {res.fecha}</option>
                                                )
                                            })
                                    }
                                </datalist>
                            </div>
                            <div className='formInput_title'>
                                <h4>Sección de Elegir Bienes de  Inventariado o de Neas (OJO SELECCIONE SOLO UNO)</h4>
                            </div>
                            <div className='formInput'>
                                <label>Bienes Inventariado </label>

                                <input
                                    type="text" list="bienesinv"
                                    placeholder='filtrar'
                                    value={inventaridoInicialId}
                                    onChange={(e) => setInventariadoInicialId(e.target.value)}
                                    
                                />
                                <datalist id="bienesinv">
                                    {
                                        bienes
                                            .map(res => {
                                                return (
                                                    <option key={res.id} value={res.id}> [ N°: {res.id} ] -- [ {res.descripcion} ] -- [ Stock = {res.cantidad} ] </option>
                                                )
                                            })
                                    }

                                </datalist>
                            </div>
                            <div className='formInput'>
                                <label>Bienes Neas </label>

                                <input
                                    type="text" list="bienesnea"
                                    placeholder='filtrar'
                                    value={nea_bien_id}
                                    onChange={(e) => setNeasdBieneId(e.target.value)}
                                    

                                />

                                <datalist id="bienesnea">
                                    {
                                        neasbien
                                            .map(res => {
                                                return (
                                                    <option key={res.id} value={res.id}> [N° NEA: {res.neaEntradaId}] -- [ {res.descripcion}] -- [ Stock: {res.cantidad} ]</option>
                                                )
                                            })
                                    }

                                </datalist>
                            </div>
                            <div className='formInput_title'>
                                <h4>Sección de Ingresar cantidad y observación</h4>
                            </div>
                            
                            <div className="formInput">
                                <label>Observaciones</label>
                                <input
                                    value={observaciones}
                                    onChange={(e) => set_Observaciones(e.target.value.toUpperCase())}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="formInput">
                                <label>Cantidad</label>
                                <input
                                    value={cantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                    type="number"
                                    required
                                    
                                />
                            </div>
                            <div className="formInput">
                                <label>Fecha de Registro</label>
                                <input
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                    type="date"
                                    required
                                />
                            </div>
                            <div className='crearButtom_B'>
                                <button className='button1' type='submit'>Guardar</button>
                                <Link to={'../'} >
                                    <button className='button2'> Salir</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarPecosaBienes_cont;   