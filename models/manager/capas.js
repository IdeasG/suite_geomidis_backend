import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Capa = sequelize.define(
  "tadm_capas",
  {
    id_capa: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_nombre_tabla_capa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_nombre_public_capa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_sql_capa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    b_capa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    c_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_servicio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_nombre_geoserver: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_nombre_esquema: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_usuario_auditoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_rol_auditoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    c_url_seleccionado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    b_geoportal: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    c_workspace: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default Capa;
