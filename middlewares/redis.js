import { redisClient } from "../config/redis/redis.js";

export const cacheMiddleware = async (req, res, next) => {
  const cacheKey = req.originalUrl;
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      res.json(JSON.parse(cachedData));
    } else {
      next();
    }
  } catch (error) {
    console.error("Error de caché:", error);
    next();
  }
};
