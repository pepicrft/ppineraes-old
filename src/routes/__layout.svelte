<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<title>Craftweg | Pedro Piñera's corner in the Internet</title>

	<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
	<link rel="manifest" href="/favicons/site.webmanifest" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />

	<meta name="twitter:site" content="@pepibumur" />
	<meta name="twitter:creator" content="@pepibumur" />
	<meta name="twitter:image" content="" />
	<meta name="twitter:image:alt" content="Pedro Piñera Buendía" />
	<meta name="twitter:dnt" content="on" />
	<meta name="twitter:widgets:theme" content="light" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Merriweather" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@600;800&display=swap"
		rel="stylesheet"
	/>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@radix-ui/colors@latest/sky.css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@radix-ui/colors@latest/purple.css" />
</svelte:head>

<main class="page-content" aria-label="Content">	
	<div class="wrapper">
		{#if $page.path !== "/" }
			<a href="/">Back</a>
		{/if}
		<slot />
	</div>
</main>

<style lang="scss" src="../styles/main.scss" global/>
