import { defineConfig } from 'vite'
import { build } from 'vite'
import path from 'path'

export default defineConfig({
  base: '',
  plugins: [
    {
      name: 'raw-js',
      transform(code, id) {
        if (id.endsWith('?raw')) {
          return {
            code,
            map: null
          }
        }
      }
    },
    {
      name: 'build-lib',
      closeBundle: async () => {
        // Build library after main build
        await build({
          configFile: false,
          build: {
            lib: {
              entry: path.resolve(__dirname, 'src/Play.tsx'),
              name: 'apprunCode',
              fileName: () => 'apprun-code.js',
              formats: ['iife']
            },
            outDir: 'dist',
            emptyOutDir: false,
            rollupOptions: {
              external: ['react', 'react-dom'],
              output: {
                globals: {
                  react: 'React',
                  'react-dom': 'ReactDOM'
                }
              }
            }
          }
        })
      }
    }
  ],
  build: {
    outDir: 'docs'
  }
})
