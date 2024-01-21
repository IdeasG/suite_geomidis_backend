import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const SuperGrupo = sequelize.define(
  "tadm_capas_supergrupo",
  {
    id_super_grupo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    c_nombre_super_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    b_super_grupo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default SuperGrupo;
