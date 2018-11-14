/**
 * This service provides a simple in-memory storage
 * for data that comes from a remote server.
 *
 * In production environment, with multiple nodes,
 * it would be better to use a more advanced memory storage like redis.
 */
const MemoryCache = require('memory-cache');

module.exports = {
    cache: (key, data) => {
        // Create or update the memory cache.
        // A third argument would set a timeout, but
        // avoiding it, would store forever
        MemoryCache.put(key, data);

        // the data is returned to use this function as a middleware
        return data;
    },
    getCache: key => {
        return MemoryCache.get(key);
    }
}
