const express = require('express');
const pool = require('../db');

const router = express.Router();

// Route pour compter le nombre de personnels
router.get('/count', async (req, res) => {
  try {
    const countQuery = await pool.query('SELECT COUNT(*) FROM liste');
    const count = countQuery.rows[0].count;
    res.json({ count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});


// Route pour obtenir tous les personnels
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM liste');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// Route pour ajouter un nouveau personnel
router.post('/', async (req, res) => {
  try {
    const { date_a, num_a, num_c, lieu, motif, date_c, resp} = req.body;
    const newListe = await pool.query(
      'INSERT INTO liste (date_a, num_a, num_c, lieu, motif, date_c, resp) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [date_a, num_a, num_c, lieu, motif, date_c, resp]
    );
    res.json(newListe.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});


// Route pour modifier un personnel existant
router.put('/:num_a', async (req, res) => {
  try {
    const { num_a } = req.params;
    const { date_a, num_c, lieu, motif, date_c, resp } = req.body;

    // Vérifier si toutes les valeurs obligatoires sont fournies
    if (!date_a || !num_c || !lieu || !motif || !date_c || !resp) {
      return res.status(400).json({ message: 'Toutes les valeurs obligatoires doivent être fournies' });
    }

    const updatedListe = await pool.query(
      'UPDATE liste SET date_a = $1, num_c = $2, lieu = $3, motif = $4, date_c = $5, resp = $6 WHERE num_a = $7 RETURNING *',
      [date_a, num_c, lieu, motif, date_c, resp, num_a]
    );
    res.json(updatedListe.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});




// Route pour supprimer un personnel
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM liste WHERE num_a = $1', [id]);
    res.json({ message: 'Courrier supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});


module.exports = router;