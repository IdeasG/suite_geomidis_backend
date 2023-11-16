import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Perfil = sequelize.define(
  "perfiles",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pk_sistema: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default Perfil;
