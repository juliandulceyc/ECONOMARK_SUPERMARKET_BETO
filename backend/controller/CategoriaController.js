//importamos el modelo 
import CategoriaModel from "../models/CategoriaModel.js"

//** Métodos para el CRUD **//

//Mostrar todos los registros 
export const getAllCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaModel.findAll()
        res.json(categorias)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Mostrar un registro 
export const getCategoria = async (req, res) => { 
    try {
        const categoria = await CategoriaModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(categoria[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Crear un registro 
export const createCategoria = async (req, res) => {
    try {
        await CategoriaModel.create(req.body)
        res.json( {"message":"¡Registro creado correctamente!"} )
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Actualizar un registro 
export const updateCategoria = async (req, res) => {
    try {
        await CategoriaModel.update(req.body, {where: {id: req.params.id }})
        res.json( {"message":"¡Registro actualizado correctamente!"} )
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Eliminar un registro 
export const deleteCategoria = async (req, res) => {
    try {
        await CategoriaModel.destroy({where: {id: req.params.id}})
        res.json( {"message":"¡Registro eliminado correctamente!"} )
    } catch (error) {
        res.json( {message: error.message} )
    }
}
