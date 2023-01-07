import util from "util"
import db from "../database/db.js"
//const query = util.promisify(db.query).bind(db)
export const getCantidad = async (req, res)=>{
    try{
        const usuarios = await db.query(
            'SELECT description, SUM(cantidad) AS cantidad FROM nea_bien INNER JOIN bienes ON nea_bien.bieneId = bienes.id GROUP BY nea_bien.bieneId')
        res.json(usuarios)
    } catch (error){
        res.json({message: error.message})
    }
}

export const getStock = async (req, res) => {
    try{
         let sql =   `SELECT i.id, i.fecha_registro, i.item,i.unidad, i.descripcion, 
         i.cantidad AS entrada, p.cantidad AS salida, i.cantidad - COALESCE(SUM(p.cantidad), 0) AS stock, 
         i.precio FROM inventarido_inicial i LEFT JOIN  
         pecosa_bienes p ON i.id = p.inventaridoInicialId GROUP BY i.id`
        const stock = await db.query(sql)
         res.json(stock[0])
    } catch (error){
        res.json({message: error.message})
    }
}


export const getStockNea = async (req, res) => {
    try{
        let sql = `SELECT i.id, i.fecha, i.item, i.medida, i.descripcion, i.cantidad AS entrada, p.cantidad AS salida, i.cantidad - COALESCE(SUM(p.cantidad), 0) AS stock
        FROM nea_bien i LEFT JOIN 
        pecosa_bienes p
        ON i.id = p.nea_bien_id
        GROUP BY i.id`
        const stocknea = await db.query(sql)
        res.json(stocknea[0])
    } catch (error){
        res.json({message: error.message})
    }
}