import CapasSuperGrupo from '../../../models/maestros/administracion/capasSuperGrupo.js';

export class CapasSuperGrupoService {

    async getAllCapasSuperGrupo(pageNumber, pageSize) {
        try {
        const offset = (pageNumber - 1) * pageSize;
        const tipoVias = await CapasSuperGrupo.findAndCountAll({
            offset,
            limit: pageSize,
        });
        const totalItems = tipoVias.count;
        const totalPages = Math.ceil(totalItems / pageSize);
        return {
            items: tipoVias.rows,
            currentPage: parseInt(pageNumber),
            totalPages,
            totalItems,
        };
        } catch (error) {
        throw new Error('Error al obtener los tipos de vía....'+ error);
        }
    }
}
