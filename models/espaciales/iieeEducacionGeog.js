import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const IieeEducacionGeog = sequelize.define(
  "iiee_educacion_geog",
  {
    gid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ubigeo: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    codcp_inei: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_dpto: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_prov: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_dist: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    cen_pob: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    cod_mod: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    codlocal: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    cen_edu: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    cen_ed_etq: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_niv_mod: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_forma: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_tipssexo: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_gestion: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_ges_dep: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    dir_cen: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    localidad: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    dareacenso: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_region: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_dreugel: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_cod_tur: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    d_estado: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    talum_hom: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    talum_muj: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    talumno: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tdocente: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fecha_act: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    nivel_etq: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    latitud: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    longitud: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
  },
  {
    schema: "espaciales",
    timestamps: false,
  }
);

export default IieeEducacionGeog;
