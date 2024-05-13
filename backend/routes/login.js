const express = require('express');
const pool = require('../db');

const router = express.Router();

// Route pour obtenir tous les personnels
router.get('/', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT email, mdp FROM login');
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
});

// Route pour vérifier un utilisateur
router.post('/verify', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { rows } = await pool.query('SELECT * FROM login WHERE email = $1', [email]);
        if (rows.length > 0) {
            const user = rows[0];
            if (user.mdp === password) {
                res.json({ status: 'success', message: 'Utilisateur vérifié avec succès' });
            } else {
                res.json({ status: 'error', message: 'Mot de passe incorrect' });
            }
        } else {
            res.json({ status: 'error', message: 'Email non trouvé' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

module.exports = router;