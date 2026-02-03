// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxt/ui', 'nuxt-charts'],

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      {
        name: 'Huninn',
        provider: 'google',
      },
    ],
  },

  nitro: {
    preset: 'cloudflare-pages',
  },
})
