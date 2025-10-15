import * as migration_20250627_145853 from './20250627_145853'

export const migrations = [
  {
    up: migration_20250627_145853.up,
    down: migration_20250627_145853.down,
    name: '20250627_145853',
  },
]
