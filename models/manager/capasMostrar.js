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
        c_campo_original: {
        type: DataTypes.STRING,
        allowNull: false
        },
        c_campo_alias: {
        type: DataTypes.STRING,
        allowNull: false
        },
        b_campo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
        }
    },
    {
        schema: "administracion",
    }
);

export default CamposMostrar;
