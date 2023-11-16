import "dotenv/config";

import { validatePagination } from "../../../schemas/generales/pagination.js";

import { RolesService } from "../../../services/maestros/administracion/roles.js";

import { redisClient } from "../../../config/redis/redis.js";

const rolesService = new RolesService();

export class RolesController {
    constructor() {}

    async getAll(req, res) {
        const result = validatePagination(req.query);
        if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        // const { page = 1, pageSize = 5 } = result.data;
        try {
        const cacheKey = req.originalUrl;
        const cachedResponse = await redisClient.get(cacheKey);
        if (cachedResponse) {
            const parsedResponse = JSON.parse(cachedResponse);
            return res.json(parsedResponse);
        }
        const tipoVias = await rolesService.getAllRoles();
        const cacheExpiry = process.env.REDIS_TIME_CACHE;
        await redisClient.setex(cacheKey, cacheExpiry, JSON.stringify(tipoVias));

        res.json(tipoVias);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
}
