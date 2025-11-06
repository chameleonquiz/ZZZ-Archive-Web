/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import { cleanupLegacyModules } from './migration'

export function registerPlugins (app) {
  // Run cleanup migration before app initialization
  cleanupLegacyModules()

  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
