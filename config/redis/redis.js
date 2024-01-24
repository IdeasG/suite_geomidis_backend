import Redis from "ioredis";
import "dotenv/config";

const redisClient = new Redis({
  host: process.env.REDIS_IP,
  port: process.env.REDIS_PORT,
});

export { redisClient };
