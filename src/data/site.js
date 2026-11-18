
export const owner = {
  name: 'Robel Gebrehiwot Brhane',
  firstName: 'Robel Gebrehiwot',
  lastName: 'Brhane',
  email: 'robelghb@gmail.com',
  resume: '/resume/robel-resume.pdf',
  location: 'Toronto, Canada',
}

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Robel-GH', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/robel-gh', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:robelghb@gmail.com', icon: 'mail' },
]

// The scrolling band under the hero: the tools recruiters search for.
export const marqueeItems = [
  'Vue 3',
  'Node.js',
  'Express',
  'Python',
  'PyTorch',
  'RAG',
  'PostgreSQL',
  'MongoDB',
  'Flutter',
  'Kotlin',
]

// Current situation, shown as chips with a pulsing dot. tone: live, offer or progress.
export const heroChips = [
  { label: 'Available now', tone: 'live' },
  { label: 'Toronto, on-site, hybrid or remote', shortLabel: 'Toronto or remote', tone: 'progress' },
]

export const aboutChips = [
  { label: 'Meal Checker: free for organizations', tone: 'offer', href: '#meal-checker' },
  { label: 'Tigrigna Keyboard: in testing', tone: 'progress' },
]


export const focusProfiles = {
  default: {
    title: 'Software & AI Engineer',
    subtitle: '',
    summary: 'Delivered production ready full-stack and AI integrated platforms. Led delivery of two client platforms using Vue, React, Node.js, and Python, and built real-time tooling for ML operations. Experienced in system architecture, automated testing, and maintainable distributed software; additional experience in native mobile, RAG, and deep learning research.',
    filter: 'all',
    stack: 'Vue, Node, Python',
  }
  // software: {
  //   title: 'Software Engineer',
  //   subtitle: '',
  //   summary: 'I build production web apps end to end: the Vue interface, the Express API, MongoDB or PostgreSQL, tests and deployment.',
  //   filter: 'software',
  //   stack: 'Vue, Node, Python',
  // }
  // ,
  // mobile: {
  //   title: 'Mobile Developer',
  //   subtitle: 'Flutter & Kotlin',
  //   summary: 'I build Android and iOS apps with Flutter and native Kotlin, including a system keyboard for Tigrigna speakers now in testing on Google Play.',
  //   filter: 'mobile',
  //   stack: 'Flutter, Kotlin, Supabase',
  // },
  // ai: {
  //   title: 'ML Engineer (Junior)',
  //   subtitle: 'Deep Learning & Generative Models',
  //   summary: 'I train and evaluate deep generative models, from diffusion models that edit chest X-rays to image-to-report transformers, and build the software that makes them usable.',
  //   filter: 'ai',
  //   stack: 'Python, PyTorch, RAG',
  // },
}
