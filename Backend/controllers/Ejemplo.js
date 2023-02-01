import util from "util"
import db from "../database/db.js"
//const query = util.promisify(db.query).bind(db)
export const getCantidad = async (req, res) => {
    try {
        const usuarios = await db.query(
            `SELECT b.id, 
            b.item,
            b.unidad_de_medida AS Unidad_de_Medida,
            b.description AS Descripcion,
            i.cantidad AS Inventarido_Cantidad,
            n.cantidad AS Nea_Cantidad,
            i.cantidad_inicial + COALESCE(SUM(n.cantidad_inicial), 0) AS Cantidad_Inicial,
            i.cantidad + COALESCE(SUM(n.cantidad), 0) AS stock
        FROM bienes b
        LEFT JOIN inventarido_inicial i ON i.idBienes = b.id 
        LEFT JOIN nea_bien n ON n.idBienes = b.id
        GROUP BY i.id`)
        res.json(usuarios[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getStock = async (req, res) => {
    try {
        let sql = `
        SELECT b.id, 
            b.item,
            b.unidad_de_medida AS Unidad_de_Medida,
            b.description AS Descripcion,
            i.cantidad AS Inventarido_Cantidad,
            n.cantidad AS Nea_Cantidad,
            SUM(p.cantidad) salida
        FROM bienes b
        LEFT JOIN inventarido_inicial i ON i.idBienes = b.id 
        LEFT JOIN nea_bien n ON n.idBienes = b.id
        LEFT JOIN pecosa_bienes p ON p.inventaridoInicialId = i.id
        LEFT JOIN pecosa_bienes ON p.nea_bien_id = b.id
        GROUP BY i.id
        `
        const stock = await db.query(sql)
        res.json(stock[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getStockNea = async (req, res) => {
    try {
        let sql = `SELECT p.updatedAt, i.fecha, i.item, i.medida, i.descripcion, i.cantidad AS entrada, p.cantidad AS salida, i.cantidad - COALESCE(SUM(p.cantidad), 0) AS stock
        FROM nea_bien i LEFT JOIN 
        pecosa_bienes p
        ON i.id = p.nea_bien_id
        GROUP BY p.updatedAt`
        const stocknea = await db.query(sql)
        res.json(stocknea[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}