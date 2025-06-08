# Rapport de stage – Projet MABOTE (Illustré)

_Auteur : Mustapha Mansouri  
Formation : CDA – Concepteur Développeur d’Applications  
Entreprise d’accueil : Institut de beauté MABOTE (Mme Marine Guilbert)  
Année : 2025_

---

## Table des matières

- [1. Résumé du projet](#1-résumé-du-projet)
- [2. Cahier des charges détaillé](#2-cahier-des-charges-détaillé)
- [3. Analyse des compétences couvertes](#3-analyse-des-compétences-couvertes)
- [4. Fonctionnalités principales de l’application](#4-fonctionnalités-principales-de-lapplication)
- [5. Architecture technique du projet](#5-architecture-technique-du-projet)
- [6. Démarche de développement et méthodologie](#6-démarche-de-développement-et-méthodologie)
- [7. Livrables du projet et maquettes](#7-livrables-du-projet-et-maquettes)
- [8. Modélisation de la base de données (MCD, MLD, MPD)](#8-modélisation-de-la-base-de-données-mcd-mld-mpd)
- [9. Spécifications techniques et logique de développement](#9-spécifications-techniques-et-logique-de-développement)
- [10. Sécurité de l’application](#10-sécurité-de-lapplication)
- [11. Validation des données (front & back)](#11-validation-des-données-front--back)
- [12. Tests et assurance qualité (Postman, Jest)](#12-tests-et-assurance-qualité-postman-jest)
- [13. Intégration continue (CI/CD) et configuration du déploiement](#13-intégration-continue-cicd-et-configuration-du-déploiement)
- [14. Plan de déploiement futur](#14-plan-de-déploiement-futur)
- [15. Veille technologique et pistes d’évolution (V2)](#15-veille-technologique-et-pistes-dévolution-v2)
- [16. Conclusion et remerciements](#16-conclusion-et-remerciements)

---

## Analyse approfondie du projet

### Contexte et enjeux

L’institut MABOTE, structure indépendante, faisait face à une gestion manuelle des rendez-vous, source de contraintes (plages horaires limitées, erreurs humaines, indisponibilité hors horaires d’ouverture). Le projet visait à digitaliser ce processus pour :

- Améliorer la satisfaction client (réservation 24/7, moins d’attente, moins d’erreurs)
- Optimiser la gestion interne (vision claire du planning, moins d’appels à traiter)
- Moderniser l’image de l’institut

### Choix techniques et justification

- **Stack JavaScript full-stack** : Vue.js (front), Node.js/Express (API), Sequelize (ORM), MySQL (BDD)
- **Pourquoi ce choix ?**
  - Unification du langage (JS) pour faciliter la maintenance
  - Vue.js : simplicité, réactivité, adoption rapide
  - Express : flexibilité, communauté large, rapidité de développement
  - Sequelize : abstraction SQL, sécurité, rapidité de prototypage
  - MySQL : robustesse, gratuité, maîtrise des requêtes

> **Schéma de la stack :**
>
> ```
> [Client SPA Vue.js] <-> [API REST Node/Express] <-> [ORM Sequelize] <-> [MySQL]
> ```

### Difficultés rencontrées

- **Gestion des créneaux et des conflits de réservation**
  - Problème : éviter les doubles réservations sur un même créneau
  - Solution : requête de vérification d’unicité avant insertion, validation côté back
- **Sécurité des accès**
  - Problème : protéger l’admin, sécuriser les données
  - Solution : JWT, Bcrypt, Helmet, validation systématique des entrées
- **Expérience utilisateur**
  - Problème : rendre la réservation fluide et intuitive
  - Solution : formulaires dynamiques, feedback immédiat, design responsive

### Solutions apportées

- **API RESTful claire et documentée**
- **Composants Vue.js réutilisables**
- **Validation des données à tous les niveaux**
- **Tests manuels et amorce de tests automatisés**
- **Documentation technique et utilisateur**

### Valeur ajoutée du projet

- **Pour l’institut :**
  - Gain de temps, réduction des erreurs, meilleure visibilité sur l’activité
  - Image modernisée, fidélisation client
- **Pour le développeur :**
  - Maîtrise d’un projet complet, de la conception à la mise en production
  - Application des bonnes pratiques (sécurité, validation, CI/CD)

### Perspectives et évolutions

- **Ajout de notifications (email/SMS)**
- **Paiement en ligne**
- **Gestion multi-utilisateurs (plusieurs employés)**
- **Tests end-to-end et monitoring**
- **Automatisation complète du déploiement**

---

## 1. Résumé du projet

> **Illustration : Schéma d’architecture générale**

```text
[Client (Vue.js SPA)] <---(Axios/HTTP)---> [API REST (Node.js/Express)] <---(ORM Sequelize)---> [Base MySQL]
```

---

## 2. Cahier des charges détaillé

> **Illustration : Extrait d’objectifs et contraintes**

```text
Objectifs :
- Consultation et réservation de soins par les clientes
- Espace d’administration sécurisé
- Confidentialité des données et RGPD
- Interface responsive et intuitive

Contraintes :
- Durée : stage court, ressources limitées, pas de budget pour licences
- Solutions open-source privilégiées
- Respect du RGPD et documentation du process de déploiement
```

---

## 3. Analyse des compétences couvertes

> **Illustration : Liste des compétences mobilisées**

```text
- Analyse des besoins et rédaction du cahier des charges
- Conception et implémentation d’une architecture logicielle client/serveur
- Modélisation et création de la base de données (MCD, MLD, MPD)
- Développement d’une API REST (Express, Sequelize)
- Développement front-end avec Vue.js
- Implémentation de la sécurité (auth JWT, Bcrypt, Helmet…)
- Tests manuels (Postman) et automatisés (Jest)
- Préparation à l’intégration continue (GitHub Actions)
```

---

## 4. Fonctionnalités principales de l’application

> **Illustration : Exemple de composant Vue.js (Formulaire de réservation)**

```js
<template>
  <form @submit.prevent="reserver">
    <input v-model="nom" placeholder="Votre nom" required />
    <select v-model="rituelId" required>
      <option v-for="rituel in rituels" :key="rituel.id" :value="rituel.id">
        {{ rituel.nom }}
      </option>
    </select>
    <input type="datetime-local" v-model="dateHeure" required />
    <button type="submit">Réserver</button>
  </form>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return { nom: '', rituelId: '', dateHeure: '', rituels: [] };
  },
  created() {
    axios.get('/api/services').then(res => { this.rituels = res.data; });
  },
  methods: {
    reserver() {
      axios.post('/api/rendezvous', {
        nom: this.nom,
        rituelId: this.rituelId,
        dateHeure: this.dateHeure
      }).then(() => alert('Réservation envoyée !'));
    }
  }
}
</script>
```

---

## 5. Architecture technique du projet

> **Illustration : Organisation des dossiers back-end**

```
mbtback/
├── app.js
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── rendezVousController.js
│   └── serviceController.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── Utilisateur.js
│   ├── RendezVous.js
│   └── Service.js
├── routes/
│   ├── auth.js
│   ├── rendezvous.js
│   └── services.js
└── tests/
    └── rendezvous.test.js
```

---

## 6. Démarche de développement et méthodologie

> **Illustration : Découpage des tâches en lots**

```text
- Rédaction du cahier des charges après entretien client
- Prototypage rapide des maquettes sur Figma
- Découpage des tâches en lots : back puis front, puis sécurité, puis tests
- Développement par petites étapes, avec des tests réguliers (Postman, Jest)
- Documentation continue (README, .env.example)
```

---

## 7. Livrables du projet et maquettes

> **Illustration : Liste des livrables**

```text
- Application web fonctionnelle (front et back)
- Base de données MySQL structurée
- Maquettes Figma pour le parcours utilisateur et l’administration
- Documentation d’installation et d’utilisation
- Jeux de tests Postman et scripts Jest
```

---

## 8. Modélisation de la base de données (MCD, MLD, MPD)

> **Illustration : Exemple de modèle Sequelize (RendezVous.js)**

```js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const RendezVous = sequelize.define("RendezVous", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  heure: { type: DataTypes.TIME, allowNull: false },
  statut: { type: DataTypes.STRING, defaultValue: "EN_ATTENTE" },
});
module.exports = RendezVous;
```

---

## 9. Spécifications techniques et logique de développement

> **Illustration : Exemple de route Express pour la création de rendez-vous**

```js
// routes/rendezvous.js
const express = require("express");
const router = express.Router();
const rendezVousController = require("../controllers/rendezVousController");
const auth = require("../middlewares/auth");

router.post("/", auth, rendezVousController.creerRendezVous);
router.get("/", auth, rendezVousController.listerRendezVous);
router.put("/:id", auth, rendezVousController.modifierRendezVous);
router.delete("/:id", auth, rendezVousController.supprimerRendezVous);

module.exports = router;
```

---

## 10. Sécurité de l’application

> **Illustration : Middleware d’authentification JWT**

```javascript
// middlewares/auth.js
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token manquant" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};
```

---

## 11. Validation des données (front & back)

> **Illustration : Validation back (Express Validator)**

```javascript
const { body, validationResult } = require("express-validator");
router.post(
  "/signup",
  body("email").isEmail(),
  body("motDePasse").isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    // suite…
  }
);
```

---

## 12. Tests et assurance qualité (Postman, Jest)

> **Illustration : Test unitaire Jest (création utilisateur)**

```javascript
const request = require("supertest");
const app = require("../app");
describe("POST /api/utilisateurs/signup", () => {
  it("crée un nouvel utilisateur", async () => {
    const res = await request(app)
      .post("/api/utilisateurs/signup")
      .send({ nom: "Martin", email: "martin@ex.com", motDePasse: "azertyui" });
    expect(res.statusCode).toBe(201);
  });
});
```

---

## 13. Intégration continue (CI/CD) et configuration du déploiement

> **Illustration : Extrait de workflow GitHub Actions**

```yaml
name: Node.js CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm ci
      - run: npm test
```

---

## 14. Plan de déploiement futur

> **Illustration : Étapes du plan de déploiement**

```text
- Hébergement sur plateforme cloud ou serveur mutualisé
- Stockage sécurisé des variables (.env)
- Préparation de scripts de migration pour la base de données
- Ajout de notifications email/SMS pour la confirmation des rendez-vous
```

---

## 15. Veille technologique et pistes d’évolution (V2)

> **Illustration : Exemples de pistes d’évolution**

```text
- Automatisation complète du déploiement (CI/CD → cloud)
- Ajout d’un agenda graphique (calendrier JS)
- Multi-utilisateurs (plusieurs employées)
- Mise en place de tests end-to-end avec Cypress
```

---

## 16. Conclusion et remerciements

> **Illustration : Extrait de conclusion**

```text
Le projet MABOTE m’a permis de mettre en pratique toutes les étapes du cycle de développement : analyse, conception, développement full-stack, sécurisation, validation et préparation du déploiement.
J’ai gagné en autonomie, en rigueur et en professionnalisme.
Merci à la gérante Mme Guilbert, à mon formateur et à l’équipe CDA pour leur accompagnement.
```
