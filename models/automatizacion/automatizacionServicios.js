import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const AutomatizacionServicios = sequelize.define(
  "automatizacion_servicios",
  {
    id_as: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    c_servicio: {
      type: DataTypes.STRING,
    },
    c_programa: {
      type: DataTypes.STRING,
    },
    c_tabla: {
      type: DataTypes.STRING,
    },
    d_ultima_fecha: {
        type: DataTypes.STRING,
    },
    n_periodo: {
        type: DataTypes.INTEGER,
    }
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default AutomatizacionServicios;
