const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/save_recipes');


//get saved recipes
router.get('/save_recipe', async (req, res) => {
  
  const userId = req.session.userId;
 
  if (!userId) {
    res.json({ redirectUrl: '/login' });
    return res.status(500).json({ error: 'You must be logged in!' });
  }
  try {
    const save = await userQueries.getSavedRecipesByUserId(userId);
    res.json(save);
  } catch (err) {
    console.error('Error fetching recipes:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
  
});


//add saved recipe
router.post('/:id', (req, res) => {
  const userId = req.session.userId;
  const recipeId = req.params.id;
  if (!userId) {
    res.json({ redirectUrl: '/login' });
    return res.status(500).json({ error: 'You must be logged in!' });
  }

  userQueries.addSaveRecipe(userId, recipeId)
    .then((saved) => {
      
      res.json({ saved });
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
  
});


//remove saved recipe
router.post('/:id/delete', (req, res) => {
  const userId = req.session.userId;
  const recipeId = req.params.id;
  if (!userId) {
    res.json({ redirectUrl: '/login' });
    return res.status(500).json({ error: 'You must be logged in!' });
  }

  userQueries.removeSaveRecipe(userId, recipeId)
    .then((saved) => {
      res.json({ saved });
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;