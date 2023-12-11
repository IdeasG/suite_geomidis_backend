import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
const Vistas = sequelize.define(
"tadm_vistas",
    {
        id_vistas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        c_extent: {
        type: DataTypes.STRING,
        allowNull: true
        },
        c_capas: {
        type: DataTypes.STRING,
        allowNull: true
        },
        c_mapa_base: {
        type: DataTypes.STRING,
        allowNull: true
        },
        c_nombre: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        schema: "administracion",
    }
);

export default Vistas;
