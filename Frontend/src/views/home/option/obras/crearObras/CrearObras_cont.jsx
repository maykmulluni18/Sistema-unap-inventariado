import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./crearobras.scss"
import Swal from 'sweetalert2'

const URI = 'http://localhost:8000/obras/'

const CrearObras_cont = () => {

    const navigate = useNavigate()
    const [detailss, setDetaills] = useState([{
        obras: "",
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

    const Obras = async (event) => {
        event.preventDefault();
        for (let i = 0; i < detailss.length; i++) {
            const respon = await axios.post(URI,
                {
                    obras: detailss[i].obras,
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
                navigate('/obras')
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
            obras: "",
        }])
    }

    const handleRemove = (item) => {
        const list = [...detailss]
        list.splice(item, 1)
        setDetaills(list)
    }
    return (
        <div className='cont_crear_obras'>
            <div className="top">
                <h1>Crear un Obras </h1>
            </div>
            <div className="cont_form_almacen">
                <div className="right">
                    <form onSubmit={Obras}>
                        {
                            detailss.map((valu_cont, index) => (
                                <div key={index} className="gen_fromImput">
                                    <div className="prin_formImput">
                                        <p>La insercion multiple solo esta permitido 10 de : {index + 1}</p>
                                        <div className="formInput" >

                                            <label htmlFor='obra'>NOMBRE DE OBRA</label>
                                            <input
                                                id="obra"
                                                value={valu_cont.obras.toUpperCase()}
                                                name='obras'
                                                onChange={(e) => handleSubmit(e, index)}
                                                type="text"
                                                placeholder=""
                                                required


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

export default CrearObras_cont;          