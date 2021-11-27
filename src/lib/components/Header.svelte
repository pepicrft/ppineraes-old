<script lang="ts">
	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	$: derivedTitle = title ? `${title} | Craftweg` : 'Craftweg';
	$: derivedDescription = description
		? description
		: 'Pedro Piñera’s corner on the internet to share his experiences crafting software.';
</script>

<svelte:head>
	<!-- HTML-->
	<title>{derivedTitle}</title>
	<meta name="description" content={derivedDescription} />

	<!-- Open Graph-->
	<meta property="og:description" content={derivedDescription} />
	<meta property="og:url" content="https://craftweg.com/" />
	<meta property="og:site_name" content="Craftweg" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter-->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@pepibumur" />
	<meta name="twitter:creator" content="@pepibumur" />
	<meta name="twitter:dnt" content="on" />
	<meta name="twitter:widgets:theme" content="light" />
</svelte:head>
