import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Resume as ResumeType } from '@/payload-types'
import Navbar from './navbar'

export async function NavbarWrapper() {
  let resumeData: ResumeType | null = null

  try {
    resumeData = await getCachedGlobal('resume', 1)()
  } catch (error) {
    console.warn('Resume global not found:', error)
  }

  return <Navbar resumeData={resumeData} />
}
