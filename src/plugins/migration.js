// One-time migration to clean up legacy module data
export function cleanupLegacyModules() {
  const MIGRATION_VERSION = '1.0.0-legacy-cleanup'
  const MIGRATION_KEY = 'zzz-migration-version'

  // Check if migration already ran
  if (localStorage.getItem(MIGRATION_KEY) === MIGRATION_VERSION) {
    return
  }

  // Keys to clean up (based on legacy modules)
  const keysToRemove = [
    'agent-data',
    'w-engine-data', 
    'bangboo-data',
    'driver-data',
    'scratch-data',
    'scratch-game-state',
    'scratch-scores',
    'agent-cache',
    'w-engine-cache',
    'bangboo-cache',
    'driver-cache',
    'scratch-cache',
    // Add any other potential keys...
  ]

  // Remove localStorage keys
  keysToRemove.forEach(key => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Failed to remove localStorage key ${key}:`, error)
    }
  })

  // Clean up any IndexedDB databases if they exist
  if ('indexedDB' in window) {
    const databasesToDelete = [
      'zzz-agent-db',
      'zzz-w-engine-db', 
      'zzz-bangboo-db',
      'zzz-driver-db',
      'zzz-scratch-db'
    ]

    databasesToDelete.forEach(dbName => {
      try {
        indexedDB.deleteDatabase(dbName)
      } catch (error) {
        console.warn(`Failed to delete IndexedDB ${dbName}:`, error)
      }
    })
  }

  // Mark migration as complete
  localStorage.setItem(MIGRATION_KEY, MIGRATION_VERSION)
  console.log('Legacy modules cleanup completed')
}
