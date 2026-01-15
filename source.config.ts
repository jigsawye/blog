import {
  applyMdxPreset,
  defineConfig,
  defineCollections,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import jsonSchema from 'fumadocs-mdx/plugins/json-schema';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    date: z.iso.date().or(z.date()),
  }),
  async: true,
  async mdxOptions(environment) {
    const { remarkSteps } = await import('fumadocs-core/mdx-plugins/remark-steps');

    return applyMdxPreset({
      rehypeCodeOptions: {
        inline: 'tailing-curly-colon',
        themes: {
          light: 'catppuccin-latte',
          dark: 'catppuccin-mocha',
        },
      },
      remarkCodeTabOptions: {
        parseMdx: true,
      },
      remarkNpmOptions: {
        persist: {
          id: 'package-manager',
        },
      },
      remarkPlugins: [remarkSteps],
    })(environment);
  },
});

export default defineConfig({
  plugins: [
    jsonSchema({
      insert: true,
    }),
    lastModified(),
  ],
});
