# Menu Magique

Application web légère pour planifier les repas de la semaine (midi et soir) et l&apos;utiliser directement sur Safari pour iPhone. Tout fonctionne hors connexion : une fois la page ouverte, les données sont sauvegardées dans le navigateur grâce au stockage local.

## Démarrage

Il n&apos;y a pas de serveur à lancer. Deux possibilités :

1. **Utilisation directe** : ouvrez simplement `index.html` dans Safari (ou un autre navigateur moderne) sur votre Mac, puis ajoutez la page à l&apos;écran d&apos;accueil de votre iPhone.
2. **Via un petit serveur statique** (optionnel pour les tests sur ordinateur) :

   ```bash
   npx serve .
   ```

   Ensuite, ouvrez [http://localhost:3000](http://localhost:3000) et testez l&apos;application.

## Fonctionnalités

- Planification d&apos;une semaine complète (midi/soir pour chaque jour).
- Suggestions intégrées et possibilité d&apos;ajouter vos propres idées.
- Feuille de suggestions en plein écran, adaptée au mode portrait sur iPhone.
- Sauvegarde automatique dans le navigateur, disponible hors connexion.
- Export du planning au format texte (copie dans le presse-papiers ou affichage dans une fenêtre dédiée).

## Astuces pour iOS

- Ouvrez `index.html` dans Safari, appuyez sur le bouton de partage puis sur **Ajouter à l&apos;écran d&apos;accueil** pour profiter d&apos;une expérience plein écran.
- Le mode sombre est automatiquement détecté et appliqué si votre iPhone est configuré en thème sombre.
- Le stockage local est propre à votre appareil ; les modifications ne sont pas synchronisées entre différents téléphones.
