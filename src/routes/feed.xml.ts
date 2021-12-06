import type { RequestHandler } from "@sveltejs/kit";
import website from "$lib/config/website";
import { posts } from "./_posts";
import xmlescape from "xml-escape";

export const get: RequestHandler = async (request) => {  
  const headers = {
    'Cache-Control': `max-age=0, s-max-age=${600}`,
    'Content-Type': 'application/xml',
  };
  return {
    body: render(posts),
    headers,
  };
};

const render = (posts) => `<feed xmlns="http://www.w3.org/2005/Atom">
<link href="${website.siteUrl}/feed.xml" rel="self" type="application/atom+xml"/>
<link href="${website.siteUrl}" rel="alternate" type="text/html"/>
<updated>2021-11-30T08:59:12+00:00</updated>
<id>${website.siteUrl}/feed.xml</id>
<title type="html">Craftweg</title>
<link>${website.siteUrl}</link>
<subtitle>${website.description}</subtitle>

<author>
  <name>Pedro Piñera</name>
</author>

${posts
  .map(
    (post) => `
    <entry>
      <title type="html">${post.title}</title>
      <link href="${website.siteUrl}${post.slug}" rel="alternate" type="text/html" title="${post.title}"/>
      <published>2021-11-29T00:00:00+00:00</published>
      <updated>2021-11-29T00:00:00+00:00</updated>
      <id>${website.siteUrl}${post.slug}</id>
      <content type="html" xml:base="${website.siteUrl}${post.slug}">${xmlescape(post.html)}</content>
      <author>
      <name>Pedro Piñera</name>
      </author>
      ${post.tags.map((tag) => {
        return `<category term="${xmlescape(tag)}"/>`
      }).join('')}
      <summary type="html">${xmlescape(post.excerpt)}</summary>
    </entry>
    `
  )
  .join('')}
</feed>
`;