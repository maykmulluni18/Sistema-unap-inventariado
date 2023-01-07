import ModelsObras from "../models/ModelsObras.js"

export const getObras = async (req, res) => {
    try {
        const obras = await ModelsObras.findAll()
        res.json(obras)

    } catch (error) {
        res.json( {message: error.message} )
    }

}

export const getObrasID = async (req, res) =>{
    try{
        const obras = await ModelsObras.findAll({
            where:{id:req.params.id}
        })
        res.json(obras[0])
        
    } catch (error){
        res.json({message: error.message})
    }
}

export const createObras = async (req, res) => {
    try{
        await ModelsObras.create(req.body)
        res.json({
            "message": "Obra creado con exito.",
        })
    } catch (error){
        res.json({message: error.message})
    }
}

export const updateObras = async (req, res) => {
    try{
        await ModelsObras.update(req.body,{
            where: {id: req.params.id}
        })
        res.json({
            "message": "Obra actualizado con exito.",
    })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteObras = async (req, res) => {
    try{
        await ModelsObras.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message":"Obra eliminado con exito"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}