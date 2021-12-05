const modules = import.meta.globEager('/posts/**/*.md')

export const posts = Object.entries(modules).map(
  ([filepath, module]) => {
    const path = filepath.replace("/posts/", "").replace(".md", "");
    const components = path.split("-");
    const slug = `/${components[0]}/${components[1]}/${components[2]}/${components.slice(3).join("-")}`
    const { metadata } = module
    const { html } = module.default.render()
    return {
      slug,
      html,
      ...metadata,
    }
  }
)