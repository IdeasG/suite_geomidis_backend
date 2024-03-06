import { sequelize } from "../../config/postgres/sequelize.js";

export class ExtentService {
    async getExtentAll(id, tabla, columna) {

        try {
        // const distrito = await SpDistrito.findAll();
        const dbResponse = await sequelize.query(`SELECT CAST(ST_Extent(ST_Transform(glgis, 3857)) AS VARCHAR) as bextent FROM 
        (SELECT * FROM espaciales.${tabla} WHERE ${columna} = ${id} ) as t`)
        return dbResponse;
        } catch (error) {
        throw new Error("Error al obtener la extensión." + error);
        }
    }

    async getExtentTable(tabla) {
        try {
        // const distrito = await SpDistrito.findAll();
        let nombreGeometria = 'geom'
        const dbResponse = await sequelize.query(
            `SELECT CAST(ST_Extent(ST_Transform(ST_SetSRID(`+nombreGeometria+`, 4326), 3857)) AS VARCHAR) AS bextent from espaciales.${tabla}`
        );
        return dbResponse;
        } catch (error) {
        throw new Error("Error al obtener la extensión." + error);
        }
    }
}
