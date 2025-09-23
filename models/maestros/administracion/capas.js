import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";
import CapasEstilos from "./capasEstilos.js";
import CapasGrupo from "./capasGrupo.js";

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
    allowNull: true,
  },
  c_workspace: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  //ss
  c_nombre_public_capa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  c_sql_capa: {
    type: DataTypes.STRING,
    allowNull: true
  },
  b_capa: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  b_geoportal: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  c_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  c_url_seleccionado:{
    type: DataTypes.STRING,
    allowNull: true
  },
  c_tipo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  c_servicio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  c_nombre_geoserver:{
    type: DataTypes.STRING,
    allowNull: true
  },
  id_usuario_auditoria:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_rol_auditoria:{
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  schema: 'administracion',
  // Other model options go here
});

// Configurar relaciones
capasGrupo.hasMany(CapasEstilos, { foreignKey: 'id_capa', as: 'estilos' });
CapasEstilos.belongsTo(capasGrupo, { foreignKey: 'id_capa', as: 'capa' });

capasGrupo.belongsTo(CapasGrupo, { foreignKey: 'id_grupo', as: 'grupo' });
CapasGrupo.hasMany(capasGrupo, { foreignKey: 'id_grupo', as: 'capas' });

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
export default capasGrupo;
