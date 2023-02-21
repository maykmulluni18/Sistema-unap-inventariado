import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./crearpecosabienes.scss"
import { DB_URL } from '../../../../../../config/config';
import { Filter_Obs_Nea } from './filter_obs';
import FilterInventariado from './FilterInventariado';
import FilterNeasBien from './FilterNeasBien';
import { FilterNea_des } from './FilterNea_des';
import { FilterInventario_des } from './FilterInventario_des';

const URI = DB_URL + 'pecosabienes/'

const URI1 = DB_URL + 'pecosapedidos/'

const URI2 = DB_URL + 'invetinicial/'

const URI3 = DB_URL + 'neasbienes/'

const CrearPecosaBienes_cont = () => {
    const [pecosapedidos, setPecosaPedidos] = useState([])
    const [fecha, setFecha] = useState([])

    const [bienes, setBienes] = useState([])
    const [neasbien, setNeasdBieneId] = useState([])

    const [error, setError] = useState(false)


    const getPecosaPedidos = async () => {
        const res = await axios.get(URI1)
        setPecosaPedidos(res.data.reverse())
    }
    const [cantInv, setCantInv] = useState('')

    const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data.reverse())
    }
    const getNeasBien = async () => {
        const res = await axios.get(URI3)
        setNeasdBieneId(res.data.reverse())
    }
    useEffect(() => {
        getPecosaPedidos()
        //getBienes()
        //getNeasBien()
    }, [])

    const navigate = useNavigate()
    const [detailsspecosabienes, setDetaillsPecosaBienes] = useState([{
        pecosaPedidoId: "",
        inventaridoInicialId: "",
        nea_bien_id: "",
        descripcion: "",
        cantidad: "",
        observaciones: "INVENTARIADO",
        fecha: "",

    }])
    const handleSubmit = (event, index) => {
        const { name, value } = event.target
        const list = [...detailsspecosabienes]
        list[index][name] = value
        setDetaillsPecosaBienes(list)
    }
    const [pecosaPedidoId, setPecosaPedidosId] = useState('')
    const Pecosa_Bien = async (e) => {

        e.preventDefault();
        try {
            for (let i = 0; i < detailsspecosabienes.length; i++) {
                const respon = await axios.post(URI, {
                    pecosaPedidoId: pecosaPedidoId,
                    inventaridoInicialId: detailsspecosabienes[i].inventaridoInicialId || null,
                    nea_bien_id: detailsspecosabienes[i].nea_bien_id || null,
                    descripcion: detailsspecosabienes[i].descripcion || null,
                    cantidad: detailsspecosabienes[i].cantidad,
                    observaciones: detailsspecosabienes[i].observaciones,
                    fecha: fecha,
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
        } catch (error) {
            console.log(error.response.status)
            setError(error.response.data.message)
            if (error.response.status == 500) {
                Swal.fire(
                    {
                        title: 'Error',
                        text: error.response.data.message,
                        icon: 'error',
                        timer: 8500
                    }
                )
            }
            if (error.response.status === 400 || error.response.status === 404) {
                Swal.fire(
                    {
                        title: error.response.data.message,
                        icon: 'warning',
                        timer: 8500
                    }
                )

            }
            if (error.response.status === 401) {
                Swal.fire(
                    {
                        title: 'Campo [ Cantidad ]',
                        text: error.response.data.message,
                        icon: 'warning',
                        timer: 8500
                    }
                )
            }
        }
    }
    const handleAdd = () => {
        setDetaillsPecosaBienes([...detailsspecosabienes, {
            pecosaPedidoId: "",
            inventaridoInicialId: "",
            nea_bien_id: "",
            descripcion: "",
            cantidad: "",
            p_unitario: "",
            cuenta_contable: "",
            observaciones: "INVENTARIADO",
            fecha: "",

        }])
    }

    const handleRemove = (item) => {
        const list = [...detailsspecosabienes]
        list.splice(item, 1)
        setDetaillsPecosaBienes(list)
    }
    return (
        <>
            <div className='crear_pecosa_bienes'>
                <div className="top">
                    <h1>Crear Bienes de la Pecosa</h1>
                </div>

                <div className="cont_form_bienes">
                    <div className="right">

                        <form onSubmit={Pecosa_Bien}>
                            {/*  <p>EL error es: {error}</p>*/}
                            {
                                detailsspecosabienes.map((value_cont, index) => (
                                    <div key={index} className='gen_fromImput'>
                                        <div className='prin_formImput'>



                                            <div className='formInput_pecosa'>
                                                <label>Pecosa</label>
                                                <input
                                                    type="text"
                                                    list="datap"
                                                    placeholder='FILTRAR PEDIDO DE PECOSA '
                                                    name='pecosaPedidoId'
                                                    value={pecosaPedidoId}
                                                    onChange={(e) => setPecosaPedidosId(e.target.value)}
                                                    required
                                                />
                                                <datalist className='datalistt' id="datap">
                                                    {
                                                        pecosapedidos
                                                            .map(res => {
                                                                return (
                                                                    <option className='options' key={'NEA' + res.id} placeholder='ID' value={res.id}> PECOSA {res.id} ----- {res.fecha}</option>
                                                                )
                                                            })
                                                    }
                                                </datalist>
                                            </div>
                                            <div className='formInput_title'>
                                                <h4>Sección de Elegir Bienes de  Inventariado o de Neas (OJO SELECCIONE SOLO UNO)</h4>
                                            </div>
                                            <div className='formInput'>
                                                <label>Bienes de Inventariado Inicial </label>

                                                <input
                                                    type="text" list="bienesp"
                                                    placeholder=''
                                                    name='inventaridoInicialId'
                                                    value={value_cont.inventaridoInicialId}
                                                    onChange={(e) => handleSubmit(e, index)}

                                                />
                                                <FilterInventariado />
                                            </div>



                                            <div className='formInput'>
                                                <label>Bienes de Neas</label>

                                                <input
                                                    type="text" list="bienesn"
                                                    placeholder=''
                                                    name='nea_bien_id'
                                                    value={value_cont.nea_bien_id}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                />
                                                <FilterNeasBien />
                                            </div>
                                            <div className="formInput" >
                                                <label htmlFor='residente'>DESCRIPCION DE BIENES DE INVENTARIADO</label>

                                                <select
                                                    disabled
                                                    type="text"
                                                    //className='selecunidad'
                                                    placeholder='Select'
                                                    name='inventaridoInicialId'
                                                    value={value_cont.inventaridoInicialId}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                >
                                                    <option value=""> </option>
                                                    <FilterInventario_des />
                                                </select>
                                            </div>
                                            <div className="formInput" >
                                                <label htmlFor='residente'>DESCRIPCION DE BIENES DE NEAS</label>

                                                <select
                                                    disabled
                                                    type="text"
                                                    placeholder='Select'
                                                    name='nea_bien_id'
                                                    value={value_cont.nea_bien_id}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                >
                                                    <option value=""> </option>
                                                    <FilterNea_des />
                                                </select>
                                            </div>
                                            <div className='formInput'>
                                                <label>AGREGAR DESCRIPCION </label>
                                                <input
                                                    name='descripcion'
                                                    value={value_cont.descripcion}
                                                    onChange={(e) => handleSubmit(e, index)} 
                                                    type="textera"
                                                    placeholder=''
                                                    //required
                                                />
                                            </div>

                                            <div className='formInput_title'>
                                                <h4>Sección de Ingresar cantidad y observación (Si seleccion los materiales de neas, en observaciones aparecera un texto morado para ingresar el numero de NEA)</h4>
                                            </div>
                                            <div className="formInput" >
                                                <label>Cantidad</label>
                                                <input
                                                    name='cantidad'
                                                    value={value_cont.cantidad}
                                                    onChange={(e) => handleSubmit(e, index)} type="number"
                                                    placeholder=''
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">
                                                <label>Observaciones</label>
                                                <select
                                                    disabled
                                                    type="text"
                                                    placeholder='Select'
                                                    name='nea_bien_id'
                                                    value={value_cont.nea_bien_id}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                >
                                                    <option value="">INVENTARIADO</option>
                                                    <Filter_Obs_Nea />
                                                </select>
                                                <input
                                                    name='observaciones'
                                                    value={value_cont.observaciones.toUpperCase()}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="text"
                                                    placeholder=''
                                                />
                                            </div>
                                            <div className="formInput">
                                                <label>Fecha de Registro</label>
                                                <input
                                                    name='fecha'
                                                    value={fecha}
                                                    onChange={(e) => setFecha(e.target.value)}
                                                    type="date"
                                                    placeholder=''
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">

                                            </div>

                                            <div className="crearButtom_input_a">
                                                {detailsspecosabienes.length - 1 === index && detailsspecosabienes.length < 10 &&
                                                    (
                                                        <button type='button' className="buttonA"
                                                            onClick={handleAdd}
                                                        >
                                                            <span>Agregar</span>
                                                        </button>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="crearButtom_input_b">
                                            {detailsspecosabienes.length > 1 &&
                                                (

                                                    <button type='button' className="buttonR"
                                                        onClick={() => handleRemove(index)}>
                                                        <span>Eliminar</span>
                                                    </button>

                                                )
                                            }
                                        </div>
                                    </div>

                                )
                                )
                            }
                            <div className='crearButtom_B'>
                                <button className='button1' type='submit'>Guardar</button>
                                <Link to={'../'} >
                                    <button className='button2'> Salir</button>
                                </Link>

                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    );
}

export default CrearPecosaBienes_cont;   