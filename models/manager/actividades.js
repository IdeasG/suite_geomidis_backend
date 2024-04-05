import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Actividades = sequelize.define(
  "tadm_actividades",
  {
    id_actividad: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    c_titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_subtitulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default Actividades;
