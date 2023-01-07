import db from '../database/db.js';
import { Sequelize } from "sequelize";
const { DataTypes } = Sequelize;
const ModelsInvenInicial = db.define('inventarido_inicial', {
    item: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    cuenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unidad: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_registro: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    freezeTableName: true
});


export default ModelsInvenInicial