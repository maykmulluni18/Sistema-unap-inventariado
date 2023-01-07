import ModelsNeaBien from "../models/ModelsNeaBien.js";
import ModelsBienes from "../models/ModelsBienes.js";
import ModelsNeaEntradas from "../models/ModelsNeaEntradas.js";

export const getNeasBienes = async (req, res) => {
    try {
        const NeasBienes = await ModelsNeaBien.findAll({
            include: [ModelsNeaEntradas]
        })
        res.json(NeasBienes)
    } catch (error) {
        res.json({ message : error.message})
    }
}

export const getNeasBienesId = async (req, res) => {
    try {
        const NeasBienes = await ModelsNeaBien.findAll({
            where: {id: req.params.id},
            include: [ModelsNeaEntradas]
        })
        res.json(NeasBienes[0])
    } catch (error) {
        res.json({ message : error.message})
    }
}

export const createNeasBienes = async (req, res) => {
    try {
        const NeasBienes = await ModelsNeaBien.create(req.body)
        res.json({'message': 'Neas Bien Creado con Exito'})
    } catch (error) {
        res.json({ message : error.message})
    }
}

export const updateNeasBienes = async (req, res) => {
    try {
        const NeasBienes = await ModelsNeaBien.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({'message': 'Neas Bien Actualizado con exito'})
    } catch (error) {
        res.json({message : error.message})
    }
}

export const deleteNeasBienes = async (req, res) => {
    try {
        await ModelsNeaBien.destroy({
            where: {id: req.params.id}
        })
        res.json({'message': 'Neas Bien Eliminado con exito'})
    } catch (error) {
        res.json({message : error.message})
    }
}
