import type { Localized } from './types'

export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'ai'

/** Icône et couleurs de la vignette affichée tant qu'aucune capture d'écran n'est fournie. */
export type CoverIcon = 'cart' | 'tooth' | 'signal' | 'users' | 'utensils' | 'code'

export interface Project {
  id: string
  title: string
  /** Contexte court : client, type de projet, cadre (stage, PFE...). */
  context: Localized
  description: Localized
  /** Points forts concrets du projet (3 maximum conseillés). */
  highlights: Localized[]
  tech: string[]
  categories: ProjectCategory[]
  /** Capture d'écran (ex. '/projects/medcare.webp' dans public/). Vide : vignette générée. */
  image?: string
  /** Captures supplémentaires, ouvertes en grand avec « Voir les captures ». */
  gallery?: { src: string; caption: Localized }[]
  cover: { icon: CoverIcon; from: string; to: string }
  /** Liens affichés uniquement s'ils sont renseignés. */
  github?: string
  demo?: string
  /** Code source non public (dépôt privé ou projet client). */
  privateCode?: boolean
  year?: string
}

/**
 * Projets réellement réalisés (dépôts GitHub de Mohamed Sami Belknani).
 * Pour ajouter un projet : copiez un bloc, changez les textes, puis ajoutez éventuellement une capture
 * dans public/projects/ et son chemin dans « image ».
 */
export const projects: Project[] = [
  {
    id: 'medcare',
    title: 'MedCare Solution',
    context: {
      fr: 'E-commerce B2B/B2C · matériel dentaire et médical',
      en: 'B2B/B2C e-commerce · dental and medical equipment',
      ar: 'تجارة إلكترونية B2B/B2C · معدات طب الأسنان والمعدات الطبية',
    },
    description: {
      fr: "Boutique en ligne complète avec espace d'administration : catalogue, panier, commandes, livraison, gestion de stock et facturation fiscale automatique.",
      en: 'Full online store with an admin back office: catalogue, cart, orders, delivery, stock management and automatic tax invoicing.',
      ar: 'متجر إلكتروني متكامل مع لوحة إدارة: الكتالوج، سلة الشراء، الطلبات، التوصيل، إدارة المخزون والفوترة الجبائية الآلية.',
    },
    highlights: [
      {
        fr: 'Factures PDF automatiques (TVA, timbre fiscal, avoirs, numérotation sans trou)',
        en: 'Automatic PDF invoices (VAT, stamp duty, credit notes, gapless numbering)',
        ar: 'فواتير PDF آلية (الأداء على القيمة المضافة، الطابع الجبائي، فواتير التعديل، ترقيم متسلسل)',
      },
      {
        fr: 'Interface trilingue FR / EN / AR avec affichage RTL',
        en: 'Trilingual FR / EN / AR interface with RTL layout',
        ar: 'واجهة بثلاث لغات مع دعم الكتابة من اليمين إلى اليسار',
      },
      {
        fr: 'Rôles administrateur et magasinier, journal d’audit',
        en: 'Admin and storekeeper roles, audit log',
        ar: 'أدوار المدير وأمين المخزن مع سجل تدقيق',
      },
    ],
    tech: ['Angular', 'TypeScript', 'Spring Boot', 'Java', 'MySQL', 'Flyway'],
    categories: ['web'],
    image: '/projects/medcare/accueil.jpg',
    gallery: [
      { src: '/projects/medcare/accueil.jpg', caption: { fr: 'Page d’accueil', en: 'Home page', ar: 'الصفحة الرئيسية' } },
      { src: '/projects/medcare/boutique.jpg', caption: { fr: 'Boutique avec filtres par catégorie', en: 'Shop with category filters', ar: 'المتجر مع التصفية حسب الصنف' } },
      { src: '/projects/medcare/produit.jpg', caption: { fr: 'Fiche produit : prix, promotion et stock', en: 'Product page: price, promotion and stock', ar: 'صفحة المنتج: السعر والتخفيض والمخزون' } },
      { src: '/projects/medcare/accueil-denticab.jpg', caption: { fr: 'Mise en avant de DentiCab Pro sur l’accueil', en: 'DentiCab Pro highlighted on the home page', ar: 'إبراز DentiCab Pro في الصفحة الرئيسية' } },
      { src: '/projects/medcare/denticab.jpg', caption: { fr: 'Page produit DentiCab Pro avec vidéo de démonstration', en: 'DentiCab Pro product page with demo video', ar: 'صفحة DentiCab Pro مع فيديو العرض' } },
      { src: '/projects/medcare/mobile.jpg', caption: { fr: 'Version mobile', en: 'Mobile version', ar: 'نسخة الجوّال' } },
    ],
    cover: { icon: 'cart', from: '#1d4ed8', to: '#06b6d4' },
    privateCode: true,
    year: '2026',
  },
  {
    id: 'qos',
    title: 'SEMI QoS · Agent IA',
    context: {
      fr: "Projet de fin d'études ingénieur · Tunisie Telecom",
      en: 'Engineering final-year project · Tunisie Telecom',
      ar: 'مشروع ختم الدروس الهندسية · اتصالات تونس',
    },
    description: {
      fr: 'Application web et mobile de gestion de la qualité de service : réclamations, dommages réseau et couverture, avec un agent IA capable d’agir via function calling.',
      en: 'Web and mobile quality-of-service platform: complaints, network damage and coverage, with an AI agent able to act through function calling.',
      ar: 'تطبيق ويب وجوّال لإدارة جودة الخدمة: الشكاوى، أضرار الشبكة والتغطية، مع وكيل ذكاء اصطناعي ينفّذ إجراءات فعلية.',
    },
    highlights: [
      {
        fr: 'API REST sécurisée (Sanctum) partagée entre le web et le mobile',
        en: 'Secured REST API (Sanctum) shared by web and mobile',
        ar: 'واجهة REST مؤمّنة (Sanctum) مشتركة بين الويب والجوّال',
      },
      {
        fr: 'Agent IA local (Ollama · Qwen2.5) avec bascule automatique vers un chatbot NLTK',
        en: 'Local AI agent (Ollama · Qwen2.5) with automatic fallback to an NLTK chatbot',
        ar: 'وكيل ذكاء اصطناعي محلي (Ollama · Qwen2.5) مع تحويل آلي إلى روبوت محادثة NLTK',
      },
      {
        fr: 'Analyse de sentiment et intégration continue GitHub Actions',
        en: 'Sentiment analysis and GitHub Actions continuous integration',
        ar: 'تحليل المشاعر والتكامل المستمر عبر GitHub Actions',
      },
    ],
    tech: ['Laravel', 'Livewire', 'Flutter', 'Python', 'Flask', 'Ollama', 'MySQL'],
    categories: ['web', 'mobile', 'ai'],
    cover: { icon: 'signal', from: '#4f46e5', to: '#22d3ee' },
    privateCode: true,
    year: '2026',
  },
  {
    id: 'denticab',
    title: 'DentiCab Pro',
    context: {
      fr: 'Logiciel de gestion de cabinet dentaire + réservation en ligne',
      en: 'Dental practice management software + online booking',
      ar: 'برنامج تسيير عيادة أسنان + حجز المواعيد عبر الإنترنت',
    },
    description: {
      fr: 'Logiciel du cabinet dentaire : tableau de bord du jour, patients, agenda et salle d’attente en temps réel, odontogramme, soins, ordonnances, paiements, impayés et relances, statistiques. Relié à une page de prise de rendez-vous en ligne.',
      en: 'Dental practice software: daily dashboard, patients, schedule and real-time waiting room, odontogram, treatments, prescriptions, payments, unpaid balances and reminders, statistics. Linked to an online booking page.',
      ar: 'برنامج عيادة الأسنان: لوحة قيادة يومية، المرضى، الأجندة وقاعة الانتظار في الوقت الحقيقي، مخطط الأسنان، العلاجات، الوصفات، الدفعات والمستحقات غير المدفوعة والتذكير، الإحصائيات. مرتبط بصفحة حجز عبر الإنترنت.',
    },
    highlights: [
      {
        fr: 'Architecture MVVM en couches (Core, Data, Infrastructure, UI) et tests',
        en: 'Layered MVVM architecture (Core, Data, Infrastructure, UI) with tests',
        ar: 'بنية MVVM متعددة الطبقات مع اختبارات',
      },
      {
        fr: 'Réservation en ligne sans serveur : Cloudflare Pages, Supabase, anti-robots Turnstile',
        en: 'Serverless online booking: Cloudflare Pages, Supabase, Turnstile bot protection',
        ar: 'حجز عبر الإنترنت دون خادم: Cloudflare Pages وSupabase وحماية Turnstile',
      },
      {
        fr: 'Site vitrine Docteur Solution Tunisie avec vidéo de démonstration du logiciel',
        en: 'Docteur Solution Tunisie showcase website with a software demo video',
        ar: 'موقع تعريفي Docteur Solution Tunisie مع فيديو عرض للبرنامج',
      },
    ],
    tech: ['C#', '.NET 8', 'WPF', 'Entity Framework', 'PostgreSQL', 'Supabase', 'Cloudflare'],
    categories: ['desktop', 'web'],
    cover: { icon: 'tooth', from: '#0e7490', to: '#38bdf8' },
    image: '/media/denticab-card.jpg',
    demo: '#denticab',
    privateCode: true,
    year: '2026',
  },
  {
    id: 'personnel',
    title: 'PersonnelApp',
    context: {
      fr: 'Gestion du personnel · postes Windows et tablettes Android',
      en: 'Staff management · Windows desktops and Android tablets',
      ar: 'تسيير الموارد البشرية · حواسيب Windows ولوحات Android',
    },
    description: {
      fr: 'Gestion du personnel, des services, des véhicules et des visites, avec une version desktop et une application Android hors ligne pensée pour la sécurité des données.',
      en: 'Management of staff, departments, vehicles and visits, with a desktop version and an offline Android app designed for data security.',
      ar: 'تسيير الأعوان والمصالح والعربات والزيارات، بنسخة مكتبية وتطبيق Android يعمل دون اتصال مع حماية قوية للمعطيات.',
    },
    highlights: [
      {
        fr: 'Base de données chiffrée (SQLCipher), clé propre à chaque appareil',
        en: 'Encrypted database (SQLCipher) with a per-device key',
        ar: 'قاعدة بيانات مشفّرة (SQLCipher) بمفتاح خاص بكل جهاز',
      },
      {
        fr: 'Activation par QR code et authentification biométrique',
        en: 'QR-code activation and biometric authentication',
        ar: 'تفعيل برمز QR ومصادقة بالبصمة',
      },
      {
        fr: 'Desktop WinForms + WebView2 et mobile .NET MAUI',
        en: 'WinForms + WebView2 desktop and .NET MAUI mobile',
        ar: 'نسخة مكتبية WinForms + WebView2 وتطبيق .NET MAUI',
      },
    ],
    tech: ['C#', '.NET MAUI', 'WinForms', 'WebView2', 'SQLite', 'SQLCipher'],
    categories: ['mobile', 'desktop'],
    cover: { icon: 'users', from: '#1e40af', to: '#818cf8' },
    privateCode: true,
    year: '2026',
  },
  {
    id: 'sidibousaid',
    title: 'Sidi Bousaid 63',
    context: {
      fr: 'Site vitrine et commandes · restaurant',
      en: 'Showcase website and ordering · restaurant',
      ar: 'موقع تعريفي وطلبات · مطعم',
    },
    description: {
      fr: 'Site du restaurant avec menu, menus spéciaux, réservations, commandes, avis clients et espace d’administration.',
      en: 'Restaurant website with menu, special menus, reservations, orders, customer reviews and an admin area.',
      ar: 'موقع المطعم مع قائمة الأطباق والقوائم الخاصة والحجوزات والطلبات وآراء الحرفاء ولوحة إدارة.',
    },
    highlights: [
      {
        fr: 'Front React 19 animé (Framer Motion, GSAP) et formulaires validés (Zod)',
        en: 'Animated React 19 front end (Framer Motion, GSAP) and validated forms (Zod)',
        ar: 'واجهة React 19 متحركة ونماذج مُتحقق منها (Zod)',
      },
      {
        fr: 'API Express sécurisée (Helmet, JWT, limitation de débit) et Prisma',
        en: 'Secured Express API (Helmet, JWT, rate limiting) with Prisma',
        ar: 'واجهة Express مؤمّنة (Helmet وJWT وتحديد عدد الطلبات) مع Prisma',
      },
      {
        fr: 'Paiement Stripe, e-mails et déploiement Docker',
        en: 'Stripe payments, e-mails and Docker deployment',
        ar: 'الدفع عبر Stripe، البريد الإلكتروني والنشر عبر Docker',
      },
    ],
    tech: ['React', 'Vite', 'Node.js', 'Express', 'Prisma', 'Stripe', 'Docker'],
    categories: ['web'],
    image: '/projects/sidibousaid/accueil.jpg',
    gallery: [
      { src: '/projects/sidibousaid/accueil.jpg', caption: { fr: 'Page d’accueil', en: 'Home page', ar: 'الصفحة الرئيسية' } },
      { src: '/projects/sidibousaid/specialites.jpg', caption: { fr: 'Spécialités, galerie et avis clients', en: 'Specialities, gallery and customer reviews', ar: 'الأطباق المميزة والمعرض وآراء الحرفاء' } },
      { src: '/projects/sidibousaid/menu.jpg', caption: { fr: 'La carte : chaque porte de Sidi Bou Saïd s’ouvre sur le plat', en: 'The menu: each Sidi Bou Said door opens onto the dish', ar: 'قائمة الأطباق: كل باب من أبواب سيدي بوسعيد يُفتح على الطبق' } },
      { src: '/projects/sidibousaid/commande.jpg', caption: { fr: 'Commande en ligne avec panier', en: 'Online ordering with cart', ar: 'الطلب عبر الإنترنت مع سلة المشتريات' } },
      { src: '/projects/sidibousaid/reservation.jpg', caption: { fr: 'Réservation d’une table', en: 'Table booking', ar: 'حجز طاولة' } },
      { src: '/projects/sidibousaid/admin.jpg', caption: { fr: 'Administration : gestion des plats et des prix', en: 'Admin area: dishes and prices', ar: 'لوحة الإدارة: إدارة الأطباق والأسعار' } },
      { src: '/projects/sidibousaid/mobile.jpg', caption: { fr: 'Version mobile', en: 'Mobile version', ar: 'نسخة الجوّال' } },
    ],
    cover: { icon: 'utensils', from: '#2563eb', to: '#2dd4bf' },
    privateCode: true,
    year: '2026',
  },
]
