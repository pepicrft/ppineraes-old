<script>
	import website from '$lib/config/website';
	import OpenGraph from './OpenGraph.svelte';
	import SchemaOrg from './SchemaOrg.svelte';
	import Twitter from './Twitter.svelte';
	const {
		author,
		entity,
		ogLanguage,
		siteLanguage,
		siteShortTitle,
		siteTitle,
		siteUrl,
		githubPage,
		linkedinProfile,
		twitterUsername
	} = website;
	export let article = false;
	export let breadcrumbs = [];
	export let entityMeta = null;
	export let lastUpdated = null;
	export let datePublished = null;
	export let metadescription;
	export let slug;
	export let timeToRead = 0;
	export let title;
	const defaultAlt = "Pedro's avatar";
	export let featuredImage = {
		url: `${siteUrl}/avatars/roboto-head.png`,
		alt: defaultAlt,
		width: 580,
		height: 580,
		caption: 'Home page'
	};
	export let ogImage = {
		url: `${siteUrl}/avatars/roboto-head.png`,
		alt: defaultAlt
	};
	export let ogSquareImage = {
		url: `${siteUrl}/avatars/roboto-head.png`,
		alt: defaultAlt
	};
	export let twitterImage = {
		url: `${siteUrl}/avatars/roboto-head.png`,
		alt: defaultAlt
	};
	const url = `${siteUrl}/${slug}`;
	const pageTitle = `${siteTitle} | ${title}`;
	const openGraphProps = {
		article,
		datePublished,
		lastUpdated,
		image: ogImage,
		squareImage: ogSquareImage,
		metadescription,
		ogLanguage,
		pageTitle,
		siteTitle,
		url,
		...(article ? { datePublished, lastUpdated } : {})
	};
	const schemaOrgProps = {
		article,
		author,
		breadcrumbs,
		datePublished,
		entity,
		lastUpdated,
		entityMeta,
		featuredImage,
		metadescription,
		siteLanguage,
		siteTitle,
		siteTitleAlt: siteShortTitle,
		siteUrl,
		title: pageTitle,
		url,
		githubPage,
		linkedinProfile,
		twitterUsername
	};
	const twitterProps = {
		article,
		author,
		twitterUsername,
		image: twitterImage,
		timeToRead
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metadescription} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<html lang={siteLanguage} />
</svelte:head>
<Twitter {...twitterProps} />
<OpenGraph {...openGraphProps} />
<SchemaOrg {...schemaOrgProps} />
