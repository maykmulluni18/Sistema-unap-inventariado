import ModelsNeaBien from "../models/ModelsNeaBien.js";
import ModelsNeaEntradas from "../models/ModelsNeaEntradas.js";
import ModelsAlmacen from "../models/ModelsAlmacen.js";
import ModelsObras from "../models/ModelsObras.js";
import ModelsBienes from "../models/ModelsBienes.js";

export const getNeasBienesEntradasId = async (req, res) => {
    try {
        const NeasBien = await ModelsNeaBien.findAll({
            where: {neaEntradaId: req.params.id},
            include: [ModelsNeaEntradas]
        })
        res.json(NeasBien)
    } catch (error) {
        res.json({ message : error.message})
    }
}


