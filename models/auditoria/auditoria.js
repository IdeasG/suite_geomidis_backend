import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Auditoria = sequelize.define(
  "auditoria",
  {
    id_auditoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    accion: {
      type: DataTypes.STRING,
    },
    tabla: {
      type: DataTypes.STRING,
    },
    id_accion: {
      type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
    },
    id_rol: {
      type: DataTypes.INTEGER,
    },
    nombre_accion: {
      type: DataTypes.STRING,
    }
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default Auditoria;
