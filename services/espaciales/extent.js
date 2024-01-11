import { sequelize } from "../../config/postgres/sequelize.js";

export class ExtentService {
    async getExtentAll(id, tabla, columna) {

        try {
        // const distrito = await SpDistrito.findAll();
        const dbResponse = await sequelize.query(`SELECT CAST(ST_Extent(ST_Transform(glgis, 3857)) AS VARCHAR) as bextent FROM 
        (SELECT * FROM espaciales.${tabla} WHERE ${columna} = ${id} ) as t`)
        return dbResponse;
        } catch (error) {
        throw new Error("Error al obtener la extensión.");
        }
    }

    async getExtentTable(tabla) {
        try {
        // const distrito = await SpDistrito.findAll();
        console.log(`SELECT CAST(ST_Extent(ST_Transform("IDEASG" , 3857)) AS VARCHAR) as bextent from espaciales.${tabla})`);
        const dbResponse = await sequelize.query(`SELECT CAST(ST_Extent(ST_Transform("IDEASG" , 3857)) AS VARCHAR) as bextent from espaciales.${tabla}`);
        return dbResponse;
        } catch (error) {
        throw new Error("Error al obtener la extensión.");
        }
    }
}
