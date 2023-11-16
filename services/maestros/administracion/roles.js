import Roles from '../../../models/maestros/administracion/roles.js';

export class RolesService {
    async getAllRoles(pageNumber, pageSize) {
        try {
        // const offset = (pageNumber - 1) * pageSize;
        const tipoVias = await Roles.findAndCountAll({
            // offset,
            // limit: pageSize,
        });
        // const totalItems = tipoVias.count;
        // const totalPages = Math.ceil(totalItems / pageSize);
        return {
            items: tipoVias.rows,
            // currentPage: parseInt(pageNumber),
            // totalPages,
            // totalItems,
        };
        } catch (error) {
        throw new Error('Error al obtener los tipos de vía....'+ error);
        }
    }
}
