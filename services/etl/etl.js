import { sequelize } from "../../config/postgres/sequelize.js"; // Asegúrate de importar solo sequelize

export class EtlService {
  async registerTable(data) {
    const { nombreEsquema, nombreTabla, indices, fileData } = data;
    const batchSize = 10000; // Tamaño del lote

    const transaction = await sequelize.transaction();

    try {
      // Crear el esquema si no existe
      await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${nombreEsquema}`, { transaction });
      console.log(`Esquema ${nombreEsquema} creado o ya existe`);

      // Crear la tabla
      const columnsDefinition = indices.map(
        (indice) => `${indice.nombre} ${indice.tipo}`
      ).join(", ");
      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${nombreEsquema}.${nombreTabla} (${columnsDefinition})`;

      // Ejecutar la consulta de creación de la tabla
      await sequelize.query(createTableQuery, { transaction });
      console.log(`Tabla ${nombreTabla} creada en el esquema ${nombreEsquema}`);

      // Insertar datos en lotes
      for (let i = 0; i < fileData.length; i += batchSize) {
        const batch = fileData.slice(i, i + batchSize);
        const values = batch.map(row => {
          const rowValues = Object.values(row).map(value => {
            // Escapar apóstrofes y manejar valores nulos
            if (value === null || value === undefined) return 'NULL';
            return `'${String(value).replace(/'/g, "''")}'`;
          }).join(", ");
          return `(${rowValues})`;
        }).join(", ");

        const insertQuery = `INSERT INTO ${nombreEsquema}.${nombreTabla} (${Object.keys(fileData[0]).join(", ")}) VALUES ${values}`;
        await sequelize.query(insertQuery, { transaction });

        // Log del progreso
        console.log(`Insertados ${Math.min(i + batchSize, fileData.length)} de ${fileData.length} registros.`);
      }
      console.log(`Datos insertados en la tabla ${nombreTabla}`);

      // Confirmar la transacción
      await transaction.commit();
      return { message: "Tabla creada e insertada con éxito" };
    } catch (error) {
      // Revertir la transacción en caso de error
      console.error("Error al registrar la tabla:", error.message);
      await transaction.rollback();
      throw new Error("Error: " + error);
    }
  }
}
