import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const CapaByRol = sequelize.define(
  "rol_capas",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_capa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario_auditoria:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_rol_auditoria:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default CapaByRol;
