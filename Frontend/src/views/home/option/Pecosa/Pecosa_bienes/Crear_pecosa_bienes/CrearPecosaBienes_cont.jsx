import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./crearpecosabienes.scss"

const URI = 'http://localhost:8000/pecosabienes/'

const URI1 = 'http://localhost:8000/pecosapedidos/'

const URI2 = 'http://localhost:8000/invetinicial/'

const URI3 = 'http://localhost:8000/neasbienes/'

const CrearPecosaBienes_cont = () => {
    const [pecosapedidos, setPecosaPedidos] = useState([])
    const [fecha, setFecha] = useState([])

    const [bienes, setBienes] = useState([])
    const [neasbien, setNeasdBieneId] = useState([])

    const getPecosaPedidos = async () => {
        const res = await axios.get(URI1)
        setPecosaPedidos(res.data)
    }
    const [cantInv, setCantInv] = useState('')

    const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data)
    }
    const getNeasBien = async () => {
        const res = await axios.get(URI3)
        setNeasdBieneId(res.data)
    }
    useEffect(() => {
        getPecosaPedidos()
        getBienes()
        getNeasBien()
    }, [])

    const navigate = useNavigate()
    const [detailsspecosabienes, setDetaillsPecosaBienes] = useState([{
        pecosaPedidoId: "",
        inventaridoInicialId: "",
        nea_bien_id: "",
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
        for (let i = 0; i < detailsspecosabienes.length; i++) {
            const respon = await axios.post(URI, {
                pecosaPedidoId: pecosaPedidoId,
                inventaridoInicialId: detailsspecosabienes[i].inventaridoInicialId || null,
                nea_bien_id: detailsspecosabienes[i].nea_bien_id || null,
                cantidad: detailsspecosabienes[i].cantidad,
                observaciones: detailsspecosabienes[i].observaciones || detailsspecosabienes[i].nea_bien.neaEntradaId,
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
    }
    const handleAdd = () => {
        setDetaillsPecosaBienes([...detailsspecosabienes, {
            pecosaPedidoId: "",
            inventaridoInicialId: "",
            nea_bien_id: "",
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
                                                <datalist id="bienesp">
                                                    {
                                                        bienes
                                                            .map(res => {
                                                                return (
                                                                    <option key={res.id} value={res.id}> {res.descripcion} </option>
                                                                )
                                                            })
                                                    }

                                                </datalist>
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
                                                <datalist id="bienesn">
                                                    {
                                                        neasbien
                                                            .map(res => {
                                                                return (
                                                                    <option key={res.id} value={res.id}> NEA {res.id} - {res.descripcion} </option>
                                                                )
                                                            })
                                                    }

                                                </datalist>
                                            </div>

                                            <div className='formInput_title'>
                                                <h4>Sección de Ingresar cantidad y observación</h4>
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