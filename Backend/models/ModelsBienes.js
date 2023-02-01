import db from '../database/db.js';
import { Sequelize } from "sequelize";
import ModelsInvenInicial from './ModelsInvenInicial.js';
const {DataTypes} = Sequelize;
const ModelsBienes = db.define('bienes',{
    item:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    unidad_de_medida:{
        type: DataTypes.STRING,
        allowNull: false,
    }
   
},{
    freezeTableName: true
});

ModelsInvenInicial.belongsTo(ModelsBienes, { foreignKey: "idBienes" })
ModelsBienes.hasOne(ModelsInvenInicial, {
    foreignKey: {
        name: 'id',
    }
})


export default ModelsBienes