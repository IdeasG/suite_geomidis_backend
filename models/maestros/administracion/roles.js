import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const Roles = sequelize.define('tseg_roles', {
    // Model attributes are defined here
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    c_nombre_rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_tipo_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    c_desc_rol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    b_rol: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
    }, {
    schema: 'seguridad',
    // Other model options go here
});
// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
export default Roles;