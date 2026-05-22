# Site personnel / CV en ligne

Site statique en HTML/CSS/JavaScript pur, sans dépendance ni framework. Le contenu (expériences, formation, compétences, etc.) est entièrement piloté par un fichier JSON, ce qui permet de mettre à jour le contenu sans toucher au code.

## Fonctionnement général

1. Le navigateur charge [index.html](index.html) qui ne contient qu'un squelette de page (sections vides avec des `id`).
2. Le fichier [js/script.js](js/script.js) est exécuté : il récupère [data/profile.json](data/profile.json) via `fetch` puis injecte dynamiquement le contenu dans chaque section du DOM.
3. Si une clé est absente du JSON, la section correspondante est masquée automatiquement (`display: none`).
4. La mise en forme est entièrement gérée par [css/style.css](css/style.css).

## Structure du projet

```
.
├── index.html              Squelette HTML
├── css/
│   └── style.css           Styles
├── js/
│   └── script.js           Script qui remplit le DOM à partir du JSON
├── data/
│   ├── profile.json        Données réelles du CV (à modifier)
│   └── profile-empty.json  Modèle vide à recopier
├── images/                 Photos (fond, expériences, certifications…)
└── icons/                  Icônes (compétences, contact…)
```

## Comment l'utiliser

[data/profile-empty.json](data/profile-empty.json) est un **exemple vide** servant de modèle. Pour personnaliser le site :

1. Copier `data/profile-empty.json` en `data/profile.json`.
2. Modifier `data/profile.json` avec ses propres informations.
3. Ajouter ses propres images dans `images/` et icônes dans `icons/` puis mettre à jour les chemins dans le JSON.
4. Servir le site via un serveur HTTP local (ex : `python -m http.server`, l'extension Live Server de VS Code, etc.). L'ouverture directe en `file://` ne fonctionne pas à cause de la requête `fetch`.

## Sections du JSON

| Clé | Section affichée |
|---|---|
| `header` | Bandeau d'accueil plein écran (nom, titre, image de fond, introduction) |
| `experiences` | Expériences professionnelles (alternance gauche/droite) |
| `education` | Formation |
| `projectManagementSkills` | Compétences en gestion de projet |
| `otherSkills` | Compétences complémentaires et certifications associées |
| `tools` | Outils utilisés |
| `contact` | Coordonnées (email, téléphone, LinkedIn…) |
| `footer` | Copyright et crédits du pied de page |

Toutes les clés sont optionnelles : ne renseigner que celles qui sont pertinentes.

## Notes

- Les champs `copyright` et `credits` du footer acceptent du HTML (rendu via `innerHTML`), ce qui permet d'y inclure des liens.
- L'image définie dans `header.image` est réutilisée comme fond du footer.
- L'année du copyright est générée automatiquement par JavaScript.
