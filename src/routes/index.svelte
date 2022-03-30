<script context="module">
	export const prerender = true;

	export async function load({ fetch, session, stuff }) {
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
	import Header from '$lib/components/SEO/index.svelte';
	import { Obfuscate } from 'svelte-obfuscate';

	export let posts = [];
</script>

<Header
	slug="/"
	title="Pedro Piñera's corner on the Internet"
	metadescription="Craftweg is my life-project towards making building software a craft. Is this tiny corner in the Internet, I share my experiences, adventures, ideas, and thoughts."
/>

<header>
	<img src="/avatars/avatar.png" class="avatar" />
	<h1>~/craftweg/src/</h1>
	<p>Hola 👋.</p>
	<p>
		I'm <a href="/about"><b>Pedro Piñera</b></a>. I'm a Staff Production Engineer at Shopify and a
		open-source enthusiast. I fight for open, small, and human technology. I enjoy devising and
		building developer tools that spark joy. Typescript 🚀, Ruby 💎, Rust 🦀 are my day-to-day
		languages.
	</p>
</header>

<main>
	<ul>
		<li>Pages</li>
		<li>All posts</li>
		<ul>
			{#each posts as post}
				<li>{post.formattedDate} <a href={post.slug}>{post.title}</a></li>
			{/each}
			<li><a href="/archive">See archive...</a></li>
		</ul>
		<li>Projects</li>
		<ul>
			<li><a href="https://github.com/gestaltjs">Gestalt</a></li>
			<li>Past: <a href="https://tuist.io">tuist</a></li>
			<li>
				Past: <a href="https://docs.tuist.io/building-at-scale/microfeatures" target="_blank"
					>µfeatures architecture</a
				>
			</li>
		</ul>
		<li><a href="https://craftweg.com/feed.xml">RSS</a></li>
		<li>Contact</li>
		<ul>
			<li><Obfuscate email="hola@craftweg.com" /></li>
		</ul>
		<li>On the internet</li>
		<ul>
			<li><a href="https://github.com/pepibumur" target="_blank">GitHub</a></li>
			<li><a href="https://gitlab.com/pepibumur" target="_blank">GitLab</a></li>
			<li><a href="https://twitter.com/pepibumur" target="_blank">Twitter</a></li>
			<li>
				<a href="https://www.linkedin.com/in/pedro-pi%C3%B1era-buendia-9765a9125/" target="_blank"
					>LinkedIn</a
				>
			</li>
			<li>
				<a rel="me" href="https://mastodon.craftweg.com/web/@pedro">@pedro@mastodon.craftweg.com</a>
			</li>
		</ul>
	</ul>
</main>

<style lang="scss">
	.avatar {
		display: inline;
		width: 200px;
	}
</style>
