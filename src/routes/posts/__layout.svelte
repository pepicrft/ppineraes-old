<script context="module">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const url = `/posts.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					posts: (await res.json()).slice(0, 5)
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import { page } from '$app/stores';

	const path = $page.path;
	export let posts = [];
	const title = posts.find((post) => post.slug.includes(path)).title;
</script>

<h1>
	{title}
</h1>

<slot />
