import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Eess = sequelize.define(
  "eess",
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
    instituci: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    código_ú: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    nombre_del: {
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
    dirección: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    código_di: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    código_re: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    código_mi: {
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
    código_ue: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    unidad_eje: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    categoria: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    teléfono: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    tipo_doc_c: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    nro_doc_ca: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    horario: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    inicio_de: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    director_m: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    situación: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    condición: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    inspecció: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    norte: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    este: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    cota: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    camas: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    ruc: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
  },
  {
    schema: "espaciales",
    timestamps: false,
  }
);

export default Eess;
