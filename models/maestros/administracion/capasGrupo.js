import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const capasGrupo = sequelize.define('tadm_capas_grupo', {
  // Model attributes are defined here
  id_grupo: {
    type: DataTypes.INTEGER,
    autoIncrement:true, 
    allowNull: false,
    primaryKey: true
  },
  id_super_grupo: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    primaryKey: true
  },
  //ss
  c_nombre_grupo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  b_grupo: {
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
