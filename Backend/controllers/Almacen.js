import ModelsAlmacen from "../models/ModelsAlmacen.js"

export const getAlmacen = async (req, res) => {
    try {
        const almacen = await ModelsAlmacen.findAll()
        res.json(almacen)

    } catch (error) {
        res.json( {message: error.message} )
    }

}

export const getAlmacenID = async (req, res) =>{
    try{
        const almacen = await ModelsAlmacen.findAll({
            where:{id:req.params.id}
        })
        res.json(almacen[0])
        
    } catch (error){
        res.json({message: error.message})
    }
}

export const createAlmacen = async (req, res) => {
    try{
        await ModelsAlmacen.create(req.body)
        res.json({
            "message": "Almacen creado con exito.",
        })
    } catch (error){
        res.json({message: error.message})
    }
}

export const updateAlmacen = async (req, res) => {
    try{
        await ModelsAlmacen.update(req.body,{
            where: {id: req.params.id}
        })
        res.json({
            "message": "Almacen actualizado con exito.",
    })
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteAlmacen = async (req, res) => {
    try{
        await ModelsAlmacen.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message":"Almacen eliminado con exito"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}