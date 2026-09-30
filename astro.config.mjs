// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: 独自ドメイン確定後に差し替え
  site: 'https://sunconnect.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
});
