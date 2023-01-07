import ModelsInvenInicial from "../models/ModelsInvenInicial.js"

export const getInventBienes = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.findAll()
        res.json(InventBienes)
    } catch (error) {
        res.json({ message : error.message})
    }
}

export const getInventBienesId = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.findAll({
            where:{id:req.params.id}
        })
        res.json(InventBienes[0])
    } catch (error) {
        res.json({ message : error.message})
    }
}

export const createInventBienes = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.create(req.body)
        res.json({'message': 'Creado con Exito'})
    } catch (error) {
        res.json({ message : error.message})
    }
}

export const updateInventBienes = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({'message': 'Actualizado con exito'})
    } catch (error) {
        res.json({message : error.message})
    }
}

export const deleteInventBienes = async (req, res) => {
    try {
        await ModelsInvenInicial.destroy({
            where: {id: req.params.id}
        })
        res.json({'message': 'Eliminado con exito'})
    } catch (error) {
        res.json({message : error.message})
    }
}
