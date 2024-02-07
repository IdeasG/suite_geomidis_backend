import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
const CamposMostrar = sequelize.define(
"tadm_capas_campos_mostrar",
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        id_capa: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        c_array_campos: {
        type: DataTypes.STRING,
        allowNull: false
        },
        id_rol: {
        type: DataTypes.INTEGER,
        allowNull: true
        }
    },
    {
        schema: "administracion",
    }
);

export default CamposMostrar;
