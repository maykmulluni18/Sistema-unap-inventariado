import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./editarmetas.scss"
import Swal from 'sweetalert2'
import FilterResidente from '../CrearMetas/FiterResidente';
import FilterAlmacenario from '../CrearMetas/FiterAlmacenario';
import FilterAsistente from '../CrearMetas/FilterAsistente';


const URI = 'http://localhost:8000/metas/'



const EditarMetas_cont = () => {
    const [meta_1, setMeta1] = useState('')
    const [meta_2, setMeta2] = useState('')
    const [obra, setObra] = useState('')
    const [id_residente, setResidente] = useState('')
    const [id_almacenario, setAlmacenario] = useState('')
    const [id_asistente_adm, setAsistenteAdm] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const updateeMetas = async (e) => {
        e.preventDefault()
        const respon = await axios.put(URI + id, {
            meta_1: meta_1,
            meta_2: meta_2,
            obra: obra,
            id_residente: id_residente,
            id_almacenario: id_almacenario,
            id_asistente_adm: id_asistente_adm
        })
        if (respon.status === 200) {
            Swal.fire(
                {
                    title: 'Editado con Exito..',
                    icon: 'success',
                    timer: 5500
                }
            )
            navigate('/metas')

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


    const getSedesId = async () => {
        const resb = await axios.get(URI + id,)
        setMeta1(resb.data.meta_1)
        setMeta2(resb.data.meta_2)
        setObra(resb.data.obra)
        setResidente(resb.data.id_residente)
        setAlmacenario(resb.data.id_almacenario)
        setAsistenteAdm(resb.data.id_asistente_adm)
    }
    useEffect(() => {
        getSedesId();
    }, [])

    return (
        <>
            <div className='cont_edit_metas'>
                <div className="top">
                    <h1>Editar un Metas : {id}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={updateeMetas}>
                            <div className="formInput" >
                                <label>META 1</label>
                                <input
                                    value={meta_1}
                                    onChange={(e) => setMeta1(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div className="formInput" >
                                <label>META 2</label>
                                <input
                                    value={meta_2}
                                    onChange={(e) => setMeta2(e.target.value.toUpperCase())}
                                    type="text"
                                    placeholder=""
                                    required
                                />
                            </div>


                            <div className='formInput'>
                                <label>RESIDENTE</label>
                                <input
                                    type="text"
                                    list="dataR"
                                    placeholder='FILTRAR ADMINISTRATIVOS'
                                    value={id_residente}
                                    name='id_residente'
                                    onChange={(e) => setResidente(e.target.value)}
                                    required
                                />
                                <FilterResidente />
                            </div>

                            <div className='formInput'>
                                <label>ALMACENARIO</label>
                                <input
                                    type="text"
                                    list="dataA"
                                    placeholder=''
                                    value={id_almacenario}
                                    name='id_residente'
                                    onChange={(e) => setAlmacenario(e.target.value)}
                                    required
                                />
                                <FilterAlmacenario />
                        
                            </div>
                            <div className='formInput'>
                                <label>ASISTENTE_ADMINISTATIVO</label>
                                <input
                                    type="text"
                                    list="dataAA"
                                    placeholder='FILTRAR ADMINISTRATIVOS'
                                    value={id_asistente_adm}
                                    name='id_asistente_adm'
                                    onChange={(e) => setMeta2(e.target.value)}
                                    required
                                />
                                <FilterAsistente />
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
export default EditarMetas_cont;