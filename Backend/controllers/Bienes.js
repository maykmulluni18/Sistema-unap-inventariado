import ModelsBienes from "../models/ModelsBienes.js"
import ModelsInvenInicial from "../models/ModelsInvenInicial.js"


export const getBienes = async (req, res) => {
    try {
        const bienes = await ModelsBienes.findAll({
            include:[ModelsInvenInicial]
        })
        res.json(bienes)

    } catch (error) {
        res.status(400).json( {message: error.message} )
    }

}


export const getBienesID = async (req, res) =>{
    try{
        const bienes = await ModelsBienes.findOne({
            where:{id:req.params.id},
            include:[ModelsInvenInicial]

        })
        res.json(bienes)
        
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export const createBienes = async (req, res) => {
    try{
        await ModelsBienes.create(req.body)
        res.json({
            "message": "Bien creado con exito.",
        })
    } catch (error){
        res.json({message: error.message})
    }
}

export const updateBienes = async (req, res) => {
    try{
        await ModelsBienes.update(req.body,{
            where: {id: req.params.id}
        })
        res.json({
            "message": "Bienes actualizado con exito.",
    })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteBienes = async (req, res) => {
    try{
        await ModelsBienes.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message":"Bien eliminado con exito"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}