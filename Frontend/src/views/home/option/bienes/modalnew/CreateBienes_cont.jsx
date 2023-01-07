import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./createbienes.scss"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'

const URI = 'http://localhost:8000/bienes/'

const CreatedBienes_cont = () => {
    /*const [bienes, setBienes] = useState([])
    const [item, setItem] = useState('')
    const [description, setDescription] = useState('')
    const [unidad_de_medida, setUnidadDeMedida] = useState('')
    */
    const navigate = useNavigate()
    const [detailss, setDetaills] = useState([{
        item: "",
        description: "",
        unidad_de_medida: "",
    },
    ])
    for (let i = 0; i < detailss.length; i++) {
        console.log(i)
    }
    const handleSubmit = (event, index) => {
        const { name, value } = event.target
        const list = [...detailss]
        list[index][name] = value
        setDetaills(list)

        /*setDetaills((prev) => {
            return { ...prev, [name]: value };
        });*/
    }

    const Bienes = async (event) => {
        event.preventDefault();
        for (let i = 0; i < detailss.length; i++) {
            const respon = await axios.post(URI,
                {
                    item: detailss[i].item,
                    description: detailss[i].description.toUpperCase(),
                    unidad_de_medida: detailss[i].unidad_de_medida,
                },

            )
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Creado con Exito..',
                        // text: 'Presione Clik para cerrar!',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/bienes')
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
        setDetaills([...detailss, {
            item: "",
            description: "",
            unidad_de_medida: "",
        }])
    }

    const handleRemove = (item) => {
        const list = [...detailss]
        list.splice(item, 1)
        setDetaills(list)
    }
    return (
        <div className='cont_crear_bien'>
            <div className="top">
                <h1>Crear un Bien o Producto </h1>
            </div>
            <div className="cont_form_bienes">
                <div className="right">
                    <form onSubmit={Bienes}>
                        {
                            detailss.map((valu_cont, index) => (
                                <div key={index} className="gen_fromImput">
                                    <div className="prin_formImput">
                                        <p>La insercion multiple solo esta permitido 10 de : {index + 1}</p>
                                        <div className="formInput" >

                                            <label htmlFor='item'>CODIGO</label>
                                            <input
                                                id="item"
                                                value={valu_cont.item}
                                                name='item'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder="INGRESE UN CODIGO"
                                                required


                                            />
                                        </div>
                                        <div className="formInput" >
                                            <label htmlFor='description'>DESCRIPCION</label>
                                            <input
                                                id='description'
                                                value={valu_cont.description}
                                                name='description'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="text"
                                                placeholder='INGRESE UNA DESCRIPCIÓN'
                                                required
                                            //pattern="[A-Z-0-9]+"
                                            />

                                        </div>

                                        <div className="formInput" >
                                            <label htmlFor='unidad_de_medida'>U. DE MEDIDA</label>
                                            <Select

                                                name='unidad_de_medida'
                                                labelId="demo-simple-select-autowidth-label"
                                                id="unidad_de_medida"
                                                className="selecunidad"
                                                //labelId="demo-simple-select-label"
                                                //id="demo-simple-select"
                                                value={valu_cont.unidad_de_medida}
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
                                        <div className="crearButtom_input_a">
                                            {detailss.length - 1 === index && detailss.length < 10 &&
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
                                        {detailss.length > 1 &&
                                            (

                                                <button type='button' className="buttonR"
                                                    onClick={() => handleRemove(index)}>
                                                    <span>Remover</span>
                                                </button>

                                            )
                                        }
                                    </div>
                                </div>
                            ))
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
        </div>
    );
}

export default React.memo(CreatedBienes_cont);          