import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./editarinventariado.scss"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'


const URI = 'http://localhost:8000/invetinicial/'

const EditInventariado_cont = () => {
    const [item, setItem] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [cuenta, setCuenta] = useState('')
    const [unidad, setUnidad] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [precio, setPrecio] = useState('')
    const [fecha_registro, setFechaRegistro] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateeInventariado = async (e) => {
        e.preventDefault()
        const respon = await axios.put(URI + id, {
            item: item,
            descripcion: descripcion,
            cuenta: cuenta,
            unidad: unidad,
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

        } else {
            Swal.fire(
                {
                    title: 'Error!',
                    icon: 'error',
                    timer: 5500
                }
            )
        }



    }


    const getInventariadoId = async () => {
        const resb = await axios.get(URI + id,)
        setItem(resb.data.item)
        setDescripcion(resb.data.descripcion)
        setCuenta(resb.data.cuenta)
        setCantidad(resb.data.cantidad)
        setPrecio(resb.data.precio)
        setUnidad(resb.data.unidad)
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

                                <label>ITEM</label>
                                <input

                                    value={item}
                                    name='item'
                                    onChange={(e) => setItem(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    required


                                />
                            </div>
                            <div className="formInput" >
                                <label>DESCRIPCION</label>
                                <input
                                    value={descripcion}
                                    name='descripcion'
                                    onChange={(e) => setDescripcion(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=''
                                    required
                                //pattern="[A-Z-0-9]+"
                                />

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
                                <label>U. DE MEDIDA</label>
                                <Select
                                    name='unidad'
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    className="selecunidad"
                                    value={unidad}
                                    label="Medida"
                                    onChange={(e) => setUnidad(e.target.value.toUpperCase())}
                                    placeholder=""
                                    required
                                >
                                    <MenuItem value="KILOGRAMO">KILOGRAMO</MenuItem>
                                    <MenuItem value="METRO">METRO</MenuItem>
                                    <MenuItem value="GALON">GALON</MenuItem>
                                    <MenuItem value="PLANCHA">PLANCHA</MenuItem>

                                </Select>
                            </div>

                            <div className="formInput" >

                                <label>CANTIDAD</label>
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
                                    type="date"
                                    placeholder=""
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