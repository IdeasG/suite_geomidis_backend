import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const UsoHerramientas = sequelize.define(
  "uso_herramientas",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    id_rol: { type: DataTypes.INTEGER, allowNull: false },
    id_geovisor: { type: DataTypes.INTEGER, allowNull: false },
    id_herramienta: { type: DataTypes.INTEGER, allowNull: false }, // Puede ser nombre o id
    resultado: { type: DataTypes.STRING },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    ip: { type: DataTypes.STRING },
    c_tipo_usuario: { type: DataTypes.STRING },
  },
  { schema: "auditoria", timestamps: false }
);

export default UsoHerramientas;
