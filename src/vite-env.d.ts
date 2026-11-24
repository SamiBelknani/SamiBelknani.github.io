/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Adresse du service d'envoi du formulaire de contact (ex. https://formspree.io/f/xxxxxxx). Facultatif. */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
