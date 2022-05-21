<script context="module">
	export const prerender = true;

	export async function load({ fetch, session, stuff }) {
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
	import Header from '$lib/components/SEO/index.svelte';
	import { Obfuscate } from 'svelte-obfuscate';

	export let posts = [];
</script>

<Header
	slug="/"
	title="Pedro Piñera's corner in the Internet"
	metadescription="This my tiny corner in the Internet, I share my experiences, adventures, ideas, and thoughts."
/>

<header>
	<img src="/avatars/avatar.png" class="avatar" />
	<h1>~/pedro-piñera/src/</h1>
	<p>Hola 👋.</p>
	<p>
		I'm <a href="/about"><b>Pedro Piñera</b></a>. I'm a Staff Production Engineer at Shopify and a
		open-source enthusiast. I fight for open, small, and human technology. I enjoy devising and
		building developer tools that spark joy. Typescript 🚀, Ruby 💎, Rust 🦀 are my day-to-day
		languages.
	</p>
	<p>
		I devised and created <a href="https://tuist.io">Tuist</a> to help teams scale up Xcode
		projects, proposed a modular architecture to build apps,
		<a href="https://docs.tuist.io/building-at-scale/microfeatures" target="_blank"
			>µfeatures architecture</a
		>. I'm now focused on building a framework for building apps with web technologies,
		<a href="https://gestaltjs.org">Gestalt</a>.
	</p>
	<p>
		I sporadically dump my brain's chaos into <a href="/archive">blog posts</a>.
	</p>
	<p>
		I have a profile on <a href="https://pixelfed.social/pepicrft" target="_blank">Pixelfed</a> where
		I publish photos.
	</p>
	<p>
		You can conctact me via email <Obfuscate email="hola@craftweg.com" />, and find me on
		<a href="https://github.com/pepicrft" target="_blank">GitHub</a>,
		<a href="https://twitter.com/pepicrft" target="_blank">Twitter</a>, and
		<a href="https://www.linkedin.com/in/pedro-pi%C3%B1era-buendia-9765a9125/" target="_blank"
			>LinkedIn</a
		>
	</p>
</header>

<main />

<style lang="scss">
	.avatar {
		display: inline;
		width: 200px;
	}
</style>
