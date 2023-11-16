import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
const HabUrbana = sequelize.define(
  "sp_hab_urbana",
  {
    id_hab_urbana: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_tipo_hu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cod_hab_urb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre_hab_urb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grup_urb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_cat_ccpp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_crea_hab: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_crea_hab: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    etiqueta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado_hab: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    schema: "espaciales",
  }
);

export default HabUrbana;
