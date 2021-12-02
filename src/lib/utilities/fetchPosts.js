import glob from 'glob-fs';
import fs from 'fs';
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';
import plainText from 'markdown-it-plain-text';

const fetchPosts = () => {
	return glob({ gitignore: true })
		.readdirSync('src/routes/posts/**/*.md')
		.reverse()
		.map((postFilePath) => {
			const components = postFilePath.split('/').slice(-4);
			const metadata = fm(fs.readFileSync(postFilePath, 'utf8'));
			const mdExcerpt = `${metadata.body.substring(0, 250)}...`;
			const md = new MarkdownIt();
			md.use(plainText);
			md.render(mdExcerpt);
			const excerpt = md.plainText;
			const year = components[0];
			const month = components[1];
			const day = components[2];
			const name = components[3].replace('.svelte.md', '');
			const slug = `/posts/${year}/${month}/${day}/${name}`;
			const formattedDate = `${day}-${month}-${year}`;
			return {
				year,
				month,
				day,
				name,
				formattedDate,
				slug,
				excerpt,
				title: metadata.attributes['title']
			};
		});
};
export default fetchPosts;
