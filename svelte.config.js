import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';
import glob from "glob-fs";

const postSlugs = glob({gitignore: true}).readdirSync("posts/*.md")
	.map((postFilePath) => {
		// posts/2021-02-02-my-post.md
		const components = postFilePath.split("/")[1].split("-")
		const year = components[0]
		const month = components[1]
		const day = components[2]
		const name = components.slice(3).join("-").replace(".md", "")
		return `/${year}/${month}/${day}/${name}`
	})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
		files: {
			assets: 'static'
		},
		prerender: {
			crawl: true,
			entries: [
				"/",
				"/about",
				"/stack",
				...postSlugs
			]
		}
	}
};

export default config;
