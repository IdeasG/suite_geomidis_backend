import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
const MapaBase = sequelize.define(
"tadm_mapa_base",
    {
        id_base: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        c_nomb_mapa: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        c_key: {
        type: DataTypes.STRING,
        allowNull: false
        },
        c_imagery_set: {
        type: DataTypes.STRING,
        allowNull: false
        },
        c_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        c_img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        b_key: {
        type: DataTypes.BOOLEAN,
        allowNull: true
        }
    },
    {
        schema: "administracion",
    }
);

export default MapaBase;
