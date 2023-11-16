import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const UnicatDetail = sequelize.define(
  "tg_unicat_detail",
  {
    id_lote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_unicat: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    id_ficha: {
      type: DataTypes.INTEGER,
    },
    tipo_persona: {
      type: DataTypes.TEXT,
    },
    persona: {
      type: DataTypes.TEXT,
    },
    num_doc: {
      type: DataTypes.STRING,
    },
    cod_tipo_ficha: {
      type: DataTypes.STRING,
    },
    nro_ficha: {
      type: DataTypes.STRING,
    },
    c_cod_cuc: {
      type: DataTypes.STRING,
    },
    c_cod_cuc_ant: {
      type: DataTypes.TEXT,
    },
    cod_hoja_catastral: {
      type: DataTypes.TEXT,
    },
    c_cod_sector: {
      type: DataTypes.STRING(2),
    },
    c_cod_mzna: {
      type: DataTypes.STRING(3),
    },
    c_cod_lote: {
      type: DataTypes.STRING(3),
    },
    c_cod_edifica: {
      type: DataTypes.STRING(2),
    },
    c_cod_entrada: {
      type: DataTypes.STRING(2),
    },
    c_cod_piso: {
      type: DataTypes.STRING(2),
    },
    c_cod_unidad: {
      type: DataTypes.STRING(3),
    },
    c_cod_dc: {
      type: DataTypes.STRING(2),
    },
    c_cod_predial_rentas: {
      type: DataTypes.STRING,
    },
    c_ubigeo_dep: {
      type: DataTypes.STRING(2),
    },
    c_ubigeo_prov: {
      type: DataTypes.STRING(2),
    },
    c_ubigeo_dist: {
      type: DataTypes.STRING(2),
    },
    sml: {
      type: DataTypes.TEXT,
    },
    refcat: {
      type: DataTypes.TEXT,
    },
    b_unicat: {
      type: DataTypes.BOOLEAN,
    },
    estado: {
      type: DataTypes.BOOLEAN,
    },
    c_cod_contri_rentas: {
      type: DataTypes.STRING,
    },
    c_cod_unid_acum_cod_predial_rentas: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "public",
    timestamps: false,
    // Otros parámetros y opciones que necesites para tu modelo
  }
);

export default UnicatDetail;
