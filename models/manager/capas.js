import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Capa = sequelize.define(
  "tadm_capas",
  {
    id_capa: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_nombre_tabla_capa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_nombre_public_capa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_sql_capa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    b_capa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    b_geoportal: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default Capa;
