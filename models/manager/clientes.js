import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Cliente = sequelize.define(
  "clientes",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    logo_horizontal: {
      type: DataTypes.STRING,
    },
    portada: {
      type: DataTypes.STRING,
    },
    color_primary: {
      type: DataTypes.STRING,
    },
    color_secundary: {
      type: DataTypes.STRING,
    },
    color_tercero: {
      type: DataTypes.STRING,
    },
    color_cuarto: {
      type: DataTypes.STRING,
    },
    celular: {
      type: DataTypes.STRING,
    },
    pais: {
      type: DataTypes.STRING,
    },
    ubigeo: {
      type: DataTypes.STRING,
    },
    organizacion: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    referencia: {
      type: DataTypes.STRING,
    },
    correo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    cargo: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "suite",
    timestamps: false,
  }
);

export default Cliente;
