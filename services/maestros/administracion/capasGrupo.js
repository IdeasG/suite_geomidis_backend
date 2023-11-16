import CapasGrupo from '../../../models/maestros/administracion/capasGrupo.js';

export class CapasGrupoService {
    async getAllCapasGrupos(pageNumber, pageSize) {
        try {
        const offset = (pageNumber - 1) * pageSize;
        const tipoVias = await CapasGrupo.findAndCountAll({
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
