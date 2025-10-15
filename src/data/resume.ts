import { HomeIcon, NotebookIcon } from 'lucide-react'
import { Icons } from '@/components/icons'

export const DATA = {
  name: 'John Doe',
  initials: 'JD',
  avatarUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  description:
    'Full-stack developer passionate about building modern web applications with React, Next.js, and TypeScript.',
  summary: `I'm a passionate full-stack developer with 5+ years of experience building modern web applications. I love working with React, Next.js, TypeScript, and Node.js to create scalable and performant solutions.

I have a strong background in both frontend and backend development, with expertise in modern JavaScript frameworks, cloud platforms, and database design. I'm always eager to learn new technologies and take on challenging projects.

When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.`,

  work: [
    {
      company: 'TechCorp',
      title: 'Senior Full-Stack Developer',
      start: '2022',
      end: 'Present',
      description:
        'Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring junior developers and implementing best practices.',
      logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      href: 'https://techcorp.com',
      badges: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    },
    {
      company: 'StartupXYZ',
      title: 'Frontend Developer',
      start: '2020',
      end: '2022',
      description:
        'Developed responsive web applications and mobile-first designs. Collaborated with design team to implement pixel-perfect UIs.',
      logoUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
      href: 'https://startupxyz.com',
      badges: ['React', 'Vue.js', 'Sass', 'Webpack'],
    },
    {
      company: 'WebAgency',
      title: 'Junior Developer',
      start: '2019',
      end: '2020',
      description:
        'Built custom websites and web applications for clients. Gained experience with various frontend frameworks and tools.',
      logoUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
      href: 'https://webagency.com',
      badges: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    },
  ],

  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      start: '2015',
      end: '2019',
      logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop',
      href: 'https://university.edu',
    },
  ],

  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Vue.js',
    'Node.js',
    'Express',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Docker',
    'AWS',
    'Git',
    'Tailwind CSS',
    'Sass',
    'GraphQL',
    'REST APIs',
    'Jest',
    'Cypress',
    'Figma',
  ],

  projects: [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce platform built with Next.js, TypeScript, and Stripe integration. Features include user authentication, product management, and order processing.',
      dates: '2023',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      links: {
        github: 'https://github.com/johndoe/ecommerce',
        live: 'https://ecommerce-demo.com',
      },
    },
    {
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      dates: '2023',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      links: {
        github: 'https://github.com/johndoe/taskmanager',
        live: 'https://taskmanager-demo.com',
      },
    },
    {
      title: 'Weather Dashboard',
      description:
        'A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with interactive maps.',
      dates: '2022',
      technologies: ['Vue.js', 'Chart.js', 'OpenWeather API'],
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      links: {
        github: 'https://github.com/johndoe/weather-dashboard',
        live: 'https://weather-demo.com',
      },
    },
    {
      title: 'Blog CMS',
      description:
        'A headless CMS built with Next.js and Payload CMS for managing blog content with a modern admin interface.',
      dates: '2022',
      technologies: ['Next.js', 'Payload CMS', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      links: {
        github: 'https://github.com/johndoe/blog-cms',
        live: 'https://blog-demo.com',
      },
    },
  ],

  hackathons: [
    {
      title: 'AI Hackathon 2023',
      description:
        'Built an AI-powered code review tool that analyzes code quality and provides suggestions for improvement.',
      location: 'San Francisco, CA',
      dates: 'March 2023',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100&h=100&fit=crop',
      links: {
        github: 'https://github.com/johndoe/ai-code-review',
        live: 'https://ai-code-review-demo.com',
      },
    },
    {
      title: 'FinTech Hackathon 2022',
      description:
        'Developed a personal finance tracking app with budget analysis and investment recommendations.',
      location: 'New York, NY',
      dates: 'October 2022',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
      links: {
        github: 'https://github.com/johndoe/fintech-app',
        live: 'https://fintech-demo.com',
      },
    },
    {
      title: 'Climate Tech Hackathon 2022',
      description:
        'Created a carbon footprint calculator with gamification elements to encourage sustainable practices.',
      location: 'Seattle, WA',
      dates: 'June 2022',
      image: 'https://images.unsplash.com/photo-1569163139397-3a1b5a8c8a3d?w=100&h=100&fit=crop',
      links: {
        github: 'https://github.com/johndoe/carbon-calculator',
        live: 'https://carbon-calculator-demo.com',
      },
    },
  ],

  contact: {
    social: {
      X: {
        url: 'https://twitter.com/johndoe',
        name: 'X',
        icon: Icons.x,
        navbar: true,
      },
      GitHub: {
        url: 'https://github.com/johndoe',
        name: 'GitHub',
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        url: 'https://linkedin.com/in/johndoe',
        name: 'LinkedIn',
        icon: Icons.linkedin,
        navbar: true,
      },
      Youtube: {
        url: 'https://youtube.com/@johndoe',
        name: 'Youtube',
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        url: 'mailto:john@example.com',
        name: 'Send Email',
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/blog', icon: NotebookIcon, label: 'Blog' },
  ],
}
