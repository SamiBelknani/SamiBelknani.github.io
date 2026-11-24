# Portfolio · Mohamed Sami Belknani

Site personnel d'un ingénieur logiciel Full Stack Web & Mobile. C'est une page unique, en trois langues (français, anglais et arabe avec affichage de droite à gauche), en mode sombre ou clair, et adaptée au mobile, à la tablette et à l'ordinateur.

**Technologies :** React 19, Vite, TypeScript, Tailwind CSS 4, Framer Motion et Lucide.

## Installation et lancement

Prérequis : Node.js 20.19 ou plus récent.

```bash
npm install        # installe les dépendances
npm run dev        # lance le site en local sur http://localhost:5173
npm run build      # crée la version de production dans dist/
npm run preview    # affiche la version de production en local
npm run lint       # vérifie le code
```

## Personnalisation

Tout le contenu se modifie dans `src/config/` et `src/i18n/`. Il n'est pas nécessaire de toucher aux composants.

| Fichier | Contenu |
|---|---|
| `src/config/profile.ts` | Nom, titre, e-mail, téléphones, WhatsApp, localisation, photo, réseaux sociaux |
| `src/config/projects.ts` | Projets du portfolio (textes en 3 langues, technologies, liens, captures) |
| `src/config/skills.ts` | Compétences par catégorie : seules celles listées apparaissent |
| `src/config/journey.ts` | Parcours : formations, certifications, expériences |
| `src/i18n/fr.ts`, `en.ts`, `ar.ts` | Tous les textes de l'interface |

### Photo de profil

1. Déposez une photo carrée (environ 800 × 800 px, `.jpg` ou `.webp`) dans `public/`, par exemple `public/profile.jpg`.
2. Dans `src/config/profile.ts`, indiquez son chemin : `photo: '/profile.jpg'`.

Tant que `photo` est vide, le monogramme « MS » s'affiche à la place.

### Captures d'écran des projets

1. Déposez les images dans `public/projects/` (format 16/10 conseillé, par exemple 1600 × 1000 px en `.webp`).
2. Dans `src/config/projects.ts`, ajoutez `image: '/projects/medcare.webp'` au projet concerné.

Sans image, une vignette aux couleurs du projet s'affiche, avec la mention « Captures bientôt disponibles ».

### Liens des projets et réseaux sociaux

- **Liens des projets** : les boutons « Voir la démo » et « Code source » n'apparaissent que si `demo` ou `github` sont renseignés. Pour un projet dont le code est privé, `privateCode: true` affiche simplement « Code privé ».
- **Réseaux sociaux** : GitHub, LinkedIn et Facebook se renseignent dans `profile.socials`. Un réseau laissé vide n'est pas affiché.

### Ajouter un projet

Copiez un bloc existant dans `src/config/projects.ts`, puis remplissez :
- un `id` unique ;
- les textes `fr`, `en` et `ar` ;
- les technologies ;
- les catégories : `web`, `mobile`, `desktop` ou `ai`. Elles alimentent les filtres.

## Formulaire de contact

Le formulaire vérifie les champs (nom, e-mail, type de projet, message de 20 caractères minimum). Il contient aussi un champ piège invisible contre les robots.

- **Sans configuration :** le bouton « Envoyer avec ma messagerie » ouvre la messagerie du visiteur avec le message déjà rempli (lien `mailto`). Le site ne prétend jamais avoir envoyé un e-mail.
- **Avec un service d'envoi :**
  1. Copiez `.env.example` en `.env`.
  2. Renseignez `VITE_CONTACT_ENDPOINT`, par exemple l'adresse d'un formulaire [Formspree](https://formspree.io).
  3. Reconstruisez le site.

  Le message est alors envoyé en JSON (`name`, `email`, `projectType`, `budget`, `message`). Si l'envoi échoue, l'envoi par la messagerie est proposé à la place.

Le bouton WhatsApp flottant et les liens e-mail et téléphone fonctionnent dans tous les cas.

## Déploiement

**Version en ligne :** https://samibelknani.github.io/, publiée automatiquement par GitHub Actions (`.github/workflows/deploy.yml`) à chaque envoi sur la branche `main`. Pour le formulaire, la variable `VITE_CONTACT_ENDPOINT` se règle dans le dépôt GitHub : Settings › Secrets and variables › Actions › Variables.

Autres hébergeurs possibles :

Le site est entièrement statique : il suffit de publier le dossier `dist/` produit par `npm run build`.

- **Netlify / Cloudflare Pages :**
  - commande de build : `npm run build` ;
  - dossier publié : `dist` ;
  - variable `VITE_CONTACT_ENDPOINT` à ajouter dans les réglages du site si besoin.
- **Vercel :** importez le dossier. Le préréglage « Vite » est détecté automatiquement.
- **Hébergement classique (cPanel, Apache, Nginx) :** copiez le contenu de `dist/` à la racine du site.

Une fois l'adresse définitive connue :
- renseignez `siteUrl` dans `src/config/profile.ts` ;
- dans `index.html`, remplacez `/og-image.png` par l'adresse complète (par exemple `https://votre-domaine.tn/og-image.png`) pour que l'aperçu fonctionne sur les réseaux sociaux.

## Accessibilité et performances

- **Navigation au clavier** : lien « Aller au contenu », focus visible, libellés et attributs ARIA.
- **Animations** : elles sont désactivées quand le système demande de réduire les animations (`prefers-reduced-motion`).
- **Polices** : elles sont hébergées avec le site (Inter, Sora, IBM Plex Sans Arabic), sans appel à un service externe.
- **Images** : chargement différé (lazy loading).
- **Référencement** : métadonnées SEO, Open Graph et données structurées `Person`.

## Structure

```
src/
  components/      Navbar, Hero, About, Services, Portfolio, Skills, Process, Contact, Footer,
                   FloatingWhatsApp, BackToTop, ThemeToggle, LanguageSwitcher, ui/
  config/          profil, projets, compétences, parcours, sections
  i18n/            traductions fr / en / ar et sélection de la langue
  theme/           mode sombre / clair
  lib/             animations, formulaire de contact, hooks
public/            favicon, image de partage, robots.txt, vos photos et captures
```
