This is a training session and not a real project, with a Spring Boot back-end and Angular.ts front-end part.
That's under development...

# Frontend-App TaskList (Angular & Spring Boot)
## Description
Ce projet est une application de gestion de tâches combinant un **Frontend sous Angular** avec un **Backend sous Spring Boot**. Elle permet aux utilisateurs de créer, modifier, supprimer et afficher des tâches à travers une interface utilisateur moderne et réactive.
## 🛠️ **Technologies utilisées**
### **Frontend (Angular)**
- **Framework Angular** (v16 ou ultérieur) :
    - Gestion d'état avec **Angular Signals**.
    - Design moderne via **Angular Material** (thème `rose-red` intégré).
    - Manipulation et gestion des dates grâce à **Luxon**.
    - Interactions avec une API REST via **HttpClient**.

- **SCSS** : Stylisation avancée grâce au préprocesseur SCSS.
- **Hydratation Server-Side Rendering (SSR)** :
    - Utilisée pour améliorer le SEO et optimiser le temps de chargement initial.

### **Backend (Spring Boot)**
- L'API REST côté backend est construite avec Spring Boot pour gérer les tâches. Elle offre plusieurs endpoints, tels que :
    - `POST /save` : Ajouter une tâche.
    - `PUT /update/{id}` : Modifier une tâche.
    - `GET /tasks` : Récupérer la liste des tâches.
    - `DELETE /delete/{id}` : Supprimer une tâche.

## ✨ **Fonctionnalités**
### **1. Gestion des tâches**
- Ajouter une tâche avec un titre, une description, une date et son état (complétée ou non).
- Modifier ou mettre à jour une tâche directement depuis l'interface.
- Supprimer des tâches.

### **2. Vue "Agenda" interactive**
- Visualisation des tâches par date dans un calendrier.
- Navigation par mois pour afficher les tâches passées ou futures.

### **3. Interface utilisateur moderne**
- **Fenêtres modales** pour gérer les entrées de données.
- Segmentation claire entre les **tâches terminées** et les **tâches en attente**.

## ✅ **Prérequis pour l'installation**
### **Outils requis**
1. **Node.js** (> v16) et **npm** (Node Package Manager).
2. Angular CLI, à installer avec :
``` bash
   npm install -g @angular/cli
```
1. **Backend Spring Boot** :
    - API configurée pour fonctionner avec l'interface frontend Angular ([consultez les configurations dans `app.token.ts`]).

### **Configuration locale**
1. **Cloner le dépôt**
``` bash
   git clone https://github.com/votre-repo/frontend-app-tasklist-angular-spring.git
   cd frontend-app-tasklist-angular-spring
```
1. **Installer les dépendances**
``` bash
   npm install
```
1. **Configurer le proxy Angular (optionnel)**
    - Créer un fichier `proxy.conf.json` pour rediriger les requêtes vers le backend :
``` json
     {
       "/api": {
         "target": "http://localhost:8080",
         "secure": false,
         "logLevel": "debug"
       }
     }
```
- Pour démarrer avec le proxy activé :
``` bash
     ng serve --proxy-config proxy.conf.json
```
1. **Vérifier l'URL du backend**
    - Assurez-vous dans `src/environments/app.token.ts` que l'URL est correcte :
``` typescript
     export const URL_API = 'http://localhost:8080/api';
```
## 🚀 **Lancer l'application**
### **Frontend : démarrage**
1. En mode développement :
``` bash
   ng serve --open
```
1. Générer une version de production :
``` bash
   ng build --configuration production
```
### **Backend : démarrage**
1. Assurez-vous que votre serveur Spring Boot est configuré pour écouter sur le port `8080` :
``` bash
   mvn spring-boot:run
```
1. L'API backend sera disponible à :
``` 
   http://localhost:8080/api
```
## 🧩 **Structure du projet**
### **Côté Frontend (Angular)**
``` 
src/
├── app/
│   ├── agenda/              # Gestion du calendrier et des tâches
│   ├── task-list/           # Liste et gestion des tâches
│   ├── modal/               # Modal interactif pour les tâches
│   ├── home/                # Composant d'accueil Home
├── assets/                  # Ressources et assets statiques
├── environments/            # Configuration pour dev et production
└── index.html               # Point d'entrée principal
```
- **`angular.json` **: Configure le projet Angular (build, thèmes, SSR).

### **Backend Spring Boot**
Fournit une **API RESTful**, accessible depuis le Frontend. Elle gère les tâches via des appels HTTP (`GET`, `POST`, etc.).
## 📦 **Caractéristiques clés**
1. **Modularité** :
    - Les fonctionnalités sont organisées sous forme de modules pour assurer une séparation claire.

2. **Réactivité avec Signals** :
    - L'état est géré efficacement en utilisant **Angular Signals**, en remplaçant certains paradigmes classiques comme RxJS dans le projet.

3. **Testabilité** :
    - Tests possibles en utilisant Angular CLI :
``` bash
     ng test
```
## 👨‍💻 **Comment contribuer ?**
1. **Forker** le projet.
2. Créez une branche pour vos modifications :
``` bash
   git checkout -b feature/ma-nouvelle-fonctionnalité
```
1. Proposez une pull request sur la branche principale.

## 🎯 **Liens utiles**
- [Documentation Angular](https://angular.io/docs)
- [Documentation Spring Boot](https://spring.io/projects/spring-boot)
- [Luxon Documentation](https://moment.github.io/luxon/)

✨ **Merci de contribuer et de tester ce projet !**

