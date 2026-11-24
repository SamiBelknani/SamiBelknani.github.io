/** Sections présentes dans le menu de navigation (dans l'ordre). */
export const SECTION_IDS = ['home', 'about', 'services', 'portfolio', 'skills', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]
