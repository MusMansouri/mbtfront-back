const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "your_database",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

const SECRET = "votre_secret_jwt"; // À stocker dans une variable d'environnement

// Middleware global de vérification
app.use((req, res, next) => {
  // Exemple : vérification d'un token dans les headers
  // Remplace cette logique par ta propre vérification
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  // ...logique de validation du token...
  next();
});

// Inscription
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Champs manquants" });

  // Vérifier si l'utilisateur existe déjà
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });
      if (results.length > 0)
        return res.status(409).json({ message: "Email déjà utilisé" });

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Erreur serveur" });
          res.status(201).json({ message: "Inscription réussie" });
        }
      );
    }
  );
});

// Connexion
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Champs manquants" });

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Erreur serveur" });
      if (results.length === 0)
        return res.status(401).json({ message: "Identifiants invalides" });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(401).json({ message: "Identifiants invalides" });

      // Générer un token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
        expiresIn: "1h",
      });
      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
