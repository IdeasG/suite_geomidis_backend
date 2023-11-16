import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const SpVias = sequelize.define(
  "sp_vias",
  {
    id_via: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    c_cod_via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_nomb_via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cod_tipo_via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cod_clasif_via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_doc_crea_via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    d_crea_via: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    glgis: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
    },
    c_etiqueta_via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_obs_via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    n_ancho_via: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    c_fuente_nomb_via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_seccion_via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    valor_arancel: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    id_via_s: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    long_m: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    id_via_urbano: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    etiqueta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    b_via: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    schema: "espaciales",
  }
);
export default SpVias;
