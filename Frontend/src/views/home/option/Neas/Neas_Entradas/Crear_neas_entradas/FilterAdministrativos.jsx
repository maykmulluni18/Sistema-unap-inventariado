import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const URI4 = 'http://localhost:8000/user/'

const FilterAdministrativos = () => {
    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI4)
        setAdministrativos(res.data)
    }
    useEffect(() => {
        getAdministrativos()
    }, [])

    return (
        <>
            <datalist className='datalistt' id="data1">

                {
                    administrativos
                        .map(res => {
                            return (
                                <option className='options' key={res.id} value={res.id}>'
                                    {res.nombres}' '
                                    {res.apellido_paterno}' '
                                    {res.apellido_materno}'
                                </option>
                            )
                        })
                }
            </datalist>

        </>
    )

}

export default React.memo(FilterAdministrativos)

