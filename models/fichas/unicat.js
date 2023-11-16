import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Unicat = sequelize.define(
  "tg_unicat",
  {
    id_unicat: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    id_edificacion: {
      type: DataTypes.INTEGER,
    },
    id_lote: {
      type: DataTypes.STRING,
    },
    c_tipo_lote: {
      type: DataTypes.STRING,
    },
    c_cod_cuc: {
      type: DataTypes.STRING,
    },
    c_cod_cuc_ant: {
      type: DataTypes.STRING,
    },
    c_cod_hoja_cat: {
      type: DataTypes.STRING,
    },
    c_ubigeo_dep: {
      type: DataTypes.STRING,
    },
    c_ubigeo_prov: {
      type: DataTypes.STRING,
    },
    c_ubigeo_dist: {
      type: DataTypes.STRING,
    },
    c_cod_sector: {
      type: DataTypes.STRING,
    },
    c_cod_mzna: {
      type: DataTypes.STRING,
    },
    c_cod_lote: {
      type: DataTypes.STRING,
    },
    c_cod_edifica: {
      type: DataTypes.STRING,
    },
    c_cod_entrada: {
      type: DataTypes.STRING,
    },
    c_cod_piso: {
      type: DataTypes.STRING,
    },
    c_cod_unidad: {
      type: DataTypes.STRING,
    },
    c_cod_dc: {
      type: DataTypes.STRING,
    },
    c_cod_contri_rentas: {
      type: DataTypes.STRING,
    },
    c_cod_predial_rentas: {
      type: DataTypes.STRING,
    },
    c_cod_unid_acum_cod_predial_rentas: {
      type: DataTypes.STRING,
    },
    id_predio_rural: {
      type: DataTypes.INTEGER,
    },
    c_cod_predio_rural: {
      type: DataTypes.STRING,
    },
    c_cod_zona_rural: {
      type: DataTypes.STRING,
    },
    c_unid_org_cat_rural: {
      type: DataTypes.STRING,
    },
    c_unid_cat_rural: {
      type: DataTypes.STRING,
    },
    b_unicat: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    d_insert_unicat: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    d_update_unicat: {
      type: DataTypes.DATE,
    },
    d_historio_unicat: {
      type: DataTypes.DATE,
    },
    id_usuario: {
      type: DataTypes.STRING,
    },
    id_lote_s: {
      type: DataTypes.STRING,
    },
    id_edificacion_s: {
      type: DataTypes.STRING,
    },
    ip_usuario: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default Unicat;
