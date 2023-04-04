// https://nuxt.com/docs/api/configuration/nuxt-config

import ViteYaml from '@modyfi/vite-plugin-yaml';
import ViteMarkdown from 'vite-plugin-markdown';

export default defineNuxtConfig({
  content: {
    documentDriven: true,
  },
  css: [
    '@/less/elements.less'
  ],
  modules: [
    '@nuxt/content',
    ['@pinia/nuxt', {
      '@/stores/labelstore': ['useLabelStore']
    }]
  ],
  imports: {
    dirs: ['./stores']
  },
  vite: {
    plugins: [
      ViteYaml(),
      ViteMarkdown({mode: ['html']})
    ]
  }
})
