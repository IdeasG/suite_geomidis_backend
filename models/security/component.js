import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Component = sequelize.define(
  "components_map",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    component_name: {
      type: DataTypes.STRING,
    },
    props: {
      type: DataTypes.JSONB,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default Component;
