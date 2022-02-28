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
		I'm <b>Pedro Piñera</b>. I'm a Staff Production Engineer at Shopify and a open-source
		enthusiast. I fight for open, small, and human technology. I enjoy devising and building
		developer tools that spark joy. Ruby 💎, Swift 🐦, Rust 🦀, Typescript 🚀 are my day-to-day
		languages.
	</p>
	<p>
		Join <a
			href="https://join.slack.com/t/craftweg/shared_invite/zt-q1ab0kza-nFfA1pLCkafi3_cU85yIRQ"
			target="_blank">Craftweg's Slack channel</a
		> to say hi. Don't be shy!
	</p>
</header>

<main>
	<ul>
		<li>Pages</li>
		<ul>
			<li><a href="/about">About</a></li>
			<li><a href="/stack">Stack</a></li>
			<li><a href="https://www.instapaper.com/p/6377648" target="_blank">Read later</a></li>
		</ul>
		<li>All posts</li>
		<ul>
			{#each posts as post}
				<li>{post.formattedDate} <a href={post.slug}>{post.title}</a></li>
			{/each}
			<li><a href="/archive">See archive...</a></li>
		</ul>
		<li>Projects</li>
		<ul>
			<li><a href="https://tuist.io">tuist</a></li>
			<li>
				<a href="https://docs.tuist.io/building-at-scale/microfeatures" target="_blank"
					>µfeatures architecture</a
				>
			</li>
			<li><a href="https://github.com/backbone.sh">Backbone</a></li>
		</ul>
		<li><a href="/feed.xml">RSS</a></li>
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
				<a rel="me" href="https://fosstodon.org/@pepibumur">Mastodon</a>
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
