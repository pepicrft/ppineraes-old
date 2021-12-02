<script context="module">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const url = `/posts.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					posts: await res.json()
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
	export let posts = [];
</script>

<h1>Archive</h1>

<ul>
	{#each posts as post}
		<li>{post.formattedDate} <a href={post.slug}>{post.title}</a></li>
	{/each}
</ul>
