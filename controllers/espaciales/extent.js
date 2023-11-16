import { ExtentService } from "../../services/espaciales/extent.js";

const extentService = new ExtentService();

export class ExtentController {
  constructor() {}

  async getExtentAll(req, res) {
    const { id, tabla, columna } = req.body;
    try {
      const dbResponse = await extentService.getExtentAll(id, tabla, columna);
      let data = dbResponse[0][0].bextent;
      var extent = data.replace(',',' ').substr(4, (data.length-5)).split(" ");
      var ext = [parseInt(extent[0]), parseInt(extent[1]), parseInt(extent[2]), parseInt(extent[3])]
      res.status(200).json({status: 'success', data: ext});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getExtentTable(req, res) {
    const { tabla } = req.body;
    console.log(tabla);
    try {
      const dbResponse = await extentService.getExtentTable(tabla);
      console.log(dbResponse);
      let data = dbResponse[0][0].bextent;
      var extent = data.replace(',',' ').substr(4, (data.length-5)).split(" ");
      var ext = [parseInt(extent[0]), parseInt(extent[1]), parseInt(extent[2]), parseInt(extent[3])]
      res.status(200).json({status: 'success', data: ext});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
