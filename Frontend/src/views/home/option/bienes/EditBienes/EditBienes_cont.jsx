import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Layout from "../../../Layout";
import "./editbienes.scss"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'


const URI = 'http://localhost:8000/bienes/'

const EditBienes_cont = () => {
    const [item, setItem] = useState('')
    const [description, setDescription] = useState('')
    const [unidad_de_medida, setUnidadDeMedida] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateeBienes = async (e) => {
        e.preventDefault()
        const respon = await axios.put(URI + id, {
            item: item,
            description: description,
            unidad_de_medida: unidad_de_medida
        })
        if (respon.status === 200) {
            Swal.fire(
                {
                    title: 'Creado con Exito..',
                    icon: 'success',
                    timer: 5500
                }
            )
            navigate('/bienes')

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


    const getBienesId = async () => {
        const resb = await axios.get(URI + id,)
        setItem(resb.data.item)
        setDescription(resb.data.description)
        setUnidadDeMedida(resb.data.unidad_de_medida)
        console.log(resb)
    }
    useEffect(() => {
        getBienesId()
    }, [])

    return (
        <>
            <div className='cont_edit'>
                <div className="top">
                    <h1>Editar un Bien o Producto : {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updateeBienes}>
                            <div className="formInput" >
                                <label htmlFor='item'>CODIGO</label>
                                <input
                                    label='CODIGO'
                                    id='item'
                                    value={item}
                                    onChange={(e) => setItem(e.target.value)}
                                    type="number"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div className="formInput" >
                                <label htmlFor='description'>DESCRIPCION</label>
                                <input
                                    id='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div className="formInput" >
                                <label htmlFor='unidad_de_medida'>U. DE MEDIDA</label>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="unidad_de_medida"
                                    className="selecunidad"
                                    //labelId="demo-simple-select-label"
                                    //id="demo-simple-select"
                                    value={unidad_de_medida}
                                    //label="Medida"
                                    onChange={(e) => setUnidadDeMedida(e.target.value)}
                                    required
                                >
                                    <MenuItem value="KILOGRAMO">KILOGRAMO</MenuItem>
                                    <MenuItem value="METRO">METRO</MenuItem>
                                    <MenuItem value="GALON">GALON</MenuItem>
                                    <MenuItem value="PLANCHA">PLANCHA</MenuItem>

                                </Select>
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
export default EditBienes_cont;