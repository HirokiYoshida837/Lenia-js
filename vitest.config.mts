import { defineConfig } from 'vitest/config'
import path from "path";

export default defineConfig({
  test: {
    // vitest で import alias を利用するために必要
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
