// https://nuxt.com/docs/api/configuration/nuxt-config

import ViteYaml from '@modyfi/vite-plugin-yaml';
import ViteMarkdown from 'vite-plugin-markdown';
import svgLoader from 'vite-svg-loader'

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
  runtimeConfig: {
    public: {
      URL: process.env.URL,
      BASE: process.env.BASE,
    }
  },
  vite: {
    plugins: [
      ViteYaml(),
      svgLoader(),
      ViteMarkdown({mode: ['html']})
    ]
  },
})
