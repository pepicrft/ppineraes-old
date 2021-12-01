#!/usr/bin/env node

import glob from "glob-fs";
import path from "path";
import fs from "fs";
import { exit } from "process";

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
if (posts.length === 0) { exit(0); }

const redirectFileContent = posts.map((post) => {
    return `${post.redirectFrom}    ${post.redirectTo}`
}).join("\n")

fs.writeFileSync("_redirects", redirectFileContent)

posts.forEach((post) => {
    const directoryName = path.dirname(post.to);
    fs.mkdirSync(directoryName, { recursive: true })
    fs.renameSync(post.from, post.to);
})

console.log(posts[0]);