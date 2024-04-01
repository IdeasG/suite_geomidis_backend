import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Solicitud = sequelize.define(
  "solicitudes",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_geoportal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nacionalidad: {
      type: DataTypes.STRING(100),
    },
    tipo_documento: {
      type: DataTypes.STRING(50),
    },
    numero_documento: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    telefono_personal: {
      type: DataTypes.STRING(20),
    },
    ocupacion: {
      type: DataTypes.TEXT,
    },
    institucion_trabajo: {
      type: DataTypes.TEXT,
    },
    cargo: {
      type: DataTypes.TEXT,
    },
    motivacion_geovisor: {
      type: DataTypes.TEXT,
    },
    b_solicitud: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    d_solicitud: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    d_estado: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    schema: "public",
  }
);

export default Solicitud;
