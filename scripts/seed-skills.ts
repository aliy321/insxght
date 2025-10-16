// Example structure for skills data
// You can use this as a reference when setting up in Payload admin

export const skillsDataStructure = {
  title: 'Skills',
  skillGroups: [
    {
      header: 'Frontend & UI',
      technologies: [
        // These would be relationships to existing technologies in the 'technologies' collection
        // e.g., "React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "ShadCN UI"
      ],
    },
    {
      header: 'Backend & APIs',
      technologies: [
        // e.g., "Node.js", "TypeScript", "tRPC", "Drizzle ORM", "Payload CMS"
      ],
    },
    {
      header: 'Databases',
      technologies: [
        // e.g., "SQLite (Turso)", "PostgreSQL (Supabase)", "MongoDB"
      ],
    },
    {
      header: 'Mobile',
      technologies: [
        // e.g., "React Native", "Expo"
      ],
    },
    {
      header: 'AI & Integrations',
      technologies: [
        // e.g., "OpenAI API", "Vercel AI SDK"
      ],
    },
    {
      header: 'Deployment & Infra',
      technologies: [
        // e.g., "Vercel", "AWS", "SST", "CI/CD"
      ],
    },
    {
      header: 'SEO & Performance',
      technologies: [
        // e.g., "SSR / SSG", "structured data", "Core Web Vitals"
      ],
    },
    {
      header: 'Design & Prototyping',
      technologies: [
        // e.g., "Figma", "Sketch", "Adobe CC"
      ],
    },
  ],
}

// Usage in Payload admin:
// 1. First, make sure you have technologies in the 'technologies' collection
// 2. Go to Globals > Skills
// 3. Set the title to "Skills"
// 4. Add skill groups with headers
// 5. For each group, select technologies from the existing 'technologies' collection
// 6. This way you can reuse technologies across different groups if needed
