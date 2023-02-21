import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./editarinventariado.scss"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'
import { DB_URL } from '../../../../../config/config';
import Edit_Bienes_cont from './Edit_Bienes_cont';
import EditFilterDescBien from './EditFilterDescBien';

const URI = DB_URL + 'invetinicial/'



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

const EditInventariado_cont = () => {
    const [idBienes, setIdBienes] = useState('')
    const [cuenta, setCuenta] = useState('')
    const [cantidad_inicial, setCantidadInicial] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [precio, setPrecio] = useState('')
    const [fecha_registro, setFechaRegistro] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateeInventariado = async (e) => {
        e.preventDefault()
        try {
            const respon = await axios.put(URI + id, {
                idBienes: idBienes,
                cuenta: cuenta,
                cantidad_inicial: cantidad_inicial,
                cantidad: cantidad,
                precio: precio,
                fecha_registro: fecha_registro,

            })
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Editado con Exito..',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/reporte-inventariado')

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


    const getInventariadoId = async () => {
        const resb = await axios.get(URI + id,)
        setIdBienes(resb.data.idBienes)
        setCuenta(resb.data.cuenta)
        setCantidadInicial(resb.data.cantidad_inicial)
        setCantidad(resb.data.cantidad)
        setPrecio(resb.data.precio)
        setFechaRegistro(resb.data.fecha_registro)

    }
    useEffect(() => {
        getInventariadoId()
    }, [])

    return (
        <>
            <div className='Edit_inventariado'>
                <div className="top">
                    <h1>Editar Inventariado : {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updateeInventariado}>
                            <div className="formInput" >
                                <label htmlFor='residente'>BIENES</label>
                                <input
                                    id='residente'
                                    type="text"
                                    list="dataBB"
                                    placeholder=''
                                    value={idBienes}
                                    name='idBienes'
                                    onChange={(e) => setIdBienes(e.target.value)}
                                    required
                                />
                                <Edit_Bienes_cont />
                            </div>
                            <div className="formInput" >
                                <label htmlFor='residente'>DESCRIPCION DE BIENES</label>

                                <select
                                    disabled
                                    type="text"
                                    className='selecunidad'
                                    placeholder='Select'
                                    name='idBienes'
                                    value={idBienes}
                                    onChange={(e) => setIdBienes(e.target.value)}
                                >
                                    <option value=""> </option>
                                    <EditFilterDescBien />
                                </select>

                            </div>

                            <div className="formInput" >
                                <label>CUENTA CONTABLE</label>
                                <input
                                    value={cuenta}
                                    name='cuenta'
                                    onChange={(e) => setCuenta(e.target.value)}
                                    type="number"
                                    placeholder=''
                                    required
                                //pattern="[A-Z-0-9]+"
                                />

                            </div>
                            <div className="formInput" >

                                <label>CANTIDAD INICIAL</label>
                                <input

                                    value={cantidad_inicial}
                                    name='cantidad_inicial'
                                    onChange={(e) => setCantidadInicial(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    required


                                />
                            </div>
                            <div className="formInput" >

                                <label>STOCK</label>
                                <input
                                    value={cantidad}
                                    name='cantidad'
                                    onChange={(e) => setCantidad(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    required


                                />
                            </div>
                            <div className="formInput" >

                                <label>PRECIO</label>
                                <input

                                    value={precio}
                                    name='precio'
                                    onChange={(e) => setPrecio(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    required


                                />
                            </div>

                            <div className="formInput" >

                                <label>FECHA REGISTRO</label>
                                <input

                                    value={fecha_registro}
                                    name='fecha_registro'
                                    onChange={(e) => setFechaRegistro(e.target.value)}
                                    type="number"
                                    placeholder="YYYY"
                                    min="1999" max="2030"
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
export default EditInventariado_cont;