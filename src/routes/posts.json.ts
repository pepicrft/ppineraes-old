import type { RequestHandler } from '@sveltejs/kit';
import fetchPosts from '$lib/utilities/fetchPosts';

export const get: RequestHandler = async (request) => {
	const headers = {
		'Cache-Control': `max-age=0, s-max-age=${600}`,
		'Content-Type': 'application/json'
	};
	return {
		body: fetchPosts(),
		headers
	};
};
