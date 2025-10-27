# Menu Magique

Planificateur hebdomadaire de repas en React conçu pour une expérience mobile fluide. L'interface est pensée pour fonctionner directement sur iOS avec de larges zones tactiles et le support du glisser-déposer longue pression.

## Démarrage

```bash
npm install
npm run dev
```

Le serveur de développement démarre sur [http://localhost:5173](http://localhost:5173). Pour construire la version de production :

```bash
npm run build
```

## Fonctionnalités

- Planning hebdomadaire complet (midi/soir pour chaque jour).
- Bibliothèque de suggestions prêtes à être glissées dans le planning.
- Optimisations mobiles : grands boutons, zones tactiles généreuses et activation par appui long.
- Détection iOS pour adapter l'expérience à Safari mobile.

## Astuces iOS

- Ajoutez l'application à l'écran d'accueil via Safari pour profiter du mode plein écran.
- Le `body` s'adapte automatiquement avec les insets sécurisés (`safe-area`).
- Le glisser-déposer nécessite un appui long, idéal pour éviter les déclenchements involontaires sur mobile.
