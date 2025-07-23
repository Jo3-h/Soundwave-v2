import { env } from '$env/dynamic/private';
import { Redis } from '@upstash/redis';

const client = new Redis({
	url: env.UPSTASH_REDIS_REST_URL,
	token: env.UPSTASH_REDIS_REST_TOKEN
});

export { client };
