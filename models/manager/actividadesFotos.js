import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const ActividadesFotos = sequelize.define(
  "tadm_actividades_fotos",
  {
    id_foto: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_actividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_ruta_foto: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default ActividadesFotos;
