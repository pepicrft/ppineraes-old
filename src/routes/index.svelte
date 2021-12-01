<script context="module">
	export const prerender = true;
</script>

<script>
	import Header from '$lib/components/SEO/index.svelte';
</script>

<Header
	slug="/"
	title="Pedro Piñera's corner on the Internet"
	metadescription="Craftweg is my life-project towards making building software a craft. Is this tiny corner in the Internet, I share my experiences, adventures, ideas, and thoughts."
/>

<header>
	<h1>Craftweg</h1>
	<p>Hola 👋.</p>
	<p>
		I'm <b>Pedro Piñera</b>. I'm a Staff Production Engineer at Shopify, and a open-source
		enthusiast. I enjoy devising and building developer tools that spark joy. Ruby 💎, Swift 🐦,
		Rust 🦀, Typescript 🚀 are my day-to-day languages.
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
			<li><a href="/bookshelve">Bookshelf</a></li>
			<li><a href="/bookshelve">Micro-posts</a></li>
			<li><a href="https://www.instapaper.com/p/6377648" target="_blank">Read later</a></li>
		</ul>
		<li>Projects</li>
		<ul>
			<li><a href="https://tuist.io">tuist</a></li>
			<li>
				<a href="https://docs.tuist.io/building-at-scale/microfeatures" target="_blank"
					>µfeatures architecture</a
				>
			</li>
		</ul>
		<li><a href="/feed.xml">RSS</a></li>
		<li>Contact</li>
		<ul>
			<li><a href="mailto:pedro@craftweg.com" target="_blank">pedro@craftweg.com</a></li>
		</ul>
		<li>On the internet</li>
		<ul>
			<li><a href="https://github.com/pepibumur" target="_blank">GitHub</a></li>
			<li><a href="https://gitlab.com/pepibumur" target="_blank">GitLab</a></li>
			<li><a href="https://twitter.com/pepibumur" target="_blank">Twitter</a></li>
		</ul>
	</ul>
</main>
