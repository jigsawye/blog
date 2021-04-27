import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import PostType from '../types/post'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export const getPostBySlug = async <K extends keyof PostType>(slug: string, fields: K[] = []): Promise<Record<K, string>> => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Partial<Record<K, string>> = {}

  // Ensure only the minimal needed data is exposed
  for (let field of fields) {
    if (field === 'slug') {
      items[field] = realSlug.replace(/([0-9]+)-([0-9]+)-([0-9]+)-(.+)/g, '$1/$2/$3/$4');
    } else if (field === 'content') {
      items[field] = content;
    } else if (field === 'excerpt') {
      items[field] = content.split('<!-- more -->')[0];
    }else if (field === 'date') {
      items[field] = new Date(data[field]).toISOString()
    } else if (data[field]) {
      items[field] = data[field]
    }
  }

  return items as Record<K, string>
}

export const getPosts = async <K extends keyof PostType>(fields: K[] = []) => {
  const slugs = getPostSlugs()

  const posts = (await Promise.all(slugs
    .map((slug) => getPostBySlug(slug, [...fields, 'date']))))
    // sort posts by date in descending order
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}
