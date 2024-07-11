const express = require('express');
const router = express.Router();
const pool = require('../db/connection');


// Check if a user has liked a recipe
router.get('/like', async (req, res) => {
    const { user_id, recipe_id } = req.query;
    try {
        const result = await pool.query('SELECT * FROM likes WHERE user_id = $1 AND recipe_id = $2', [user_id, recipe_id]);
        if (result.rows.length > 0) {
            res.json({ liked: true });
        } else {
            res.json({ liked: false });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Like a recipe
router.post('/like', async (req, res) => {
    const { user_id, recipe_id } = req.body;
    try {
        await pool.query('INSERT INTO likes (user_id, recipe_id) VALUES ($1, $2)', [user_id, recipe_id]);
        res.json({ message: 'Recipe liked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Unlike a recipe
router.delete('/like', async (req, res) => {
    const { user_id, recipe_id } = req.query;
    try {
        await pool.query('DELETE FROM likes WHERE user_id = $1 AND recipe_id = $2', [user_id, recipe_id]);
        res.json({ message: 'Recipe unliked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
