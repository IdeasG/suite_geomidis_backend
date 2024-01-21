import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Rol = sequelize.define(
  "tseg_roles",
  {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
    },
    c_nombre_rol: {
      type: DataTypes.STRING,
    },
    b_rol: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    schema: "seguridad",
    timestamps: false,
  }
);

export default Rol;
