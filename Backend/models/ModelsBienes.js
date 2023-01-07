import db from '../database/db.js';
import { Sequelize } from "sequelize";
const {DataTypes} = Sequelize;
const ModelsBienes = db.define('bienes',{
    item:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    unidad_de_medida:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
   
},{
    freezeTableName: true
});



export default ModelsBienes