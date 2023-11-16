import HabUrbana from "../../models/espaciales/habUrbana.js";

export class HabUrbanaService {
  async getAllHabUrbana() {
    try {
      const data = await HabUrbana.findAll();
      return {
        habUrbana: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información maestra...." + error);
    }
  }
}
