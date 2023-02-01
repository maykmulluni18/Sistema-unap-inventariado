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
            if (parseFloat(cantidad) >= inventarioInicial.cantidad) {
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
            if (parseFloat(cantidad) >= NeasBienes.cantidad) {
                return res.status(400).json({ message: 'La cantidad especificada es mayor al stock disponible.' });
            }

        }


        await ModelsPecosaBienes.create({
            pecosaPedidoId: pecosaPedidoId,
            inventaridoInicialId: inventaridoInicialId || null,
            nea_bien_id: nea_bien_id || null,
            cantidad: parseFloat(cantidad),
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


        {/* 
                const id = req.params.id;

        const { pecosaPedidoId, inventaridoInicialId, nea_bien_id, cantidad, observaciones, fecha, createdAt, updatedAt } = req.body;

        //

        const NeasBienes = await ModelsNeaBien.findOne({
            where: { id: nea_bien_id }
        });
        //Bienes Pecosa
        const pecosaBienes = await ModelsPecosaBienes.findOne({
            where: { id }
        });

        if (!pecosaBienes) {
            return res.status(404).json({ message: 'No se encontró la Pecosa Bienes especificada' });
        }

        ///Inventario
        const inventarioInicial = await ModelsInvenInicial.findOne({
            where: { id: pecosaBienes.inventaridoInicialId }
        });
        if (inventaridoInicialId != null) {
            if (!inventarioInicial) {
                return res.status(404).json({ message: 'No se encontró el inventario inicial especificado.' });
            }
            if (cantidad == 0) {
                return res.status(401).json({ message: 'La cantidad especificada no puede ser 0' });
            }
            if (parseFloat(cantidad) >= inventarioInicial.cantidad) {
                return res.status(400).json({ message: 'La cantidad especificada es mayor al stock disponible.' });
            }

        }
    

    
        if (pecosaBienes.inventaridoInicialId) {
            console.log(pecosaBienes)
            console.log(cantidad)
            if (pecosaBienes.cantidad > cantidad) {
                pecosaBienes.cantidad = pecosaBienes.cantidad - cantidad;
                console.log(pecosaBienes.cantidad)
                //inventarioInicial.cantidad = parseFloat(inventarioInicial.cantidad) + parseFloat(pecosaBienes.cantidad);
                //console.log(inventarioInicial.cantidad)
                //await inventarioInicial.save();
            }
            if (pecosaBienes.cantidad < cantidad) {
                cantidad = cantidad - pecosaBienes.cantidad
                console.log(cantidad)
                //inventarioInicial.cantidad = parseFloat(inventarioInicial.cantidad) + parseFloat(pecosaBienes.cantidad);
                //await inventarioInicial.save();
            }
            if (pecosaBienes.cantidad = cantidad){
                console.log("no cambia")
            }

        }
        */}
        {/*///NEA
        if (nea_bien_id != null) {
            if (!NeasBienes) {
                return res.status(404).json({ message: 'No se encontró la nea especificado.' });
            }
            if (cantidad == 0) {
                return res.status(401).json({ message: 'La cantidad especificada no puede ser 0' });
            }
            if (parseFloat(cantidad) >= NeasBienes.cantidad) {
                return res.status(400).json({ message: 'La cantidad especificada es mayor al stock disponible.' });
            }

        }
        */}


        await ModelsPecosaBienes.update(req.body,{
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

        if (!pecosaBienes) {
            return res.status(404).json({ message: 'No se encontró la Pecosa Bienes especificada' });
        }

        const inventarioInicial = await ModelsInvenInicial.findOne({
            where: { id: pecosaBienes.inventaridoInicialId }
        });


        if (pecosaBienes.inventaridoInicialId) {
            //inventarioInicial.cantidad = Number.parseFloat(inventarioInicial.cantidad).toFixed(4)
            //pecosaBienes.cantidad = Number.parseFloat(pecosaBienes.cantidad).toFixed(4)

            //inventarioInicial.cantidad += pecosaBienes.cantidad;
            inventarioInicial.cantidad = parseFloat(inventarioInicial.cantidad) + parseFloat(pecosaBienes.cantidad);

            console.log(inventarioInicial.cantidad)
            await inventarioInicial.save();

        }

        //NEAS
        const NeaBieness = await ModelsNeaBien.findOne({
            where: { id: pecosaBienes.nea_bien_id }
        });

        if (pecosaBienes.nea_bien_id) {
            NeaBieness.cantidad = parseFloat(NeaBieness.cantidad) + parseFloat(pecosaBienes.cantidad);
            console.log(NeaBieness.cantidad)
            await NeaBieness.save();
        }
        await ModelsPecosaBienes.destroy({
            where: { id }
        })


        res.status(200).json({ message: 'Pecosa bienes eliminado con éxito' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};    