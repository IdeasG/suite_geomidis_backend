import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const CapasEstilos = sequelize.define('tadm_capas_estilos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id_capa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tadm_capas',
      key: 'id_capa'
    }
  },
  c_estilo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  schema: 'administracion',
  timestamps: false
});

export default CapasEstilos;