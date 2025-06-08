markdown_content = """
# Rapport de stage – Projet MABOTE

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
- [Annexes](#annexes)

---

## 1. Résumé du projet

Le projet **MABOTE** est une application web de prise de rendez-vous pour un institut de beauté, offrant aux clients la possibilité de réserver en ligne 24h/24, tout en permettant à la gérante d’administrer ses services, ses créneaux et ses contenus.  
La solution s’appuie sur une architecture moderne :  
- **Frontend** : Vue.js (SPA)  
- **Backend** : Node.js/Express (API REST)  
- **Base de données** : MySQL, ORM Sequelize  
L’application assure la sécurité (authentification JWT, mots de passe hashés), la validation des données, et prépare l’automatisation du déploiement.

---

## 2. Cahier des charges détaillé

**Contexte :**  
L’institut MABOTE souhaitait moderniser la gestion de son planning, améliorer le service client (fini les contraintes d’horaires et le risque de double-réservation).  
**Objectifs :**
- Consultation et réservation de soins par les clientes
- Espace d’administration sécurisé
- Confidentialité des données et RGPD
- Interface responsive et intuitive

**Contraintes :**  
- Durée : stage court, ressources limitées, pas de budget pour licences
- Solutions open-source privilégiées
- Respect du RGPD et documentation du process de déploiement

---

## 3. Analyse des compétences couvertes

Le projet m’a permis de mobiliser :  
- L’analyse des besoins et la rédaction du cahier des charges
- La conception et l’implémentation d’une architecture logicielle client/serveur
- La modélisation et la création de la base de données (MCD, MLD, MPD)
- Le développement d’une API REST (Express, Sequelize)
- Le développement front-end avec Vue.js
- L’implémentation de la sécurité (auth JWT, Bcrypt, Helmet…)
- Les tests manuels (Postman) et automatisés (Jest)
- La préparation à l’intégration continue (GitHub Actions)

---

## 4. Fonctionnalités principales de l’application

### Côté client
- **Consultation des soins** (catalogue dynamique)
- **Réservation de rendez-vous** avec choix du service, de la date et créneau
- **Confirmation immédiate** sur l’interface

### Côté administrateur
- **Gestion des rendez-vous** : liste, validation, annulation
- **CRUD des services** (création, édition, suppression)
- **Gestion du contenu éditorial**

#### composant Vue.js (Formulaire de réservation)

```vue
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
5. Architecture technique du projet
L’application est organisée selon une architecture en couches :

Front-end (Vue.js) : Gère l’interface utilisateur, la navigation, l’affichage des rendez-vous, l’administration des services et des contenus, et communique avec l’API via Axios.

Back-end (Node.js/Express) : Expose une API RESTful sécurisée, applique les règles métier, gère l’authentification, l’autorisation et la validation des données.

Base de données (MySQL via Sequelize) : Stocke les utilisateurs, les services (rituels), les rendez-vous, les conseils et les feedbacks.

Description textuelle du schéma :

scss
Toujours afficher les détails

Copier
[Client (Vue.js SPA)] <---(Axios/HTTP)---> [API REST (Node.js/Express)] <---(ORM Sequelize)---> [Base MySQL]
Exemple d’organisation des dossiers back-end :
shell
Toujours afficher les détails

Copier
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
6. Démarche de développement et méthodologie
J’ai suivi une démarche itérative :

Rédaction du cahier des charges après entretien client

Prototypage rapide des maquettes sur Figma

Découpage des tâches en lots : back puis front, puis sécurité, puis tests

Développement par petites étapes, avec des tests réguliers (Postman, Jest)

Documentation continue (README, .env.example)

Bien que seul sur le projet, j’ai régulièrement sollicité la gérante pour valider l’avancement, et un formateur pour valider la sécurité.

7. Livrables du projet et maquettes
Application web fonctionnelle (front et back)

Base de données MySQL structurée

Maquettes Figma pour le parcours utilisateur et l’administration

Documentation d’installation et d’utilisation

Jeux de tests Postman et scripts Jest

8. Modélisation de la base de données (MCD, MLD, MPD)
Modèle Conceptuel (MCD) – description textuelle
Utilisateur : id, nom, email, mot_de_passe_hash, rôle

Rituel : id, nom, description, durée, prix

RendezVous : id, date, heure, statut, id_utilisateur, id_rituel

Conseil : id, titre, contenu

Feedback : id, commentaire, note, date, id_utilisateur, id_rituel

Relations :

Un utilisateur peut prendre plusieurs rendez-vous.

Un rendez-vous est lié à un utilisateur et à un rituel.

Un utilisateur peut donner plusieurs feedbacks sur des rituels.

modèle Sequelize (RendezVous.js) :
js
Toujours afficher les détails

Copier
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RendezVous = sequelize.define('RendezVous', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  heure: { type: DataTypes.TIME, allowNull: false },
  statut: { type: DataTypes.STRING, defaultValue: 'EN_ATTENTE' }
});
module.exports = RendezVous;
9. Spécifications techniques et logique de développement
Exemple : Route Express pour la création de rendez-vous
js
Toujours afficher les détails

Copier
// routes/rendezvous.js
const express = require('express');
const router = express.Router();
const rendezVousController = require('../controllers/rendezVousController');
const auth = require('../middlewares/auth');

router.post('/', auth, rendezVousController.creerRendezVous);
router.get('/', auth, rendezVousController.listerRendezVous);
router.put('/:id', auth, rendezVousController.modifierRendezVous);
router.delete('/:id', auth, rendezVousController.supprimerRendezVous);

module.exports = router;
logique métier : Contrôleur création de rendez-vous
js
Toujours afficher les détails

Copier
// controllers/rendezVousController.js
const RendezVous = require('../models/RendezVous');
exports.creerRendezVous = async (req, res) => {
  try {
    const { date, heure, id_rituel } = req.body;
    // Validation : pas de double-réservation sur le même créneau
    const dejaPris = await RendezVous.findOne({ where: { date, heure } });
    if (dejaPris) return res.status(400).json({ message: 'Créneau déjà réservé' });
    const rdv = await RendezVous.create({ ...req.body, id_utilisateur: req.user.id, statut: 'EN_ATTENTE' });
    res.status(201).json(rdv);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
10. Sécurité de l’application
Hashage des mots de passe avec Bcrypt avant stockage :

js
Toujours afficher les détails

Copier
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(motDePasse, 10);
Authentification JWT sur toutes les routes sensibles :

js
Toujours afficher les détails

Copier
const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
Middlewares d’authentification et d’autorisation :

js
Toujours afficher les détails

Copier
// middlewares/auth.js
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
Helmet, CORS activés, validation des entrées serveur et client

11. Validation des données (front & back)
validation back (Express Validator) :
js
Toujours afficher les détails

Copier
const { body, validationResult } = require('express-validator');
router.post(
  '/signup',
  body('email').isEmail(),
  body('motDePasse').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    // suite…
  }
);
Validation front (Vue.js) :
vue
Toujours afficher les détails

Copier
<input v-model="email" @blur="verifierEmail" />
<span v-if="!emailValide">Adresse email invalide</span>
12. Tests et assurance qualité (Postman, Jest)
Test unitaire Jest (création utilisateur) :
js
Toujours afficher les détails

Copier
const request = require('supertest');
const app = require('../app');
describe('POST /api/utilisateurs/signup', () => {
  it('crée un nouvel utilisateur', async () => {
    const res = await request(app)
      .post('/api/utilisateurs/signup')
      .send({ nom: "Martin", email: "martin@ex.com", motDePasse: "azertyui" });
    expect(res.statusCode).toBe(201);
  });
});
test Postman (JSON brut) :
json
Toujours afficher les détails

Copier
POST /api/rendezvous
{
  "date": "2025-06-20",
  "heure": "14:00",
  "id_rituel": 2
}
13. Intégration continue (CI/CD) et configuration du déploiement
workflow GitHub Actions :
yaml
Toujours afficher les détails

Copier
name: Node.js CI

on:
  push:
    branches: [ main ]

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
Déploiement prévu sur Heroku/Netlify ou VPS, variables d’environnement via .env

Documentation d’installation dans README.md

14. Plan de déploiement futur
Hébergement sur plateforme cloud ou serveur mutualisé

Stockage sécurisé des variables (.env)

Préparation de scripts de migration pour la base de données

Ajout de notifications email/SMS pour la confirmation des rendez-vous

15. Veille technologique et pistes d’évolution (V2)
Automatisation complète du déploiement (CI/CD → cloud)

Ajout d’un agenda graphique (calendrier JS)

Multi-utilisateurs (plusieurs employées)

Mise en place de tests end-to-end avec Cypress

16. Conclusion et remerciements
Le projet MABOTE m’a permis de mettre en pratique toutes les étapes du cycle de développement : analyse, conception, développement full-stack, sécurisation, validation et préparation du déploiement.
J’ai gagné en autonomie, en rigueur et en professionnalisme.
Merci à la gérante Mme Guilbert, à mon formateur et à l’équipe CDA pour leur accompagnement.

Annexes
Schéma descriptif du MCD/MLD (voir section 8)

Extraits de code supplémentaires

Documentation d’installation (README, .env.example, scripts SQL)

"""

with open("/mnt/data/rapport-mabote.md", "w", encoding="utf-8") as f:
f.write(markdown_content)