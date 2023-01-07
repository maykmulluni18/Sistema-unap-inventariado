import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./crearinventariado.scss"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'

const URI = 'http://localhost:8000/invetinicial/'

const CrearIneventariado_cont = () => {
    const navigate = useNavigate()
    const [detailss, setDetaills] = useState([{
        item: "",
        descripcion: "",
        cuenta: "",
        unidad: "",
        cantidad: "",
        precio: "",
        fecha_registro: "",
    },
    ])

    const handleSubmit = (event, index) => {
        const { name, value } = event.target
        const list = [...detailss]
        list[index][name] = value
        setDetaills(list)
    }

    const Inventario = async (event) => {
        event.preventDefault();
        for (let i = 0; i < detailss?.length; i++) {
            const respon = await axios.post(URI,
                {
                    item: detailss[i].item,
                    descripcion: detailss[i].descripcion.toUpperCase(),
                    cuenta: detailss[i].cuenta,
                    unidad: detailss[i].unidad,
                    cantidad: detailss[i].cantidad,
                    precio: detailss[i].precio,
                    fecha_registro: detailss[i].fecha_registro,

                },

            )
            console.log(respon)
            if (respon.status === 200) {
                Swal.fire(
                    {
                        title: 'Creado con Exito..',
                        // text: 'Presione Clik para cerrar!',
                        icon: 'success',
                        timer: 5500
                    }
                )
                navigate('/inventariado-inicial')
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
            descripcion: "",
            cuenta: "",
            unidad: "",
            cantidad: "",
            precio: "",
            fecha_registro: "",
        }])
    }

    const handleRemove = (item) => {
        const list = [...detailss]
        list.splice(item, 1)
        setDetaills(list)
    }
    return (
        <div className='cont_crear_inventariado'>
            <div className="top">
                <h1>Crear un Inventariado Inicial</h1>
            </div>
            <div className="cont_form_bienes">
                <div className="right">
                    <form onSubmit={Inventario}>
                        {
                            detailss.map((valu_cont, index) => (
                                <div key={index} className="gen_fromImput">
                                    <div className="prin_formImput">
                                        <p>La insercion multiple solo esta permitido 10 de : {index + 1}</p>
                                        <div className="formInput" >

                                            <label htmlFor='item'>ITEM</label>
                                            <input
                                                id='item'
                                                value={valu_cont.item}
                                                name='item'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder=""
                                                required


                                            />
                                        </div>
                                        <div className="formInput" >
                                            <label htmlFor='descripcion'>DESCRIPCION</label>
                                            <input
                                                id='descripcion'
                                                value={valu_cont.descripcion}
                                                name='descripcion'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="text"
                                                placeholder=''
                                                required
                                            //pattern="[A-Z-0-9]+"
                                            />

                                        </div>

                                        <div className="formInput" >
                                            <label htmlFor='cuenta'>CUENTA CONTABLE</label>
                                            <input
                                                id='cuenta'
                                                value={valu_cont.cuenta}
                                                name='cuenta'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder=''
                                                required
                                            //pattern="[A-Z-0-9]+"
                                            />

                                        </div>

                                        <div className="formInput" >
                                            <label htmlFor='unidad'>U. DE MEDIDA</label>
                                            <Select
                                                name='unidad'
                                                labelId="demo-simple-select-autowidth-label"
                                                id="unidadA"
                                                className="selecunidad"
                                                value={valu_cont.unidad}
                                                label="Medida"
                                                onChange={(e) => handleSubmit(e, index)}
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

                                            <label htmlFor='cantidad'>CANTIDAD</label>
                                            <input
                                                id='cantidad'
                                                value={valu_cont.cantidad}
                                                name='cantidad'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder=""
                                                required

                                            />
                                        </div>
                                        <div className="formInput" >

                                            <label htmlFor='precio'>PRECIO</label>
                                            <input
                                                id='precio'
                                                value={valu_cont.precio}
                                                name='precio'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder=""
                                                required


                                            />
                                        </div>
                                        <div className="formInput" >
                                            <label htmlFor='fecha_registro'>FECHA DE REGISTRO</label>
                                            <input
                                                id='fecha_registro'
                                                value={valu_cont.fecha_registro}
                                                name='fecha_registro'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="date"
                                                placeholder=''
                                                required
                                            //pattern="[A-Z-0-9]+"
                                            />

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

export default React.memo(CrearIneventariado_cont);              