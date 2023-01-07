import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import UNAP from "../UNAP.png";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import "./crearneasbienes.scss"

const URI = 'http://localhost:8000/neasbienes/'

const URI1 = 'http://localhost:8000/neasentradas/'

//const URI2 = 'http://localhost:8000/bienes/'

const CrearNeasBienes_cont = () => {
    const [neasentradas, setNeasEntradas] = useState([])
    //const [bienes, setBienes] = useState([])

    const getNeasEntradas = async () => {
        const res = await axios.get(URI1)
        setNeasEntradas(res.data.reverse())
    }
    /* const getBienes = async () => {
         const res = await axios.get(URI2)
         setBienes(res.data)
     }*/

    useEffect(() => {
        getNeasEntradas()
        // getBienes()
    }, [])


    /*const [neaEntradaId, setNeaEntradaId] = useState('')
    const [bieneId, setBieneId] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [fte_fto, setFteFto] = useState('')
    const [cuenta_contable, setCuentaContable] = useState('')
    const [p_unitario, setPUnitario] = useState('')
    const [fecha, setFecha] = useState('')*/
    const navigate = useNavigate()
    const [detailssneasbienes, setDetaillsNeasBienes] = useState([{
        neaEntradaId: "",
        item: "",
        descripvion: "",
        medida: "",
        cantidad: "",
        fte_fto: "",
        cuenta_contable: "",
        p_unitario: "",
        fecha: "",
    }])
    const handleSubmit = (event, index) => {
        const { name, value } = event.target
        const list = [...detailssneasbienes]
        list[index][name] = value
        setDetaillsNeasBienes(list)
    }
    const [neaEntradaId, setNeaEntradaId] = useState('')
    const Neas_Bienes = async (e) => {
        e.preventDefault();
        for (let i = 0; i < detailssneasbienes.length; i++) {
            const respon = await axios.post(URI, {
                neaEntradaId: neaEntradaId,
                item: detailssneasbienes[i].item,
                descripcion: detailssneasbienes[i].descripcion.toUpperCase(),
                medida: detailssneasbienes[i].medida,
                cantidad: detailssneasbienes[i].cantidad,
                fte_fto: detailssneasbienes[i].fte_fto,
                cuenta_contable: detailssneasbienes[i].cuenta_contable,
                p_unitario: detailssneasbienes[i].p_unitario,
                fecha: detailssneasbienes[i].fecha
            })
            console.log(respon.data)
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Creado con Exito..',
                        // text: 'Presione Clik para cerrar!',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/neas-bienes')

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
        setDetaillsNeasBienes([...detailssneasbienes, {
            neaEntradaId: "",
            item: "",
            descripvion: "",
            medida: "",
            cantidad: "",
            fte_fto: "",
            cuenta_contable: "",
            p_unitario: "",
            fecha: "",

        }])
    }

    const handleRemove = (item) => {
        const list = [...detailssneasbienes]
        list.splice(item, 1)
        setDetaillsNeasBienes(list)
    }

    return (
        <>
            <div className='cont_crear_neas_bienes'>
                <div className="top">
                    <h1>Crear Bienes de las Neas</h1>
                </div>
                <div className="cont_form_bienes">
                    <div className="right">
                        <form onSubmit={Neas_Bienes}>
                            {
                                detailssneasbienes.map((value_cont, index) => (
                                    <div key={index} className='gen_fromImput'>
                                        <div className='prin_formImput'>
                                            <div className='formInput_i'>
                                                <label>Neas</label>

                                                <input
                                                    type="text"
                                                    list="data1"
                                                    placeholder='filtrar'
                                                    name='neaEntradaId'
                                                    value={neaEntradaId}
                                                    onChange={(e) => setNeaEntradaId(e.target.value, index)}
                                                    required
                                                />
                                                <datalist className='datalistt' id="data1">
                                                    {
                                                        neasentradas
                                                        .reverse()
                                                            .map(res => {
                                                                return (
                                                                    <option className='options' key={res.id} value={res.id}> NEA {res.id} : {res.fecha_de_registro} {res.neaEntradaId}</option>
                                                                )
                                                            })
                                                    }
                                                </datalist>
                                            </div>

                                            <div className='formInput_i'>
                                                <h1>Parte del Contenido de Bienes: </h1>

                                            </div>

                                            <div className="formInput" >

                                                <label>Cantidad</label>
                                                <input
                                                    name='cantidad'
                                                    value={value_cont.cantidad}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="formInput" >
                                                <label>Item</label>
                                                <input
                                                    name='item'
                                                    value={value_cont.item}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="formInput" >
                                                <label>Descripcion</label>
                                                <input
                                                    name='descripcion'
                                                    value={value_cont.descripcion}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="text"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="formInput" >
                                                <label htmlFor='unidad_de_medida'>U. DE MEDIDA</label>
                                                <Select

                                                    name='medida'
                                                    labelId="demo-simple-select-autowidth-label"
                                                    id="unidad_de_medida"
                                                    className="selecunidad"
                                                    //labelId="demo-simple-select-label"
                                                    //id="demo-simple-select"
                                                    value={value_cont.medida}
                                                    label="Medida"
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    placeholder="INGRESE UNA MEDIDA"
                                                    required
                                                >
                                                    <MenuItem value="KILOGRAMO">KILOGRAMO</MenuItem>
                                                    <MenuItem value="METRO">METRO</MenuItem>
                                                    <MenuItem value="GALON">GALON</MenuItem>
                                                    <MenuItem value="PLANCHA">PLANCHA</MenuItem>

                                                </Select>
                                            </div>

                                            <div className="formInput" >
                                                <label>Fte/Fto</label>
                                                <input
                                                    name='fte_fto'
                                                    value={value_cont.fte_fto}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">
                                                <label>Cuenta Contable</label>
                                                <input
                                                    name='cuenta_contable'
                                                    value={value_cont.cuenta_contable}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">
                                                <label>PRECIO UNITARIO</label>
                                                <input
                                                    name='p_unitario'
                                                    value={value_cont.p_unitario}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">
                                                <label>FECHA DE REGISTRO</label>
                                                <input
                                                    name='fecha'
                                                    value={value_cont.fecha}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="date"
                                                    required
                                                />
                                            </div>
                                            <div className="formInput">

                                            </div>

                                            <div className="crearButtom_input_a">
                                                {detailssneasbienes.length - 1 === index && detailssneasbienes.length < 10 &&
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
                                            {detailssneasbienes.length > 1 &&
                                                (

                                                    <button type='button' className="buttonR"
                                                        onClick={() => handleRemove(index)}>
                                                        <span>Eliminar</span>
                                                    </button>

                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }

                            <div className='crearButtom_B'>
                                <button className='button1' type='submit'>Guardar</button>
                                <Link to={'../../neas-bienes'} className='butoon_2' >
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

export default CrearNeasBienes_cont;