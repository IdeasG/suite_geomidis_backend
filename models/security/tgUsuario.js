import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const TgUsuario = sequelize.define(
  "tg_usuario",
  {
    id_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    codi_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ape_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ape_materno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_cese: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tipo_usuario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    b_usuario: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    id_cliente: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default TgUsuario;
