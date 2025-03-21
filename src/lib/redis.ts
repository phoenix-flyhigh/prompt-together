import { createClient } from "redis";

const redis = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_DB_URL,
    port: Number(process.env.REDIS_DB_PORT),
  },
});

redis.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await redis.connect();
})();

export default redis;
