import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// fix problem with tiny-secp256k1
import wasm from "vite-plugin-wasm";

// Connect crypto from node js
import builtins from 'rollup-plugin-node-builtins';
const builtinsPlugin = builtins({crypto: true});
builtinsPlugin.name = 'builtins';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    base: "/Robot_Dream_Blockchain_Practice/",
    plugins: [vue(), wasm()],
    rollupInputOptions: {
      plugins: [
        builtinsPlugin
      ]
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    assetsInclude: ["**/*.png", "**/*.svg"],
  }
})
