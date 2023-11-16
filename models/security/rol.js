import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Rol = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_sistema: {
      type: DataTypes.INTEGER,
    },
    fk_cliente: {
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    b_rol: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default Rol;
