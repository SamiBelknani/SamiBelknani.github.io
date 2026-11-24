import type { Localized } from './types'

export interface JourneyItem {
  period: string
  title: Localized
  place: Localized
  kind: 'education' | 'experience' | 'certification'
}

/** Parcours (formations, certifications et expériences), du plus récent au plus ancien. */
export const journey: JourneyItem[] = [
  {
    period: '2024 – 2026',
    kind: 'education',
    title: {
      fr: "Diplôme National d'Ingénieur en Génie Informatique (Génie Logiciel)",
      en: 'National Engineering Degree in Computer Engineering (Software Engineering)',
      ar: 'الشهادة الوطنية للمهندس في الهندسة الإعلامية (هندسة البرمجيات)',
    },
    place: {
      fr: 'École Nationale Privée d’Ingénierie de Monastir (Polytech Monastir)',
      en: 'Private National Engineering School of Monastir (Polytech Monastir)',
      ar: 'المدرسة الوطنية الخاصة للهندسة بالمنستير (بوليتك المنستير)',
    },
  },
  {
    period: '2026',
    kind: 'experience',
    title: {
      fr: "Projet de fin d'études ingénieur · application web/mobile QoS avec agent IA",
      en: 'Engineering final-year project · QoS web/mobile app with an AI agent',
      ar: 'مشروع ختم الدروس الهندسية · تطبيق ويب وجوّال لجودة الخدمة مع وكيل ذكاء اصطناعي',
    },
    place: { fr: 'Tunisie Telecom · Kairouan', en: 'Tunisie Telecom · Kairouan', ar: 'اتصالات تونس · القيروان' },
  },
  {
    period: '2025 – 2026',
    kind: 'experience',
    title: {
      fr: 'Enseignant vacataire (TD) · développement mobile, IA, POO, IoT, C++',
      en: 'Part-time lecturer (tutorials) · mobile development, AI, OOP, IoT, C++',
      ar: 'مدرّس متعاقد (أعمال موجهة) · تطوير الجوّال، الذكاء الاصطناعي، البرمجة الكائنية، إنترنت الأشياء، C++',
    },
    place: { fr: 'ISSAT Kairouan · Université de Kairouan', en: 'ISSAT Kairouan · University of Kairouan', ar: 'المعهد العالي للعلوم التطبيقية والتكنولوجيا بالقيروان' },
  },
  {
    period: '2025',
    kind: 'certification',
    title: { fr: 'Certificat Ethical Hacker', en: 'Ethical Hacker certificate', ar: 'شهادة Ethical Hacker' },
    place: { fr: 'Cisco Networking Academy', en: 'Cisco Networking Academy', ar: 'أكاديمية سيسكو للشبكات' },
  },
  {
    period: '2025',
    kind: 'experience',
    title: {
      fr: 'Projet de fin d’année · classification des réclamations (NLP) et chatbot',
      en: 'End-of-year project · complaint classification (NLP) and chatbot',
      ar: 'مشروع آخر السنة · تصنيف الشكاوى (معالجة اللغة) وروبوت محادثة',
    },
    place: { fr: 'Tunisie Telecom', en: 'Tunisie Telecom', ar: 'اتصالات تونس' },
  },
  {
    period: '2024',
    kind: 'education',
    title: {
      fr: 'Mastère professionnel en Réseaux informatiques et applications distribuées',
      en: 'Professional Master’s in Computer Networks and Distributed Applications',
      ar: 'ماجستير مهني في الشبكات الإعلامية والتطبيقات الموزعة',
    },
    place: {
      fr: 'Institut Supérieur d’Informatique et de Gestion de Kairouan',
      en: 'Higher Institute of Computer Science and Management of Kairouan',
      ar: 'المعهد العالي للإعلامية والتصرف بالقيروان',
    },
  },
  {
    period: '2024',
    kind: 'experience',
    title: {
      fr: 'Projet de fin d’études mastère · application de gestion des réclamations',
      en: 'Master’s final project · complaint management application',
      ar: 'مشروع ختم دروس الماجستير · تطبيق لإدارة الشكاوى',
    },
    place: { fr: 'Tunisie Telecom', en: 'Tunisie Telecom', ar: 'اتصالات تونس' },
  },
  {
    period: '2012',
    kind: 'education',
    title: {
      fr: 'Licence en informatique de gestion (services par Internet)',
      en: 'Bachelor’s in Business Computing (Internet services)',
      ar: 'إجازة في الإعلامية التصرفية (خدمات الإنترنت)',
    },
    place: {
      fr: 'Institut Supérieur d’Informatique et de Gestion de Kairouan',
      en: 'Higher Institute of Computer Science and Management of Kairouan',
      ar: 'المعهد العالي للإعلامية والتصرف بالقيروان',
    },
  },
]
