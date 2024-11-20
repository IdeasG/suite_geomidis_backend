import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Iiee = sequelize.define(
  "iiee",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    geom_utm: {
      type: DataTypes.GEOMETRY("POINT", 32718),
      allowNull: true,
    },
    objectid: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    vcodmodula: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vanexo: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vcodlocal: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vinseducat: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vlocalidad: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vcodcpinei: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vcodccpp: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vcenpoblad: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vcodareace: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    varecenso: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vcodubigeo: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vdirgenreg: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vcodooii: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vdreugel: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vcodtippro: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vtipprogra: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vcodturno: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vturno: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    dtfecreg: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    dtfecact: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    x: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    y: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    vnivmodali: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    vgestion: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
  },
  {
    schema: "espaciales",
    timestamps: false,
  }
);

export default Iiee;
