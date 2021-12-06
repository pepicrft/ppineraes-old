import { posts } from '../../../_posts'

export async function get(req) {
    const { path } = req
    const slug = path.replace(".json", "")
    const sortedPosts = Object.keys(posts).map(key => posts[key])
    const post = sortedPosts.find(post => post.slug === slug)
    return {
        body: { post },
    }
}