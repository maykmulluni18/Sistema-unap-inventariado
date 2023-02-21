import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./crearinventariado.scss"
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'
import { DB_URL } from '../../../../../config/config';
import Bienes_cont from './Bienes_cont';
import  FilterDescBien  from './FilterDescBien';

const URI = DB_URL + 'invetinicial/'
const URI1 = DB_URL + 'bienes/'

const CrearIneventariado_cont = () => {
   {/**  const loadOptions = async (inputValue) => {
        try {
          const response = await axios.get(URI1);
          return response.data.map((item) => ({ value: item.id, label: item.description }));
        } catch (error) {
          console.error(error);
          return [];
        }
      };*/}
    const navigate = useNavigate()

    const [fecha_registro, setFechaRegistro] = useState('')

    const [detailss, setDetaills] = useState([{
        idBienes: "",
        cuenta: "1501070203",
        cantidad_inicial: "",
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
        try {
            for (let i = 0; i < detailss?.length; i++) {
                const respon = await axios.post(URI,
                    {
                        idBienes: detailss[i].idBienes,
                        cuenta: detailss[i].cuenta,
                        cantidad_inicial: detailss[i].cantidad_inicial,
                        cantidad: detailss[i].cantidad,
                        precio: detailss[i].precio,
                        fecha_registro: fecha_registro,

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
        setDetaills([...detailss, {
            idBienes: "",
            cuenta: "",
            cantidad_inicial: "",
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
                                        <div className='formInput'>
                                            <label htmlFor='residente'>BIENES</label>
                                            <input
                                                id='residente'
                                                type="text"
                                                list="dataBB"
                                                placeholder=''
                                                value={valu_cont.idBienes}
                                                name='idBienes'
                                                onChange={(e) => handleSubmit(e, index)}
                                                required
                                            />
                                            <Bienes_cont />
                                        </div>
                                        <div className='formInput'>
                                            <label htmlFor='residente'>DESCRIPCION DE BIENES</label>

                                            <select
                                                disabled
                                                type="text"
                                                className='selecunidad'
                                                placeholder='Select'
                                                name='idBienes'
                                                value={valu_cont.idBienes}
                                                onChange={(e) => handleSubmit(e, index)}
                                            >
                                                <option value=""> </option>
                                                <FilterDescBien />
                                            </select>
                                        </div>


                                        <div className="formInput" >

                                            <label htmlFor='cantidad_inicial'>STOCK</label>
                                            <input
                                                id='cantidad_inicial'
                                                value={valu_cont.cantidad_inicial}
                                                name='cantidad_inicial'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="number"
                                                placeholder=""
                                                required

                                            />
                                        </div>
                                        <div className="formInput" >

                                            <label htmlFor='cantidad'>CANTIDAD INICIAL</label>
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
                                        <div className="formInput_i" >
                                            <label htmlFor='fecha_registro'>FECHA DE REGISTRO</label>
                                            <input
                                                id='fecha_registro'
                                                value={fecha_registro}
                                                name='fecha_registro'
                                                onChange={(e) => setFechaRegistro(e.target.value, index)}
                                                type="number" 
                                                placeholder="YYYY" 
                                                min="1999" max="2030"
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