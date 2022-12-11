import { defineConfig } from 'cypress'

export default defineConfig({
  component:                    {
    devServer: {
      bundler:       `webpack`,
      webpackConfig: {},
    },
    indexHtmlFile: `index.html`,
    specPattern:   `**/*.test.js`,
    supportFile:   `test/commands.js`,
  },
  screenshotOnRunFailure: false,
  video:                  false,
})
