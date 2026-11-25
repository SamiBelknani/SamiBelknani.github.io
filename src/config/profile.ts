import type { Localized } from './types'

/**
 * Informations personnelles affichées sur tout le site.
 * Modifiez ce fichier pour mettre à jour vos coordonnées, votre photo ou vos réseaux sociaux.
 */
export const profile = {
  firstName: 'Mohamed Sami',
  lastName: 'Belknani',
  fullName: 'Mohamed Sami Belknani',
  /** Nom affiché selon la langue (l'arabe utilise l'écriture arabe). */
  name: {
    first: { fr: 'Mohamed Sami', en: 'Mohamed Sami', ar: 'محمد سامي' } satisfies Localized,
    last: { fr: 'Belknani', en: 'Belknani', ar: 'بالكناني' } satisfies Localized,
    full: { fr: 'Mohamed Sami Belknani', en: 'Mohamed Sami Belknani', ar: 'محمد سامي بالكناني' } satisfies Localized,
  },
  initials: 'MS',
  title: {
    fr: 'Software Engineer · Full Stack Web & Mobile Developer',
    en: 'Software Engineer · Full Stack Web & Mobile Developer',
    ar: 'مهندس برمجيات · مطوّر ويب وتطبيقات جوّال متكامل',
  } satisfies Localized,

  /**
   * Photo de profil : déposez votre photo dans le dossier public/ (ex. public/profile.jpg, format carré, 800 px)
   * puis indiquez son chemin ici : photo: '/profile.jpg'. Laissez vide pour afficher le monogramme.
   */
  photo: '/profile.jpg',

  email: 'samikneni89@gmail.com',
  /** Numéros au format international, sans espaces (utilisés pour les liens tel:). */
  phones: [
    { display: '+216 21 650 382', value: '+21621650382' },
    { display: '+216 96 382 311', value: '+21696382311', whatsapp: true },
  ],
  /** Numéro WhatsApp sans le « + » (utilisé pour https://wa.me/...). */
  whatsapp: '21696382311',
  location: { fr: 'Tunisie', en: 'Tunisia', ar: 'تونس' } satisfies Localized,
  available: true,

  /**
   * Réseaux sociaux : un lien n'apparaît que s'il est renseigné.
   * Exemple : github: 'https://github.com/SamiBelknani' (à activer quand des dépôts publics seront disponibles).
   */
  socials: {
    github: '',
    linkedin: 'https://www.linkedin.com/in/mohamed-sami-belknani',
    facebook: '',
  },

  /** Co-concepteur de DentiCab Pro (cité dans la section DentiCab Pro). */
  collaborator: {
    name: 'Hamza Saadouna',
    role: { fr: 'ingénieur en génie informatique', en: 'computer engineer', ar: 'مهندس في الهندسة الإعلامية' } satisfies Localized,
    email: 'hamzasaadouna25@gmail.com',
    phone: { display: '+216 22 619 643', value: '+21622619643' },
  },

  /** Adresse publique du site (pour le référencement et les partages sur les réseaux sociaux). */
  siteUrl: 'https://samibelknani.github.io/',
}

/**
 * Formulaire de contact : si VITE_CONTACT_ENDPOINT est défini (ex. un formulaire Formspree, Getform ou votre
 * propre API), le message y est envoyé en JSON. Sinon, le site propose l'envoi par votre messagerie (mailto).
 */
export const contactEndpoint: string = (import.meta.env.VITE_CONTACT_ENDPOINT ?? '').trim()
