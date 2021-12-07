<script context="module">
	export const prerender = true;
	export async function load({ fetch, page: { path } }) {
		const res = await fetch(`${path}.json`);
		if (res.ok) {
			const { post } = await res.json();
			return {
				props: { post }
			};
		}
	}
</script>

<script lang="ts">
	import Header from '$lib/components/SEO/index.svelte';
	export let post = null;
	let html = post?.html;
	let slug = post?.slug;
	let title = post?.title;
	let excerpt = post?.excerpt;
	let date = post?.date;
	let timeToReadInMinutes = post?.timeToReadInMinutes;
</script>

<Header
	{slug}
	{title}
	metadescription={excerpt}
	article={true}
	lastUpdated={date}
	datePublished={date}
	timeToRead={timeToReadInMinutes}
/>
<h1>
	{title}
</h1>
<article class="all-prose">
	{@html html}
</article>
