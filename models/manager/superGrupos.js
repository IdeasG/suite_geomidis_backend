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
    b_super_grupo: {
      type: DataTypes.INTEGER,
    },
    id_usuario_auditoria: {
      type: DataTypes.INTEGER,
    },
    id_rol_auditoria: {
      type: DataTypes.INTEGER,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default SuperGrupo;
