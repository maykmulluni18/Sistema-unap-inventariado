import ModelsInvenInicial from "../models/ModelsInvenInicial.js"
export const getInventFilterDataId = async (req, res) => {
    try {
        const InventBienes = await ModelsInvenInicial.findAll({
            where:{fecha_registro: req.params.id}
        })
        
        res.json(InventBienes)
    } catch (error) {
        res.json({ message : error.message})
    }
}

