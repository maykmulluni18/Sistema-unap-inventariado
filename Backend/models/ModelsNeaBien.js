import db from '../database/db.js';
import { Sequelize } from "sequelize";
import ModelsBienes from './ModelsBienes.js';
import ModelsNeaEntradas from "../models/ModelsNeaEntradas.js";

const { DataTypes } = Sequelize;
const ModelsNeaBien = db.define('nea_bien', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    neaEntradaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    medida: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    fte_fto: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    cuenta_contable: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    p_unitario: {
        type: DataTypes.DECIMAL(10,3),
        allowNull: false,

    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    }

}, {
    freezeTableName: true
});


ModelsNeaBien.belongsTo(ModelsNeaEntradas, { foreignKey: "neaEntradaId" })
ModelsNeaEntradas.hasOne(ModelsNeaBien, {
    foreignKey: {
        name: 'id',
    }
})

/*ModelsNeaBien.belongsTo(ModelsBienes, { foreignKey: "bieneId" })
ModelsBienes.hasOne(ModelsNeaBien, {
    foreignKey: {
        name: 'id',
    }
})*/

export default ModelsNeaBien