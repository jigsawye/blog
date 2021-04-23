import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import markdownToHtml from './markdownToHtml'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  for await (let field of fields) {
    if (field === 'slug') {
      items[field] = realSlug.replace(/([0-9]+)-([0-9]+)-([0-9]+)-(.+)/g, '$1/$2/$3/$4');
    } else if (field === 'content') {
      items[field] = await markdownToHtml(content);
    } else if (field === 'excerpt') {
      items[field] = await markdownToHtml(content.split('<!-- more -->')[0]);
    }else if (field === 'date') {
      items[field] = new Date(data[field]).toISOString()
    } else if (data[field]) {
      items[field] = data[field]
    }
  }

  return items
}

export async function getPosts(fields: string[] = []) {
  const slugs = getPostSlugs()

  const posts = (await Promise.all(slugs
    .map((slug) => getPostBySlug(slug, fields))))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts
}
