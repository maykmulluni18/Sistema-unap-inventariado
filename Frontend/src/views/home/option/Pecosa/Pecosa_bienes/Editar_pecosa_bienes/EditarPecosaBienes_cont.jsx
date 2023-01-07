import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from "../../../../Layout";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./editarpecosabienes.scss"

const URI = 'http://localhost:8000/pecosabienes/'

const URI1 = 'http://localhost:8000/pecosapedidos/'

const URI2 = 'http://localhost:8000/invetinicial/'

const EditarPecosaBienes_cont = () => {
    const [pecosapedidos, setPecosaPedidos] = useState([])
    const [bienes, setBienes] = useState([])

    const getPecosaPedidos = async () => {
        const res = await axios.get(URI1)
        setPecosaPedidos(res.data)
    }
    const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data)
    }

    useEffect(() => {
        getPecosaPedidos()
        getBienes()
        getPecosaBienes()
        updatePecosaBienes()
    }, [])

    const [pecosaPedidoId, setPecosaPedidoId] = useState('')
    const [inventaridoInicialId, setInventariadoInicialId] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [observaciones, set_Observaciones] = useState('')
    const [fecha, setFecha] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    const [cantidadi, setCantidadI] = useState('')

    const updatePecosaBienes = async (e) => {
        e.preventDefault();
        const respon = await axios.put(URI+id, {
            pecosaPedidoId: pecosaPedidoId,
            inventaridoInicialId: inventaridoInicialId,
            cantidad:cantidad,
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

        axios.put(URI2,{
            cantidadi: cantidad - setCantidad(e.target.value)
        })

    }

    const getPecosaBienes = async () => {
        const res = await axios.get(URI + id,)
        setPecosaPedidoId(res.data.pecosaPedidoId)
        setInventariadoInicialId(res.data.inventaridoInicialId)
        setCantidad(res.data.cantidad)
        set_Observaciones(res.data.observaciones)
        setFecha(res.data.fecha)
    }

    return (
        <>
            <div className='editarpecosabienes'>
                <div className="top">
                    <h1>Crear Bienes de la Pecosa: {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updatePecosaBienes}>
                            <div className='formInput'>
                                <label>Pecosa</label>
                                <input
                                    type="text"
                                    list="datap"
                                    placeholder='filtrar'
                                    value={pecosaPedidoId}
                                    onChange={(e) => setPecosaPedidoId(e.target.value)}
                                    required
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
                            <div className='formInput'>
                                <label>Bienes </label>

                                <input
                                    type="text" list="bienesp"
                                    placeholder='filtrar'
                                    value={inventaridoInicialId}
                                    onChange={(e) => setInventariadoInicialId(e.target.value)}
                                    required
                                />
                                <datalist id="bienesp">
                                    {
                                        bienes
                                            .map(res => {
                                                return (
                                                    <option key={res.id} value={res.id}> {res.description} </option>
                                                )
                                            })
                                    }

                                </datalist>
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