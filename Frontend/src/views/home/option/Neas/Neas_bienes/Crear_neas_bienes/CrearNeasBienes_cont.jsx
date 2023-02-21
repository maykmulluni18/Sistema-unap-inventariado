import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import UNAP from "../UNAP.png";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import "./crearneasbienes.scss"
import { DB_URL } from '../../../../../../config/config';
import Bienes_cont from './Bienes_cont';
import FilterDescBien from './FilterDescBien';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const URI = DB_URL + 'neasbienes/'

const URI1 = DB_URL + 'neasentradas/'

//const URI2 = 'http://localhost:8000/bienes/'





const Medida = [
    { id: 1, medida: 'Pulgada cúbica (in³)' },
    { id: 2, medida: 'Pie cúbico(ft³)' },
    { id: 3, medida: 'Metro cúbico(m³)' },
    { id: 4, medida: 'Decámetro(dam)' },
    { id: 5, medida: 'Hectómetro(hm)' },
    { id: 6, medida: 'Decímetro(dm)' },
    { id: 7, medida: 'Centímetro(cm)' },
    { id: 8, medida: 'Milímetro(mm)' },
    { id: 9, medida: 'Micrómetro(µm)' },
    { id: 10, medida: 'Nanómetro(nm)' },
    { id: 11, medida: 'Angstrom(Å)' },
    { id: 12, medida: 'Años luz(ly)' },
    { id: 13, medida: 'Legua(lea)' },
    { id: 14, medida: 'Millas(mi)' },
    { id: 15, medida: 'Kilómetro(km)' },
    { id: 16, medida: 'Metro(m)' },
    { id: 17, medida: 'Yarda(yd)' },
    { id: 18, medida: 'Pie(ft)' },
    { id: 19, medida: 'Pulgada(in)' },
    { id: 20, medida: 'Yarda cúbica (yd³)' },
    { id: 21, medida: 'Litro (L)' },
    { id: 22, medida: 'Metro cúbico (m³)' },
    { id: 23, medida: 'Centímetro cúbico (cm³)' },
    { id: 24, medida: 'Pulgada cúbica (in³)' },
    { id: 25, medida: 'Galón (gal)' },
    { id: 26, medida: 'Pinta (pt)' },
    { id: 27, medida: 'Onza líquida (oz)' },
    { id: 28, medida: 'Barril (bbl)' },
    { id: 29, medida: 'Cucharada (tbsp)' },
    { id: 30, medida: 'Cucharadita (tsp)' },
    { id: 31, medida: 'Pinta estadounidense (US pt)' },
    { id: 32, medida: 'Galón estadounidense (US gal)' },
    { id: 33, medida: 'Bushel (bu)' },
    { id: 34, medida: 'Peck (pk)' },
    { id: 35, medida: 'Cuarto (qt)' },
    { id: 36, medida: 'Decimetro cubico (dm³)' },
    { id: 37, medida: 'Acre-pie (ac-ft)' },
    { id: 38, medida: 'Barril de petróleo (bbl)' },
    { id: 39, medida: 'Centilitro (cl)' },
    { id: 40, medida: 'Decilitro (dl)' },
    { id: 41, medida: 'Hectolitro (hl)' },
    { id: 42, medida: 'Kilolitro (kl)' },
    { id: 43, medida: 'Litro sistema métrico (L)' },
    { id: 44, medida: 'Metro cúbico sistema métrico (m³)' },
    { id: 45, medida: 'Microlitro (µL)' },
    { id: 46, medida: 'Mililitro (mL)' },
    { id: 47, medida: 'Pinta imperial (pt)' },
    { id: 48, medida: 'Pinta estadounidense (US pt)' },
    { id: 49, medida: 'Yarda cúbica (yd³)' },
    { id: 50, medida: 'Kilogramo (kg)' },
    { id: 51, medida: 'Gramo (g)' },
    { id: 52, medida: 'Miligramo (mg)' },
    { id: 53, medida: 'Tonelada (t)' },
    { id: 54, medida: 'Onza (oz)' },
    { id: 55, medida: 'Libra (lb)' },
    { id: 56, medida: 'Tonelada métrica (t)' },
    { id: 57, medida: 'Quintal (q)' },
    { id: 58, medida: 'Stone (st)' },
    { id: 59, medida: 'Libras del sistema inglés (lbs)' },
    { id: 60, medida: 'Onzas del sistema inglés (oz)' },
    { id: 61, medida: 'Toneladas cortas del sistema inglés (short ton)' },
    { id: 62, medida: 'Toneladas largas del sistema inglés (long ton)' },
    { id: 63, medida: 'Microgramo (µg)' },
    { id: 64, medida: 'Nanogramo (ng)' },
    { id: 65, medida: 'Carat (ct)' },
    { id: 66, medida: 'Centigramo (cg)' },
    { id: 67, medida: 'Decigramo (dg)' },
    { id: 68, medida: 'Dekagramo (dag)' },
    { id: 69, medida: 'Hectogramo (hg)' },
    { id: 70, medida: 'Megagramo (Mg)' },
    { id: 71, medida: 'Microgramo (µg)' },
    { id: 72, medida: 'Punto (dwt)' },
    { id: 73, medida: 'Picogramo (pg)' },
    { id: 74, medida: 'Scruple (s.ap)' },
    { id: 75, medida: 'Tola' },
    { id: 76, medida: 'Tonelada corta (t)' },
    { id: 77, medida: 'Tonelada larga (t)' },
    { id: 78, medida: 'Tonelada métrica (t)' },
    { id: 79, medida: 'Tonelada métrica (t)' },
    { id: 80, medida: '' },

];

const CrearNeasBienes_cont = () => {
    const [neasentradas, setNeasEntradas] = useState([])
    // const [bienes, setBienes] = useState([])

    const getNeasEntradas = async () => {
        const res = await axios.get(URI1)
        setNeasEntradas(res.data.reverse())
    }
    // const getBienes = async () => {
    //     const res = await axios.get(URI2)
    //     setBienes(res.data)
    // }

    useEffect(() => {
        getNeasEntradas()
        //getBienes()
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
        cantidad_inicial: "",
        cantidad: "",
        fte_fto: "9",
        cuenta_contable: "1501070203",
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
    const [fecha, setFecha] = useState('')

    const Neas_Bienes = async (e) => {
        e.preventDefault();
        try {
            for (let i = 0; i < detailssneasbienes.length; i++) {
                const respon = await axios.post(URI, {
                    neaEntradaId: neaEntradaId,
                    idBienes: detailssneasbienes[i].idBienes,
                    cantidad_inicial: detailssneasbienes[i].cantidad_inicial,
                    cantidad: detailssneasbienes[i].cantidad,
                    fte_fto: detailssneasbienes[i].fte_fto,
                    cuenta_contable: detailssneasbienes[i].cuenta_contable,
                    p_unitario: detailssneasbienes[i].p_unitario,
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
                    navigate('/neas-bienes')

                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire(
                    {
                        title: 'Error',
                        text: error.response.data.message,
                        icon: 'error',
                        timer: 8500
                    }
                )
            }
        }

    }

    const handleAdd = () => {
        setDetaillsNeasBienes([...detailssneasbienes, {
            neaEntradaId: "",
            idBienes: "",
            cantidad_inicial: "",
            cantidad: "",
            fte_fto: "9",
            cuenta_contable: "1501070203",
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
                                                <label title='neas'>Neas</label>

                                                <input
                                                    type="search"
                                                    list="data1"
                                                    placeholder='filtrar'
                                                    name='neaEntradaId'
                                                    value={neaEntradaId}
                                                    onChange={(e) => setNeaEntradaId(e.target.value, index)}
                                                    required
                                                />
                                                <datalist className='datalistt' title='lista' id="data1">
                                                    {
                                                        neasentradas
                                                            .reverse()
                                                            .map(res => {
                                                                return (
                                                                    <option className='options' title={res.fecha_de_registro} key={res.id} value={res.id}> NEA {res.id} : {res.fecha_de_registro} {res.neaEntradaId}</option>
                                                                )
                                                            })
                                                    }
                                                </datalist>
                                            </div>
                                           {/*  <div className='formInpu_i'>
                                                <Autocomplete
                                                    name='neaEntradaId'
                                                    value={neaEntradaId}
                                                    onChange={(e, index) => setNeaEntradaId(e.target.value, index)}
                                                    id="free-solo-demo"
                                                    freeSolo
                                                    options={neasentradas.map(option => option.fecha_de_registro)}
                                                    getOptionLabel={(option) => option}
                                                    renderInput={(params) => <TextField {...params} label="Fecha de registro" />}
                                                />

                                            </div>*/}
                                            <div className='formInput_i'>
                                                <h1>Parte del Contenido de Bienes: </h1>

                                            </div>
                                            <div className="formInput_i" >
                                                <label htmlFor='residente'>BIENES</label>
                                                <input
                                                    id='residente'
                                                    type="search"
                                                    list="dataBB"
                                                    placeholder=''
                                                    value={value_cont.idBienes}
                                                    name='idBienes'
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    required
                                                />
                                                <Bienes_cont />
                                            </div>
                                            <div className="formInput_i" >
                                                <label htmlFor='residente'>DESCRIPCION DE BIENES</label>

                                                <select
                                                    disabled
                                                    type="text"
                                                    className='selecunidad'
                                                    placeholder='Select'
                                                    name='idBienes'
                                                    value={value_cont.idBienes}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                >
                                                    <option value=""> </option>
                                                    <FilterDescBien />
                                                </select>
                                            </div>
                                            <div className="formInput" >

                                                <label>Cantidad Inicial</label>
                                                <input
                                                    name='cantidad_inicial'
                                                    value={value_cont.cantidad_inicial}
                                                    onChange={(e) => handleSubmit(e, index)}
                                                    type="number"
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                            <div className="formInput" >

                                                <label>Stock</label>
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
                                                    value={fecha}
                                                    onChange={(e) => setFecha(e.target.value, index)}
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