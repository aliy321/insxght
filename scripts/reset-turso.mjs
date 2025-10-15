import { createClient } from '@libsql/client'
import { config as loadEnv } from 'dotenv'
import path from 'path'
import fs from 'fs'

async function main() {
  // Load env from .env.local or .env if present
  const cwd = process.cwd()
  const envLocal = path.join(cwd, '.env.local')
  const envDefault = path.join(cwd, '.env')
  if (fs.existsSync(envLocal)) loadEnv({ path: envLocal })
  else if (fs.existsSync(envDefault)) loadEnv({ path: envDefault })

  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URI
  const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH

  if (!url) {
    console.error('Missing TURSO_DATABASE_URL (or DATABASE_URI)')
    process.exit(1)
  }

  const client = createClient({ url, authToken })

  try {
    await client.execute('PRAGMA foreign_keys = OFF;')

    const tablesRes = await client.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
    )

    const tables = tablesRes.rows.map((r) => r.name).filter(Boolean)

    if (tables.length === 0) {
      console.log('No user tables found. Nothing to drop.')
      return
    }

    console.log(`Dropping ${tables.length} tables...`)
    for (const table of tables) {
      const name = String(table)
      if (name.startsWith('libsql_')) continue
      try {
        await client.execute(`DROP TABLE IF EXISTS \`${name}\`;`)
        console.log(`Dropped: ${name}`)
      } catch (err) {
        console.warn(`Failed to drop ${name}:`, err?.message || err)
      }
    }

    await client.execute('PRAGMA foreign_keys = ON;')
    console.log('Done. Database is now empty.')
  } finally {
    try {
      await client.close()
    } catch {}
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


