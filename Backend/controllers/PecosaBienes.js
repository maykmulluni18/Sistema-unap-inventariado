import ModelsPecosaBienes from "../models/ModelsPecosaBienes.js";
import ModelsPecosaPedidos from "../models/ModelsPecosaPedidos.js";
import ModelsInvenInicial from "../models/ModelsInvenInicial.js";
import ModelsNeaBien from "../models/ModelsNeaBien.js";
import ModelsBienes from "../models/ModelsBienes.js";

export const getPecosaBienes = async (req, res) => {
    try {
        const pecosabienes = await ModelsPecosaBienes.findAll({
            include: [{
                model: ModelsInvenInicial,
                include: [ModelsBienes]
            },
            {
                model: ModelsNeaBien,
                include: [ModelsBienes]
            },
                ModelsPecosaPedidos]

        })
        res.json(pecosabienes)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getPecosaBienesId = async (req, res) => {
    try {
        /* const { pecosaPedidoId, inventaridoInicialId, nea_bien_id, cantidad, observaciones, fecha, createdAt, updatedAt } = req.body;
         const inventarioInicial = await ModelsInvenInicial.findOne({
             where: { id: inventaridoInicialId. }
         });*/
        const pecosabien = await ModelsPecosaBienes.findAll({
            where: { id: req.params.id },
            include: [{
                model: ModelsInvenInicial,
                include: [ModelsBienes]
            },
            {
                model: ModelsNeaBien,
                include: [ModelsBienes]
            },
                ModelsPecosaPedidos]
        })
        res.json(pecosabien[0])
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


export const createPecosaBienes = async (req, res) => {
    try {
        const { pecosaPedidoId, inventaridoInicialId, nea_bien_id, cantidad, observaciones, fecha, createdAt, updatedAt } = req.body;

        const inventarioInicial = await ModelsInvenInicial.findOne({
            where: { id: inventaridoInicialId }
        });

        const NeasBienes = await ModelsNeaBien.findOne({
            where: { id: nea_bien_id }
        });

        ///Inventario
        if (inventaridoInicialId != null) {
            if (!inventarioInicial) {
                return res.status(404).json({ message: 'No se encontró el inventario inicial especificado.' });
            }
            if (cantidad == 0) {
                return res.status(401).json({ message: 'La cantidad especificada no puede ser 0' });
            }
            if (cantidad > inventarioInicial.cantidad) {
                return res.status(400).json({ message: 'La cantidad especificada es mayor al stock disponible.' });
            }
        }

        ///NEA
        if (nea_bien_id != null) {
            if (!NeasBienes) {
                return res.status(404).json({ message: 'No se encontró la nea especificado.' });
            }
            if (cantidad == 0) {
                return res.status(401).json({ message: 'La cantidad especificada no puede ser 0' });
            }
            if (cantidad > NeasBienes.cantidad) {
                return res.status(400).json({ message: 'La cantidad especificada es mayor al stock disponible.' });
            }
        }


        await ModelsPecosaBienes.create({
            pecosaPedidoId: pecosaPedidoId,
            inventaridoInicialId: inventaridoInicialId || null,
            nea_bien_id: nea_bien_id || null,
            cantidad: cantidad,
            observaciones: observaciones,
            fecha: fecha,
            createdAt: createdAt,
            updatedAt: updatedAt
        });

        if (inventaridoInicialId != null) {
            inventarioInicial.cantidad -= cantidad;
            await inventarioInicial?.save();
        }
        if (nea_bien_id != null) {
            NeasBienes.cantidad -= cantidad;
            await NeasBienes?.save();
        }



        res.status(200).json({ message: "Se creo la pecosa bien exitosamente" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export const updatePecosaBienes = async (req, res) => {
    try {

        await ModelsPecosaBienes.update(req.body, {
            where: { id: req.params.id }
        })

        res.status(200).json({ 'message': 'Pecosa bienes actualizado con exito' })

    } catch (error) {
        res.status(400).json({ message: error.messages })
    }
}

export const deletePecosaBienes = async (req, res) => {
    try {
      const id = req.params.id;
      const pecosaBienes = await ModelsPecosaBienes.findOne({
        where: { id }
      }); 
  
      const inventarioInicial = await ModelsInvenInicial.findOne({
        where: { id: pecosaBienes.inventaridoInicialId }
      }); 
  
      if (pecosaBienes.inventaridoInicialId) { 
        inventarioInicial.cantidad += pecosaBienes.cantidad;
        console.log(inventarioInicial.cantidad)
        await inventarioInicial.save();
      }
  
      const NeaBieness = await ModelsInvenInicial.findOne({
        where: { id: pecosaBienes.nea_bien_id }
      });
  
      if (pecosaBienes.nea_bien_id) {
        NeaBieness.cantidad += pecosaBienes.cantidad;
        await NeaBieness.save();
      }
  
      await ModelsPecosaBienes.destroy({
        where: { id }
      });
  
      res.status(200).json({ message: 'Pecosa bienes eliminado con éxito' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  