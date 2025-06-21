import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://supermarketbeto.duckdns.org',
    setupNodeEvents(on, config) {
    },
  },
});
