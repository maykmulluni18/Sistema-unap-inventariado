import "./stocks.scss";
import * as React from 'react';
import { DataGrid, esES } from "@mui/x-data-grid";
import { userColumns } from "./Data";
import { Link } from "react-router-dom";
import { GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from "axios";

const URI = 'http://localhost:8000/stock/'


const Stocks = () => {
    const [stocks, setStocks] = useState([])
    const [totalstocks, setTotalStocks] = useState(false)

    useEffect(() => {
        getStock()
        stado()
    }, [])

    const getStock = async () => {
        const res = await axios.get(URI)
        //console.log(res)
        setStocks(res.data.reverse())
    }
    const stado = () => {
        if (stocks.map((item) => (item.stock)) <= 0) {
            setTotalStocks(true)
        }
    }

    const actionColumn = [
        {
            field: "opciones",
            headerName: "Estado",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`reporpdf/${params.row.fecha_registro}`} style={{ textDecoration: "none" }}>
                            <div className="pdfButton"><PictureAsPdfIcon /></div>
                        </Link>

                    </div>
                );
            },
        },
    ];
    return (
        <>

            <div className="Tabledata_Stocks">

                <div className="Tabledata">
                    <div className="dataTitle">
                        Lista de de Stocks
                        <div className="CrearButton">
                        </div>
                    </div>

                    <DataGrid
                        className="datagrid"
                        rows={stocks}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={7}
                        rowsPerPageOptions={[5]}
                        //getRowId={row => row[0].id}                        //checkboxSelection
                        disableColumnSelector

                        components={{
                            Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                        //loading
                        //{...stocks}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    />
                </div>
            </div>
        </>
    );
};

export default Stocks;
