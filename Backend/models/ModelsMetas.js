import db from '../database/db.js';
import { Sequelize } from "sequelize";
const {DataTypes} = Sequelize;

const Metas = db.define('Metas',{
    meta_1:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    meta_2:{
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    obra:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_residente:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_almacenario:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_asistente_adm:{
        type: DataTypes.INTEGER,
        allowNull: false,

    }
   
},{
    freezeTableName: true
});



export default Metas