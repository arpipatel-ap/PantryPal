const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/save_recipes');


//get saved recipes
router.get('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect('/login');
    return res.send({message: 'You must be logged in to view saved recipes'});
  }
  userQueries.getSavedRecipesByUserId(req.query.userId)
    .then(recipes => {
      res.render('saved_recipes', {recipes: recipes, user: req.session.userId}); 
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});


//add saved recipe
router.post('/:id', (req, res) => {
  const userId = req.session.userId;
  const recipeId = req.params.id;
  if (!userId) {
    res.redirect('/login');
    return res.send({message: 'You must be logged in to save a recipe'});
  }


  userQueries.addSaveRecipe(userId, recipeId)
    .then((saved) => {
      res.redirect('/recipes/' + recipeId);
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});


//remove saved recipe
router.post('/:id/delete', (req, res) => {
  const userId = req.session.userId;
  const recipeId = req.params.id;
  if (!userId) {
    res.redirect('/login');
    return res.send({message: 'You must be logged in to remove a saved recipe'});
  }

  userQueries.removeSaveRecipe(userId, recipeId)
    .then((saved) => {
      res.redirect('/saved_recipes');
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;