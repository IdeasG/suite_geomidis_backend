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
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default GrupoCapa;
