import ServicioPredio from "../../../models/fichas/individual/serviciosPredio.js";

export class ServicioPredioService {
  async getServicios(id_ficha) {
    try {
      const servicioPredio = await ServicioPredio.findAll({
        where: {
          id_ficha: id_ficha,
        },
      });
      return servicioPredio;
    } catch (error) {
      throw new Error("Error al obtener el servicio.");
    }
  }

  async addServicios(
    id_ficha,
    c_agua,
    c_luz,
    c_telefono,
    c_desague,
    c_gas,
    nro_cont_agua,
    nro_sum_luz,
    nro_sum_telefono,
    nro_sum_gas,
    c_internet,
    c_cable
  ) {
    try {
      const servicioPredio = await ServicioPredio.create({
        id_ficha,
        c_agua,
        c_luz,
        c_telefono,
        c_desague,
        c_gas,
        nro_cont_agua,
        nro_sum_luz,
        nro_sum_telefono,
        nro_sum_gas,
        c_internet,
        c_cable,
      });
      return servicioPredio;
    } catch (error) {
      throw new Error("Error al crear el servicio.");
    }
  }

  async updateServicios(
    id_ficha,
    c_agua,
    c_luz,
    c_telefono,
    c_desague,
    c_gas,
    nro_cont_agua,
    nro_sum_luz,
    nro_sum_telefono,
    nro_sum_gas,
    c_internet,
    c_cable,
    id_servicio
  ) {
    try {
      const [updatedRowsCount] = await ServicioPredio.update(
        {
          id_ficha,
          c_agua,
          c_luz,
          c_telefono,
          c_desague,
          c_gas,
          nro_cont_agua,
          nro_sum_luz,
          nro_sum_telefono,
          nro_sum_gas,
          c_internet,
          c_cable,
        },
        {
          where: {
            id_servicio: id_servicio,
          },
        }
      );
      return updatedRowsCount;
    } catch (error) {
      throw new Error("Error al actualizar el servicio.");
    }
  }

  async deleteServicios(id_servicio) {
    try {
      const servicioPredio = await ServicioPredio.destroy({
        where: {
          id_servicio: id_servicio,
        },
      });
      return servicioPredio;
    } catch (error) {
      throw new Error("Error al eliminar el servicio.");
    }
  }
}
