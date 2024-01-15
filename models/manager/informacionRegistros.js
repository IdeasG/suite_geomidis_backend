import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
const InformacionRegistro = sequelize.define(
"tg_informacion_registros",
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        a_registros_fallidos: {
        type: DataTypes.STRING,
        allowNull: false
        },
        c_programa: {
        type: DataTypes.STRING,
        allowNull: false
        },
        c_capa: {
        type: DataTypes.STRING,
        allowNull: false
        },
        d_registro: {
        type: DataTypes.DATE,
        allowNull: true
        }
    },
    {
        schema: "espaciales",
    }
);

export default InformacionRegistro;
