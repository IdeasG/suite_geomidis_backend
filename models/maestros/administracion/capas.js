import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const capasGrupo = sequelize.define('tadm_capas', {
  // Model attributes are defined here
  id_capa: {
    type: DataTypes.INTEGER,
    autoIncrement:true, 
    allowNull: false,
    primaryKey: true
  },
  id_grupo: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    primaryKey: true
  },
  c_nombre_tabla_capa: {
    type: DataTypes.STRING, 
    allowNull: false,
    primaryKey: true
  },
  //ss
  c_nombre_public_capa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  c_sql_capa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  b_capa: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  schema: 'administracion',
  // Other model options go here
});
// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
export default capasGrupo;
