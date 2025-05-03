import { createClient } from 'redis';

// Create Redis client
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Connect to Redis
redisClient.connect().catch((err) => {
    console.error('Redis connection error:', err);
    process.exit(1);
});

// Handle Redis errors
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Handle successful connection
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

export { redisClient };