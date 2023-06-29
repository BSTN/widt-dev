// https://nuxt.com/docs/api/configuration/nuxt-config

import ViteYaml from '@modyfi/vite-plugin-yaml';
import ViteMarkdown from 'vite-plugin-markdown';
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  css: [
    '@/less/elements.less'
  ],
  modules: [
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
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/less/ease.less";@import "@/less/animations.less";`
        }
      }
    },
    plugins: [
      ViteYaml(),
      svgLoader(),
      ViteMarkdown({mode: ['html']})
    ]
  },
})
