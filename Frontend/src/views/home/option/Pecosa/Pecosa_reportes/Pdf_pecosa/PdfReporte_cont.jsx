import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Page, Text, View,
    Document, StyleSheet,
    PDFDownloadLink, PDFViewer, Image
} from '@react-pdf/renderer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UNAP_LOGO from "../.././../image/UNAP.png"
import "./pdfpecosa.scss"
const URI = 'http://localhost:8000/pecosapedidos/'
const URI1 = 'http://localhost:8000/pecosabienespedidos/'
const URI2 = 'http://localhost:8000/metas/'

// Create styles
const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth - 280,
        height: window.innerHeight - 130,
    },
    body: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,

    },
    title: {
        fontSize: 20,
        textAlign: "center",
    },
    /* text: {
         margin: 12,
         fontSize: 14,
         textAlign: "justify",
     },*/
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    image: {
        width: 50,
        height: 50,
        top: 20,
        left: 40,
        position: "absolute"

    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "red",
    },
    header_subtitle: {
        color: "grey",
        fontSize: 8,
        left: 50,
        top: 5,
        paddingHorizontal: 35,

    },
    header_subtitle_oficina: {
        color: "grey",
        fontSize: 7,
        left: 95,
        top: 18,
        paddingHorizontal: 35,
    },
    header_subtitle_almacen: {
        color: "grey",
        fontSize: 7,
        left: 100,
        paddingHorizontal: 35,

    },
    header_title_principal: {
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: "center",
        color: "#212121",

    },
    header_title_principal_1: {
        fontWeight: 'bold',
        fontSize: 12,
        top: -8,
        textAlign: "center",
        color: "#212121",
    },

    gen_depen: {
        width: "62%",
        left: "3.5%",
        borderRadius: "5px",
        height: "10.5%",
        top: "2%",
        border: "1px solid gray",

    },
    dependencias: {
        fontSize: 8,
        color: "#212121",
        right: "3%",
        paddingHorizontal: 16,
        top: 4,

    },
    usuario: {
        fontSize: 8,
        color: "#212121",
        right: "3%",
        paddingHorizontal: 16,
        top: 8,

    },
    destino_a: {
        fontSize: 8,
        color: "#212121",
        right: "3%",
        paddingHorizontal: 16,
        top: 10,
        //border: 1,
        //width: "40%"

    },
    entregar_a: {
        fontSize: 8,
        color: "#212121",
        right: "3%",
        paddingHorizontal: 16,
        top: 12,

    },
    meta_contend: {
        width: "31%",
        left: "65.5%",
        borderRadius: "5px",
        height: "9%",
        top: "-6%",
        border: "1px solid gray",
    },
    cadena_fun: {
        fontSize: 8,
        color: "#212121",
        textAlign: "center",
        fontWeight: 900,
        top: "4%",
    },
    cadena_fun_data: {
        fontSize: 8,
        color: "#212121",
        textAlign: "center",
        fontWeight: 900,
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",
        top: "4%",
    },
    cadena_fun_data_meta: {
        fontSize: 8,
        color: "#212121",
        textAlign: "center",
        fontWeight: 900,
        top: "24%",
    },
    fecha_contend: {
        border: "1px solid gray",
        borderRadius: "5px",
        width: "9%",
        left: "80.5%",
        borderRadius: "5px",
        height: "5%",
        top: "-23%",

        //border: "1px solid gray",

    },
    fecha_title: {
        fontSize: 8,
        color: "#212121",
        textAlign: "center",

    },
    fecha: {
        borderTop: "1px solid gray",
        fontSize: 8,
        color: "#212121",
        top: "1px",
        textAlign: "center",


    },


    pageNumber: {
        position: "absolute",
        fontSize: 8,
        bottom: 30,
        left: 720,
        right: 0,
        top: 45,
        textAlign: "center",
        color: "grey",
    },
    table: {
        display: "table",
        width: "auto",
        top: "-8%",
        borderStyle: "solid",

    },

    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol_id_V: {
        width: "2%",
        //borderStyle: "solid",
        color: "white",
        border: "1px solid gray",
    },
    tableCol_title: {
        width: "52%",
        //borderStyle: "solid",
        border: "1px solid gray",
    },
    tableCol_title_2: {
        width: "18%",
        //borderStyle: "solid",
        border: "1px solid gray",
    },
    tableCol_title_3: {
        width: "21%",
        //borderStyle: "solid",
        color: "white",
        border: "1px solid gray",
    },
    tableCol_numero: {
        width: "2%",
        //borderStyle: "solid",
        border: "1px solid gray",
    },
    tableCol_unidad: {
        width: "8%",
        //borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_descripcion: {
        width: "34%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_codigo: {
        width: "9%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_cantidad: {
        width: "7%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_unitario: {
        width: "7%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_total: {
        width: "7%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_observacion: {
        width: "12%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCell: {

        marginTop: 8,
        fontSize: 8,
        height: 14,
        textAlign: "center",
        margin: "center"

    },
    tableCell_cantidad: {
        fontSize: 8,
        textAlign: "center",

    },
    tableCell_unidad: {
        //color: "red",
        fontSize: 8,
        textAlign: "center",
        //margin: "auto",
    },
    Oficio: {
        fontSize: 8,
        color: "#212121",
        left: 10,
        paddingHorizontal: 18,
        fontWeight: "bold"
    },
    solicitante: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 25,
        top: -1,
        fontWeight: "bold"
    },
    solicitante_1: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 66,
        top: 3,
        fontWeight: "bold"
    },
    jefe_abast: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 210,
        top: -14,
        fontWeight: "bold"
    },
    jefe_abast_1: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 220,
        top: -14,
        fontWeight: "bold"
    },
    jefe_alm: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 410,
        top: -28,
        fontWeight: "bold"
    },
    jefe_alm_1: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 438,
        top: -27,
        fontWeight: "bold"
    },
    recibi_con: {
        fontSize: 8,
        color: "#212121",
        left: 600,
        top: -46,
        fontWeight: "bold"
    },
    recibi_con_1: {
        fontSize: 8,
        color: "#212121",
        left: 626,
        top: -40,
        fontWeight: "bold"
    }
});


const PdfReporte_cont = () => {
    //const [contend,getContent] = useState([])


    useEffect(() => {
        getPedidosPecosa_p()
        getPecosaBienes()
    }, [])

    const { id } = useParams()


    const [dependencias, setDependencias] = useState('')
    const [id_sedes, setIdSedes] = useState('')
    const [fecha, setFecha] = useState('')
    const [almacen, setAlmacen] = useState('')
    const [id_administradores, setIdAdministradores] = useState('')
    const [id_metas, setIdMetas] = useState('')
    const getPedidosPecosa_p = async () => {

        const res = await axios.get(URI + id,)
        setDependencias(res.data.dependencias)
        setIdSedes(res.data.sede.sede)
        setAlmacen(res.data.almacen)
        setFecha(res.data.fecha)
        setIdAdministradores(res.data.usuario.nombres + ' ' +
            res.data.usuario.apellido_paterno + ' ' +
            res.data.usuario.apellido_materno)
        setIdMetas(res.data.Meta.meta_1)
    }

    const [pecosaPedidoId, setPecosaPedidosId] = useState([])

    const getPecosaBienes = async () => {
        const res = await axios.get(URI1 + id,)

        console.log(res.data)
        setPecosaPedidosId(res.data)
    }

    const [sumatotal, setSumatTotal] = useState(0)
    
    
    useEffect(() => {
        const getsumarTotal = () => {
            const total = pecosaPedidoId.map((item) => parseFloat(item.cantidad * item.inventarido_inicial?.precio || item.nea_bien?.p_unitario ))
                .reduce((previus, current) => {
                    return previus + current;
                }, 0)
            console.log(total)
            setSumatTotal(total)
        };
        getsumarTotal()
      });
    /*
    const [pedidospecosap, setPecosaPedidosP] = useState([])
    const getPedidosPecosa_p = async () => {
        const res = await axios.get(URI + id,)
        console.log({...res.data})
        setPecosaPedidosP(res.data)  
    }*/

    return (
        <>
            <div>
                <div className='top'>
                    <div className='BotonesOp'>
                        <Link to="../">
                            <button  className='regresar'>Regresar</button >
                        </Link>
                        {/*<bottom className='imprimir'></bottom>*/}

                    </div>
                </div>
            </div>
            <div>
                <PDFViewer style={styles.viewer}>

                    <Document>
                        <Page size="A4" orientation="landscape" style={styles.body}>

                                <Image
                                style={styles.image}
                                src={UNAP_LOGO}
                                fixed
                            />
                            <Text style={styles.header} fixed></Text>
                            <Text style={styles.header_subtitle} fixed>
                                UNIVERSIDAD NACIONAL DEL ALTIPLANO
                            </Text>
                            <Text style={styles.header_subtitle_oficina} fixed>
                                OFICINA DE LOGISTICA
                            </Text>
                            <Text style={styles.header_subtitle_almacen} fixed>
                                ALMACEN CENTRAL
                            </Text>
                            <Text style={styles.header_title_principal} fixed>
                                PEDIDO DE COMPROBANTE DE SALIDA (PECOSA)
                            </Text>
                            <Text style={styles.header_title_principal_1} fixed>
                                ____________________________________________
                            </Text>
                            {/* <Image style={styles.image} src={LebronStretch} />*/}
                  
                            <View style={styles.gen_depen} fixed>
                                <Text style={styles.dependencias} fixed>
                                    <Text>DEPENDENCIA SOLICITANTE   :</Text>   {dependencias}
                                </Text>
                                <Text style={styles.usuario} fixed>
                                    <Text>SOLICITANTE                              :</Text>   {id_administradores}
                                </Text>
                                <Text style={styles.destino_a} fixed>
                                    <Text>CON DESTINO A                         :</Text>   {id_sedes}
                                </Text>
                                <Text style={styles.entregar_a} fixed>
                                    <Text>SOLICITO ENTREGAR A </Text>           :<Text>   {id_administradores} </Text>
                                </Text>
                            </View>


                            <View style={styles.meta_contend} fixed>
                                <Text style={styles.cadena_fun} >
                                    CADENA FUNCIONAL
                                </Text>
                                <Text style={styles.cadena_fun_data} >
                                    CADENA FUNCIONAL
                                </Text>
                                <Text style={styles.cadena_fun_data_meta} >
                                    {id_metas}
                                </Text>
                            </View>

                            <View style={styles.fecha_contend} fixed>
                                <Text style={styles.fecha_title} >
                                    Año Mes Dia
                                </Text>
                                <Text style={styles.fecha} >
                                    {fecha}
                                </Text>
                            </View>

                            {/* Tabla  _______________________*/}
                            <View style={styles.table}>
                                <View style={styles.tableRow} fixed>
                                    <View style={styles.tableCol_id_V}>
                                        <Text style={styles.tableCell}>O</Text>
                                    </View>
                                    <View style={styles.tableCol_title}>
                                        <Text style={styles.tableCell}>ARTICULOS SOLICITADOS</Text>
                                    </View>
                                    <View style={styles.tableCol_title_2}>
                                        <Text style={styles.tableCell}>ARTICULOS SOLICITADOS</Text>
                                    </View>
                                    <View style={styles.tableCol_title_3}>
                                        <Text style={styles.tableCell}>ARTICULOS SOLICITADOS</Text>
                                    </View>
                                </View>
                                <View style={styles.tableRow} fixed>
                                    <View style={styles.tableCol_numero}>
                                        <Text style={styles.tableCell}>N°</Text>
                                    </View>
                                    <View style={styles.tableCol_cantidad}>
                                        <Text style={styles.tableCell}>CANTIDAD</Text>
                                    </View>
                                    <View style={styles.tableCol_unidad}>
                                        <Text style={styles.tableCell}>U. MEDIDA</Text>
                                    </View>
                                    <View style={styles.tableCol_descripcion}>
                                        <Text style={styles.tableCell}>DESCRIPCIÓN</Text>
                                    </View>
                                    <View style={styles.tableCol_codigo}>
                                        <Text style={styles.tableCell}>CODIGO</Text>
                                    </View>
                                    <View style={styles.tableCol_cantidad}>
                                        <Text style={styles.tableCell}>CANT</Text>
                                    </View>
                                    <View style={styles.tableCol_unitario}>
                                        <Text style={styles.tableCell}>UNITARIO</Text>
                                    </View>
                                    <View style={styles.tableCol_total}>
                                        <Text style={styles.tableCell}>TOTAL</Text>
                                    </View>
                                    <View style={styles.tableCol_observacion}>
                                        <Text style={styles.tableCell}>OBSERVACIONES</Text>
                                    </View>
                                </View>

                                {pecosaPedidoId.map((x, i) =>

                                    <View style={styles.tableRow} key={`BR${i}`}>
                                        <View style={styles.tableCol_numero}>
                                            <Text style={styles.tableCell}>{i + 1}</Text>
                                        </View>
                                        <View style={styles.tableCol_cantidad}>
                                            <Text style={styles.tableCell}>{x.cantidad}</Text>
                                        </View>
                                        <View style={styles.tableCol_unidad}>
                                            <Text style={styles.tableCell_unidad}>{x.inventarido_inicial?.unidad || x.nea_bien?.medida}</Text>
                                        </View>
                                        <View style={styles.tableCol_descripcion}>
                                            <Text style={styles.tableCell}>{x.inventarido_inicial?.descripcion || x.nea_bien?.descripcion}</Text>
                                        </View>
                                        <View style={styles.tableCol_codigo}>
                                            <Text style={styles.tableCell}>{x.inventarido_inicial?.cuenta || x.nea_bien?.cuenta_contable}</Text>
                                        </View>
                                        <View style={styles.tableCol_cantidad}>
                                            <Text style={styles.tableCell}>{x.cantidad}</Text>
                                        </View>
                                        <View style={styles.tableCol_unitario}>
                                            <Text style={styles.tableCell}>{x.inventarido_inicial?.precio || x.nea_bien?.p_unitario}</Text>
                                        </View>
                                        <View style={styles.tableCol_total}>
                                            <Text style={styles.tableCell}>{x.cantidad * x.inventarido_inicial?.precio || x.nea_bien?.p_unitario}</Text>
                                        </View>
                                        <View style={styles.tableCol_observacion}>
                                            <Text style={styles.tableCell}>{x?.observaciones}</Text>
                                        </View>
                                 

                                    </View>


                                )


                                }
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol_numero}>
                                        <Text style={styles.tableCell}>_</Text>
                                    </View>
                                    <View style={styles.tableCol_cantidad}>
                                        <Text style={styles.tableCell}>_</Text>
                                    </View>
                                    <View style={styles.tableCol_unidad}>
                                        <Text style={styles.tableCell}>_</Text>
                                    </View>
                                    <View style={styles.tableCol_descripcion}>
                                        <Text style={styles.tableCell}>_</Text>
                                    </View>
                                    <View style={styles.tableCol_codigo}>
                                        <Text style={styles.tableCell}>_</Text>
                                    </View>
                                    <View style={styles.tableCol_cantidad}>
                                        <Text style={styles.tableCell}>_</Text>
                                    </View>
                                    <View style={styles.tableCol_unitario}>
                                        <Text style={styles.tableCell}>_</Text>
                                    </View>
                                    <View style={styles.tableCol_total}>
                                        <Text style={styles.tableCell}>{sumatotal}</Text>
                                    </View>
                                    <View style={styles.tableCol_observacion}>
                                        <Text style={styles.tableCell}>_</Text>
                                    </View>
                                </View>

                            </View>

                            <Text style={styles.Oficio} >
                                REFERENCIA: OFICIO N° 037-2022-SUMAP/USG-UNA-P
                                
                            </Text>
                            <Text style={styles.solicitante} fixed>
                                ___________________________
                            </Text>
                            <Text style={styles.solicitante_1} fixed>
                                SOLICITANTE
                            </Text>
                            <Text style={styles.jefe_abast} fixed>
                                ____________________________
                            </Text>
                            <Text style={styles.jefe_abast_1} fixed>
                                JEFE DE ABASTECIMIENTO
                            </Text>
                            <Text style={styles.jefe_alm} fixed>
                                ___________________________
                            </Text>
                            <Text style={styles.jefe_alm_1} fixed>
                                JEFE DE ALMACEN
                            </Text>
                            <Text style={styles.recibi_con} fixed>
                                ___________________________
                            </Text>
                            <Text style={styles.recibi_con_1} fixed>
                                RECIBI CONFORME
                            </Text>

                            <Text
                                style={styles.pageNumber}
                                render={({ pageNumber, totalPages }) =>
                                    `${pageNumber} / ${totalPages}`
                                }
                            />
                        </Page>
                    </Document>
                </PDFViewer>

            </div>
        </>
    );
}


export default PdfReporte_cont;
