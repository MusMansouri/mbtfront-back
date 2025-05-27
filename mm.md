# Guide Complet : Création d’un Site Web pour un Institut de Beauté

**Stack : Node.js, Express, Vue.js, MySQL**

## Introduction

Ce guide explique étape par étape comment reconstruire un projet web professionnel pour un institut de beauté, utilisant un backend Node.js/Express/MySQL et un frontend Vue.js.
Vous y trouverez la configuration de l’environnement, l’organisation des fichiers, des extraits de code clés, et l’architecture logicielle du projet.

---

## Table des matières

1. [Pré-requis et Configuration de l’Environnement](#prerequis)
2. [Backend Node.js & Express](#backend)

   * [Initialisation et Installation](#backend-init)
   * [Configuration MySQL & Sequelize](#backend-bdd)
   * [Structure des Modèles (User, Ritual, Appointment...)](#backend-models)
   * [Routes, Contrôleurs, Services](#backend-architecture)
   * [Middlewares (Auth, Rôle)](#backend-middlewares)
   * [Gestion des Erreurs](#backend-errors)
   * [Scripts de Démarrage](#backend-start)
3. [Frontend Vue.js](#frontend)

   * [Initialisation du Projet](#frontend-init)
   * [Structure & Navigation (router)](#frontend-structure)
   * [Composants & Vues](#frontend-components)
   * [Appels API & Authentification](#frontend-api)
4. [Connexion Front/Back & Sécurité](#connexion)
5. [Conseils pour le Déploiement](#deploy)
6. [Annexes : Exemples de Fichiers](#annexes)

---

## 1. Pré-requis et Configuration de l’Environnement

### Outils nécessaires

* **Node.js** (LTS, v16+ recommandé)
* **npm** (installé avec Node.js)
* **MySQL** (ou MariaDB)
* **Vue CLI** (`npm install -g @vue/cli`)
* **Un éditeur** (ex: VS Code)
* **Git** (optionnel pour versionning)

### Installation de MySQL

1. Installer MySQL localement ou via XAMPP/MAMP.
2. Créer une base de données :

   ```sql
   CREATE DATABASE mabote_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

### Structure du projet

```
mbtfront-back/
  backend/
    controllers/
    models/
    routes/
    services/
    middlewares/
    config/
    app.js
    .env
  frontend/
    src/
      components/
      views/
      router/
      services/
      App.vue
      main.js
    package.json
```

---

## 2. Backend Node.js & Express

### 2.1 Initialisation et Installation

```bash
mkdir backend
cd backend
npm init -y
npm install express sequelize mysql2 dotenv cors helmet morgan jsonwebtoken bcrypt
npm install --save-dev nodemon
```

**Scripts dans ****\`\`**** :**

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

### 2.2 Configuration MySQL & Sequelize

**Fichier ****\`\`**** :**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=motdepasse
DB_NAME=mabote_db
JWT_SECRET=uneSuperCleSecrete
PORT=3001
```

**backend/config/database.js** :

```js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

module.exports = sequelize;
```

### 2.3 Structure des Modèles

\*\*Exemple : \*\*\`\`

```js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName:  { type: DataTypes.STRING, allowNull: false },
  email:     { type: DataTypes.STRING, allowNull: false, unique: true },
  password:  { type: DataTypes.STRING, allowNull: false },
  role:      { type: DataTypes.ENUM("client", "admin"), defaultValue: "client" }
}, {
  tableName: "users"
});

module.exports = User;
```

Procédez de même pour `Ritual.js`, `Appointment.js`, etc.

\`\`\*\* :\*\*

```js
const sequelize = require("../config/database");
const User = require("./User");
const Ritual = require("./Ritual");
const Appointment = require("./Appointment");

User.hasMany(Appointment);
Appointment.belongsTo(User);

Ritual.hasMany(Appointment);
Appointment.belongsTo(Ritual);

module.exports = {
  sequelize,
  User,
  Ritual,
  Appointment
};
```

### 2.4 Routes, Contrôleurs, Services

\*\*Exemple de route : \*\*\`\`

```js
const router = require("express").Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
```

\*\*Contrôleur : \*\*\`\`

```js
const UserService = require("../services/userService");
class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération" });
    }
  }
  // Autres méthodes...
}
module.exports = new UserController();
```

\*\*Service : \*\*\`\`

```js
const { User } = require("../models");
module.exports = {
  async getAllUsers() {
    return await User.findAll();
  },
  // Autres méthodes...
};
```

N'oubliez pas les fichiers similaires pour les entités : **auth**, **rituals**, **appointments**, etc.

### 2.5 Middlewares (Auth, Rôle)

\`\`

```js
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = function(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: "Token manquant" });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Token invalide" });
  }
};
```

\`\`

```js
module.exports = function(requiredRole) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Non authentifié" });
    if (req.user.role !== requiredRole) return res.status(403).json({ error: "Accès interdit" });
    next();
  };
};
```

### 2.6 Gestion des Erreurs

**Dans ****\`\`**** :**

```js
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
    return res.status(400).json({ error: "JSON mal formé" });
  next(err);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});
```

### 2.7 Lancement du serveur

**Dans ****\`\`**** :**

```js
const db = require("./models");
db.sequelize.authenticate()
  .then(() => db.sequelize.sync())
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("Erreur connexion MySQL:", err));
```

---

## 3. Frontend Vue.js

### 3.1 Initialisation du Projet

```bash
npm install -g @vue/cli
vue create frontend
cd frontend
npm install axios
```

### 3.2 Structure & Navigation (router)

\*\*Exemple : \*\*\`\`

```js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RitualsView from '../views/RitualsView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/rituels', name: 'Rituals', component: RitualsView },
  { path: '/login', name: 'Login', component: LoginView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

### 3.3 Composants & Vues

\*\*Exemple : \*\*\`\`

```html
<template>
  <div>
    <h1>Nos Rituels de Beauté</h1>
    <ul v-if="rituals.length">
      <li v-for="ritual in rituals" :key="ritual.id">
        <h3>{{ ritual.name }}</h3>
        <p>{{ ritual.description }}</p>
        <strong>{{ ritual.price }} €</strong>
      </li>
    </ul>
    <p v-else>Chargement...</p>
  </div>
</template>

<script>
import RitualService from "@/services/ritualService";
export default {
  data() { return { rituals: [] }; },
  async created() {
    this.rituals = await RitualService.fetchAllRituals();
  }
};
</script>
```

**Composant Navbar, Login, etc. à structurer de la même façon.**

### 3.4 Appels API & Authentification

\`\`

```js
import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" }
});
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
export default apiClient;
```

\`\`

```js
import apiClient from "./api";
export default {
  login(email, password) {
    return apiClient.post("/auth/login", { email, password }).then(res => res.data);
  },
  register(userData) {
    return apiClient.post("/auth/register", userData).then(res => res.data);
  }
};
```

**Usage dans un composant :**

```js
import AuthService from "@/services/authService";
methods: {
  async login() {
    try {
      const { token } = await AuthService.login(this.email, this.password);
      localStorage.setItem("token", token);
      this.$router.push({ name: 'Home' });
    } catch (e) {
      this.error = "Email ou mot de passe incorrect.";
    }
  }
}
```

---

## 4. Connexion Front/Back & Sécurité

* Le **backend** doit autoriser les appels du frontend (via CORS).
* Le **frontend** inclut le JWT dans l’en-tête de chaque requête protégée.
* Protégez les routes sensibles côté back (middleware auth et role).
* Côté front, utilisez des *guards* de navigation pour éviter d’afficher des vues privées sans connexion.

---

## 5. Conseils pour le Déploiement

* **Séparer** backend (API) et frontend (static) ou **servir le build du front** depuis Express (`app.use(express.static('public'))`).
* Mettre à jour les **variables d’environnement** pour l’URL API.
* Sécuriser la configuration (limiter le CORS, utiliser des secrets forts, gérer les erreurs proprement).
* Tester l’application sur l’environnement de production.

---

## 6. Annexes : Exemples de Fichiers

\*\*Exemple de fichier \*\*\`\`

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=motdepasse
DB_NAME=mabote_db
JWT_SECRET=uneSuperCleSecrete
PORT=3001
```

**Exemple de ****\`\`**** (backend)**

```json
{
  "name": "mbt-backend",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "helmet": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "morgan": "^1.10.0",
    "mysql2": "^3.3.0",
    "sequelize": "^6.32.1"
  }
}
```

---

## Conclusion

Ce guide vous permet de reconstruire un site moderne pour institut de beauté en Node.js/Express (backend), Vue.js (frontend), et MySQL (base de données).
Chaque section peut être enrichie selon vos besoins : gestion avancée des erreurs, tests unitaires, CI/CD, design responsive...

**Bon développement et bonne soutenance !**
