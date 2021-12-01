#!/usr/bin/env node

import glob from "glob-fs";
import path from "path";

let posts = glob({gitignore: true}).readdirSync("posts/*.md")
posts = posts.map((postFilePath) => {
    // posts/2021-02-02-my-post.md
    const components = postFilePath.split("/")[1].split("-")
    const year = components[0]
    const month = components[1]
    const day = components[2]
    const name = components.slice(3).join("-").replace(".md", ".svelte.md")
    return {
        from: postFilePath,
        to: `src/routes/posts/${year}/${month}/${day}/${name}`,
        redirectFrom: `/${year}/${month}/${day}/${name.replace(".svelte.md", "")}`,
        redirectTo: `/posts/${year}/${month}/${day}/${name.replace(".svelte.md", "")}`,
    }
})
console.log(posts[0]);