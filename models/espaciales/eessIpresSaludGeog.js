import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const EessIpresSaludGeog = sequelize.define(
  "eess_ipres_salud_geog",
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
    departamen: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    provincia: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    distrito: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    ubigeo: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    institucio: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    codunico: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    nombestabl: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    nomb_eqt: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    clasificac: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    categoria: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    coddisa: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    codred: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    codmicrorr: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    disa: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    red: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    microrred: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    cod_ue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    unidejecut: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    horario: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    x: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    y: {
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

export default EessIpresSaludGeog;
