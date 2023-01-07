import ModelsPecosaBienes from "../models/ModelsPecosaBienes.js";
import ModelsPecosaPedidos from "../models/ModelsPecosaPedidos.js";
import ModelsInvenInicial from "../models/ModelsInvenInicial.js";
import ModelsNeaBien from "../models/ModelsNeaBien.js";

export const getPecosaBienesPeidosId = async (req, res) => {
    try {
        const pecosabienpedidos = await ModelsPecosaBienes.findAll({
            where: {pecosaPedidoId: req.params.id},
            include: [ModelsInvenInicial,ModelsNeaBien, ModelsPecosaPedidos]
        })
        res.json(pecosabienpedidos)
    } catch (error) {
        res.json({message: error.message})
    }
}



