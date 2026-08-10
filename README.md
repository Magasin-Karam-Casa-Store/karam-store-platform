# karam-store-platform

Plateforme e-commerce Karamtech — informatique, impression, sécurité, solaire,
téléphonie et image & sonorisation.

## Structure du dépôt

```
├── storefront/   Boutique Next.js 16 (App Router, TypeScript, Tailwind v4)
├── server/       API Express + MongoDB
├── client/       Scaffold Vite initial
└── docker-compose.yml
```

> **Note pour l'équipe.** `client/` (Vite) et `storefront/` (Next.js) sont deux
> frontends issus de deux chantiers menés en parallèle. `storefront/` porte
> aujourd'hui la boutique complète. Il reste à décider en équipe lequel des deux
> on garde ; en attendant, rien n'a été supprimé.

## Démarrage

### Storefront

```bash
cd storefront
npm install
npm run dev          # http://localhost:3000
```

Aucune variable d'environnement n'est requise : le catalogue est généré
localement dans `storefront/src/data/generated/`.

Pour rafraîchir le catalogue depuis le site en production :

```bash
cd storefront
node scripts/scrape-karamtech.mjs
```

### API

```bash
cd server
npm install
npm start            # http://localhost:5000
```

Nécessite `MONGO_URI` dans un fichier `.env`.

### Tout lancer avec Docker

```bash
docker compose up
```

| Service      | Port |
| ------------ | ---- |
| `storefront` | 3000 |
| `client`     | 5173 |
| `server`     | 5000 |

## Déploiement (Vercel)

Pour déployer le storefront, définir **Root Directory** sur `storefront`.
Le framework est détecté automatiquement et aucune variable d'environnement
n'est nécessaire.

## Workflow Git

Le dépôt suit GitFlow : les branches `feature/*` partent de `develop` et y
retournent par pull request. `main` reflète la production.

```bash
git switch develop && git pull
git switch -c feature/ma-fonctionnalite
# ... commits ...
git push -u origin feature/ma-fonctionnalite   # puis ouvrir une PR vers develop
```

### Protection des branches

La protection de branches côté GitHub nécessite un plan payant sur les dépôts
privés. En attendant, deux garde-fous gratuits sont en place :

1. **CI** (`.github/workflows/ci.yml`) — chaque PR vers `main` ou `develop` est
   lintée, buildée et type-checkée automatiquement.
2. **Hook local** — refuse les `git push` directs sur `main` et `develop`.
   À installer une fois par machine :

   ```bash
   sh scripts/install-git-hooks.sh
   ```

Si le dépôt passe un jour sur GitHub Team, activer en plus :
`Settings → Rules → New ruleset` (require pull request, block force pushes et
suppressions sur `main` et `develop`).
