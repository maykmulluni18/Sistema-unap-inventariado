import ModelsBienes from "../models/ModelsBienes.js"


export const getBienes = async (req, res) => {
    try {
        const bienes = await ModelsBienes.findAll()
        res.json(bienes)

    } catch (error) {
        res.json( {message: error.message} )
    }

}


export const getBienesID = async (req, res) =>{
    try{
        const bienes = await ModelsBienes.findAll({
            where:{id:req.params.id}
        })
        res.json(bienes[0])
        
    } catch (error){
        res.json({message: error.message})
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