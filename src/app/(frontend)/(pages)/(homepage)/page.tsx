import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import BlurFade from '@/components/magicui/blur-fade'
import BlurFadeText from '@/components/magicui/blur-fade-text'
import { ProjectCard } from '@/components/project-card'
import { ResumeCard } from '@/components/resume-card'
import { HackathonCard } from '@/components/hackathon-card'
import { GitHubContributions } from '@/components/github-contributions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import RichText from '@/components/RichText'
import { Media } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { whitelabel } from '@/config/whitelabel'
import { Separator } from '@/components/ui/separator'

const BLUR_FADE_DELAY = 0.04

export default async function Home() {
  const [
    heroData,
    aboutData,
    workData,
    educationData,
    skillsData,
    projectsData,
    // contactData,
  ] = await Promise.all([
    getCachedGlobal('heroSection', 1)(),
    getCachedGlobal('aboutSection', 1)(),
    getCachedGlobal('workExperience', 1)(),
    getCachedGlobal('education', 1)(),
    getCachedGlobal('skills', 1)(),
    getCachedGlobal('projectsSection', 2)(),
    // getCachedGlobal('contactSection', 1)(),
  ])

  return (
    <>
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`${heroData?.greeting || "Hi, I'm"} ${heroData?.name?.split(' ')[0] || 'Developer'} ${heroData?.emoji || '👋'}`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={
                  heroData?.description ||
                  'Full-stack developer passionate about building modern web applications.'
                }
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage
                  alt={heroData?.name || 'Profile'}
                  src={
                    heroData?.avatar && typeof heroData.avatar === 'object'
                      ? heroData.avatar.thumbnailURL || heroData.avatar.url || '/placeholder.png'
                      : '/placeholder.png'
                  }
                />
                <AvatarFallback>{heroData?.initials || 'JD'}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{aboutData?.title || 'About'}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {aboutData?.summary && (
              <RichText
                data={aboutData.summary}
                className="text-muted-foreground text-sm font-work-sans"
                enableGutter={false}
                enableProse={false}
              />
            )}
          </div>
        </BlurFade>
      </section>

      <section id="github">
        <div className="">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex justify-center w-full">
              <GitHubContributions
                username={whitelabel.socialMedia.GitHub.url.split('/').pop() || 'aliy321'}
                className="w-full max-w-4xl"
              />
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">{workData?.title || 'Work Experience'}</h2>
          </BlurFade>
          {workData?.workEntries?.map((work, id) => (
            <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <ResumeCard
                key={work.company}
                logoUrl={
                  work.logo && typeof work.logo === 'object'
                    ? work.logo.url || undefined
                    : undefined
                }
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.website || undefined}
                badges={
                  work.technologies?.map((tech) =>
                    typeof tech === 'object' ? tech.name : String(tech),
                  ) || []
                }
                period={`${work.start} - ${work.end ?? 'Present'}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">{educationData?.title || 'Education'}</h2>
          </BlurFade>
          {educationData?.educationEntries?.map((education, id) => (
            <BlurFade key={`${education.school}-${id}`} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
              <ResumeCard
                href={education.website || undefined}
                logoUrl={
                  education.logo && typeof education.logo === 'object'
                    ? education.logo.url || undefined
                    : undefined
                }
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">{skillsData?.title || 'Skills'}</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {skillsData?.featuredTechnologies?.map((tech, id) => (
              <BlurFade
                key={typeof tech === 'object' ? tech.name : tech}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
              >
                <Badge key={typeof tech === 'object' ? tech.name : tech}>
                  {typeof tech === 'object' ? tech.name : tech}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {projectsData?.badgeText || 'My Projects'}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {projectsData?.title || 'I like building things'}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {projectsData?.description || 'Check out my latest work and projects.'}
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {projectsData?.featuredProjects?.map((project, id) => (
                <BlurFade
                  key={typeof project === 'object' ? project.id : id}
                  delay={BLUR_FADE_DELAY * 16 + id * 0.05}
                >
                  {typeof project === 'object' && (
                    <HackathonCard
                      title={project.title}
                      description={project.description}
                      image={
                        project.logo && typeof project.logo === 'object'
                          ? (project.logo.url ?? undefined)
                          : undefined
                      }
                      website={project.website ?? undefined}
                    />
                  )}
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      {/* <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                {contactData?.badgeText || 'Contact'}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {contactData?.title || 'Get in Touch'}
              </h2>
              <div className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {contactData?.description && (
                  <RichText
                    data={contactData.description}
                    className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-work-sans"
                    enableGutter={false}
                    enableProse={false}
                  />
                )}
              </div>
            </div>
          </BlurFade>
        </div>
      </section> */}
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { getPageSEO } = await import('@/utilities/getPageSEO')
  return getPageSEO('home')
}
