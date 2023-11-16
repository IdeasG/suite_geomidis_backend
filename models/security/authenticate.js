import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Authenticate = sequelize.define(
  "tseg_usuarios",
  {
    id_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
    },
    id_personal: {
      type: DataTypes.STRING,
    },
    c_usuario: {
      type: DataTypes.STRING,
    },
    c_contrasena: {
      type: DataTypes.STRING,
    },
    c_avatar: {
      type: DataTypes.STRING,
    },
    b_usuario: {
      type: DataTypes.BOOLEAN,
    },
    d_usuario: {
      type: DataTypes.TIME,
    },
  },
  {
    schema: "seguridad",
    timestamps: false,
  }
);

export default Authenticate;
