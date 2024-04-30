import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const GrupoCapa = sequelize.define(
  "tadm_capas_grupo",
  {
    id_grupo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_super_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_nombre_grupo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    b_grupo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    id_usuario_auditoria: {
      type: DataTypes.INTEGER,
    },
    id_rol_auditoria: {
      type: DataTypes.INTEGER,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default GrupoCapa;
