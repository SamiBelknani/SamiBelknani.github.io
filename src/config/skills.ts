import type { Localized } from './types'

export type SkillIcon = 'layout' | 'server' | 'smartphone' | 'database' | 'wrench' | 'brain'

export interface SkillGroup {
  id: string
  title: Localized
  icon: SkillIcon
  items: string[]
}

/**
 * Compétences affichées dans la section « Compétences ».
 * Seules les compétences listées ici apparaissent : ajoutez ou retirez des éléments librement.
 */
export const skills: SkillGroup[] = [
  {
    id: 'frontend',
    title: { fr: 'Frontend', en: 'Frontend', ar: 'الواجهات الأمامية' },
    icon: 'layout',
    items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3 / SCSS', 'Tailwind CSS', 'Bootstrap', 'Framer Motion', 'GSAP'],
  },
  {
    id: 'backend',
    title: { fr: 'Backend', en: 'Backend', ar: 'الخوادم والواجهات البرمجية' },
    icon: 'server',
    items: ['Java · Spring Boot', 'PHP · Laravel', 'Livewire', 'Node.js · Express', 'C# · .NET', 'Python · Flask', 'Django', 'API REST', 'JWT · Sanctum', 'Prisma', 'Entity Framework'],
  },
  {
    id: 'mobile',
    title: { fr: 'Mobile & Desktop', en: 'Mobile & Desktop', ar: 'الجوّال وسطح المكتب' },
    icon: 'smartphone',
    items: ['.NET MAUI (Android)', 'Flutter', 'WPF · MVVM', 'WinForms · WebView2', 'Android Studio'],
  },
  {
    id: 'databases',
    title: { fr: 'Bases de données', en: 'Databases', ar: 'قواعد البيانات' },
    icon: 'database',
    items: ['MySQL', 'PostgreSQL', 'SQLite · SQLCipher', 'Supabase', 'Flyway'],
  },
  {
    id: 'tools',
    title: { fr: 'Outils & DevOps', en: 'Tools & DevOps', ar: 'الأدوات وDevOps' },
    icon: 'wrench',
    items: ['Git · GitHub', 'GitHub Actions', 'Docker', 'Vite', 'Maven', 'Postman', 'Cloudflare', 'Playwright', 'Visual Studio · VS Code', 'StarUML'],
  },
  {
    id: 'ai',
    title: { fr: 'IA & Sécurité', en: 'AI & Security', ar: 'الذكاء الاصطناعي والأمن' },
    icon: 'brain',
    items: ['NLP · NLTK', 'Ollama · Qwen2.5', 'Function calling', 'Chatbots', 'Cisco Ethical Hacker', 'Cybersécurité'],
  },
]
