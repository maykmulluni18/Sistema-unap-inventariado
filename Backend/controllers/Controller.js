import Models from "../models/Models.js";

//Mostrar datos
export const getUsuarios = async (req, res)=>{
    try{
        const usuarios = await Models.findAll()
        res.json(usuarios)
    } catch (error){
        res.json({message: error.message})
    }
}
//Mostrar registro
export const getUsuario = async (req, res) =>{
    try{
        const usuarios = await Models.findAll({
            where:{id:req.params.id}
        })
        res.json(usuarios[0])
        
    } catch (error){
        res.json({message: error.message})
    }
}
//Crear
export const createUsuarios = async (req, res) => {
    try{
        await Models.create(req.body)
        res.json({
            "message": "User created successfully.",
        })
    } catch (error){
        res.json({message: error.message})
    }
}
//Actualizar
export const updateUsuarios = async (req, res) => {
    try{
        await Models.update(req.body,{
            where: {id: req.params.id}
        })
        res.json({
            "message": "User updated successfully.",
    })
    } catch (error) {
        res.json({message: error.message})
    }
}
//Eliminar
export const deleteUsuarios = async (req, res) => {
    try{
        await Models.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message":"Users destroys successfully"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}