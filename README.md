# Installation du projet 

## Préréquis :
Node.js : https://nodejs.org/en/

## Téléchargement du frontend
Rendez-vous ici : https://github.com/natthanguilhot/GUILHOTNATTHAN_6_17062021_FRONTEND

## Téléchargement du backend
Rendez-vous ici : https://github.com/natthanguilhot/GUILHOTNATTHAN_6_17062021

## Initialisé le projet
Une fois les 2 dossiers téléchargés :
1. Dans le dossier "GUILHOTNATTHAN_6_17062021" (dossier correspondant au backend), créer un fichier nommé ".env".
2. Copiez les valeurs données dans le PDF dans le fichier ".env". ("MONGO_USERNAME" correspond à votre nom d'utilisateur sur la base de données | "MONGO_PASSWORD" correspond à votre mot de passe lié à votre nom d'utilisateur | "MONGO_DATABASE" correspond au nom de la base de donnée | "TOKEN" correspond au token généré pour auhtentifier les requêtes)

3. Ouvrez un invité de commande à la racine du dossier "GUILHOTNATTHAN_6_17062021" (dossier correspondant au backend).
4. Exécutez la commande : npm install (Pour installer toutes les dépendances nécéssaires)
5. Exécutez la commande : node server.js

6. Ouvrir un invité de commande dans le dossier "GUILHOTNATTHAN_6_17062021_FRONTEND" (dossier correspondant au frontend).
7. Exécutez la commande : npm install
8. Exécutez la commande : ng serve
9. Attendez la fin de la compilation du projet.

10. Enfin, ouvrez votre navigatueur et tapez l'url : localhost:4200