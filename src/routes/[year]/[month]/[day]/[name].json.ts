import posts from '../../../_posts';

export async function get(req) {
	const { pathname: path } = req.url;
	const slug = path.replace('.json', '');
	const post = posts.find((post) => post.slug === slug);
	return {
		body: { post }
	};
}
