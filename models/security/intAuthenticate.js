import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const IntAuthenticate = sequelize.define(
  "tg_usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tipo_usuario: {
      type: DataTypes.STRING(30),
    },
    activo: {
      type: DataTypes.BOOLEAN,
    },
    codi_usuario: {
      type: DataTypes.INTEGER,
    },
    dni: {
      type: DataTypes.STRING(8),
    },
    nombres: {
      type: DataTypes.STRING(50),
    },
    ape_paterno: {
      type: DataTypes.STRING(50),
    },
    ape_materno: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(50),
    },
    celular: {
      type: DataTypes.STRING(9),
    },
    fecha_creacion: {
      type: DataTypes.DATE,
    },
    fecha_cese: {
      type: DataTypes.DATE,
    },
    estado: {
      type: DataTypes.CHAR(1),
    },
    rol_id: {
      type: DataTypes.INTEGER,
    },
    b_usuario: {
      type: DataTypes.BOOLEAN,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
    },
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default IntAuthenticate;
