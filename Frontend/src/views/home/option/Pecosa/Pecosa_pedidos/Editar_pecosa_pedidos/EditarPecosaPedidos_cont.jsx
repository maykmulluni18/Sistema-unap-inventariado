import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from "../../../../Layout";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./editarpecosapedidos.scss"
import FilterDataEdit from './FilterDataEdit';

const URI = 'http://localhost:8000/pecosapedidos/'

const URI1 = 'http://localhost:8000/metas/'

const URI3 = 'http://localhost:8000/sedes/'


const EditarPecosaPedidos_cont = () => {
    const [sedes, setSedes] = useState([])
    const [metas, setMetas] = useState([])

    const getSedes = async () => {
        const res = await axios.get(URI3)
        setSedes(res.data)
    }


    const getMetas = async () => {
        const res = await axios.get(URI1)
        setMetas(res.data)
    }

    useEffect(() => {
        getSedes()
        getPedidosPecosa()
        getMetas()
    }, [])

    const [dependencias, setDependencias] = useState('')
    const [id_administrativos, setIdAdministrativos] = useState('')
    const [id_sedes, setIdSedes] = useState('')
    const [fecha, setFecha] = useState('')
    const [almacen, setAlmacen] = useState('')
    const [id_metas, setIdMetas] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    const Pecosa_Pedidos_E = async (e) => {
        e.preventDefault();
        const respon = await axios.put(URI + id, {
            dependencias: dependencias,
            id_administrativos: id_administrativos,
            id_sedes: id_sedes,
            id_metas: id_metas,
            fecha: fecha,
            almacen: almacen
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
            navigate('/pecosa-pedidos')
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

    const getPedidosPecosa = async () => {
        const res = await axios.get(URI + id,)
        setDependencias(res.data.dependencias)
        setIdAdministrativos(res.data.id_administrativos)
        setIdSedes(res.data.id_sedes)
        setIdMetas(res.data.id_metas)
        setAlmacen(res.data.almacen)
        setFecha(res.data.fecha)

    }

    return (
        <>
            <div className='editar_pecosa_pedidos'>
                <div className="top">
                    <h1>Editar Pedidos de la Pecosa : {id}</h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={Pecosa_Pedidos_E}>
                            <div className="formInput">
                                <label>Dependencias</label>
                                <input
                                    value={dependencias}
                                    onChange={(e) => setDependencias(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder='INGRESE UNA DEPENDENCIA'
                                    required
                                />
                            </div>
                            <div className='formInput'>
                                <label>Administrativos</label>
                                <input
                                    type="text"
                                    list="datap"
                                    placeholder='FILTRAR ADDMINISTRATIVOS'
                                    value={id_administrativos}
                                    onChange={(e) => setIdAdministrativos(e.target.value)}
                                    required
                                />
                                <FilterDataEdit/>
                            </div>
                            <div className='formInput'>
                                <label>Sedes </label>

                                <input
                                    type="text" list="bienesp"
                                    placeholder='FILTRAR SEDES'
                                    value={id_sedes}
                                    onChange={(e) => setIdSedes(e.target.value)}
                                    required
                                />
                                <datalist id="bienesp">
                                    {
                                        sedes
                                            .map(res => {
                                                return (
                                                    <option key={res.id} value={res.id}> {res.descripcion} - {res.sede}</option>
                                                )
                                            })
                                    }

                                </datalist>
                            </div>
                            <div className='formInput'>
                                <label>Metas Obras </label>

                                <input
                                    type="text" list="metas_d"
                                    placeholder='FILTRAR SEDES'
                                    value={id_metas}
                                    onChange={(e) => setIdMetas(e.target.value)}
                                    required
                                />
                                <datalist id="metas_d">
                                    {
                                        metas
                                            .map(res => {
                                                return (
                                                    <option key={res.id} value={res.id}> {res.meta_1} - {res.obra}</option>
                                                )
                                            })
                                    }

                                </datalist>
                            </div>
                            <div className="formInput" >
                                <label>Almacen</label>
                                <input
                                    value={almacen}
                                    onChange={(e) => setAlmacen(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder='INGRESE UN ALMACEN'
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

export default EditarPecosaPedidos_cont;   