import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const UsoCapas = sequelize.define(
  "uso_capas",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: true },
    id_rol: { type: DataTypes.INTEGER, allowNull: true },
    id_geovisor: { type: DataTypes.INTEGER, allowNull: true },
    id_capa: { type: DataTypes.INTEGER, allowNull: false },
    accion: { type: DataTypes.STRING, allowNull: false },
    detalles: { type: DataTypes.JSONB },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    ip: { type: DataTypes.STRING },
    c_tipo_usuario: { type: DataTypes.STRING },
  },
  { schema: "auditoria", timestamps: false }
);

export default UsoCapas;
