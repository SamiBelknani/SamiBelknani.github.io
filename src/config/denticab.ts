/**
 * DentiCab Pro, le logiciel de gestion de cabinet dentaire mis en avant dans sa propre section.
 * Les textes sont dans src/i18n (rubrique « denticab ») ; ici, les médias et les liens.
 */
export const denticab = {
  /** Vidéo de démonstration (50 s), chargée uniquement quand le visiteur clique sur lecture. */
  video: '/media/denticab-pro.mp4',
  poster: '/media/denticab-poster.jpg',
  /** Captures réelles tirées de la vidéo (données de démonstration). Même ordre que denticab.shots dans les traductions. */
  shots: ['/media/denticab-dossier.jpg', '/media/denticab-messagerie.jpg', '/media/denticab-stats.jpg'],
  /**
   * Page DentiCab Pro du site MedCare Solution : à renseigner quand le site sera en ligne
   * (ex. 'https://votre-domaine.tn/logiciel-cabinet'). Laissé vide, le lien n'est pas affiché.
   */
  medcareUrl: '',
  /** Site vitrine Docteur Solution Tunisie (vidéo de démonstration). */
  dstUrl: 'https://hamzasaad.github.io/docteur-solution-tunisie/#demonstration',
}
