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
	import Header from '$lib/components/SEO/index.svelte';

	const path = $page.path;
	export let posts = [];
	let post = null;
	if (path !== '/archive') {
		post = posts.find((post) => post.slug.includes(path));
	}
</script>

{#if post}
	<Header slug={post.slug} title={post.title} metadescription={post.excerpt} />
	<h1>
		{post.title}
	</h1>
{/if}

<slot />
