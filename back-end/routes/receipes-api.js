const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/recipe');
const { redirect } = require('react-router-dom');


//get recipes from database
router.get('/', async (req, res) => {
  userQueries.getRecipeById(req.session.userId)
    .then(recipes => {
      res.render('recipes', {recipes: recipes, user: req.session.userId});
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

//get all recipes without user id
router.get('/all', async (req, res) => {
  userQueries.getAllRecipes()
    .then(recipes => {
      res.render('recipes', {recipes: recipes, user: req.session.userId});
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

//add new recipe
router.get('/add_recipe', (req, res) => {
  res.render('add_recipe', {user: req.session.userId}); 
});


router.post('/add',  (req, res) => {
  const userId = req.session.userId;
 
  if (!userId) {
    return res.send({ error: "error" });
  }
  const newRecipe = req.body;
  newRecipe.user_id = userId;

  userQueries.addRecipe(newRecipe)
    .then(recipe => {
      res.json(recipe);
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

//edit recipe
router.get('/edit/:id', (req, res) => {
  const recipeId = req.params.id;
  userQueries.getRecipe(recipeId)
    .then(recipe => {
      res.render('edit_recipe', {user: req.session.userId, recipe: recipe});
    });
});

router.post('/:id/edit_recipe', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    redirect('/login');
    return res.send({ error: "User not logged in!" });
  }

  const recipeId = req.params.id;
  const {title, description, ingredients, directions, img} = req.body;

  userQueries.editRecipe({title, description, ingredients, directions, img, recipeId})
    .then(recipe => {
      res.redirect('/recipes');
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

//delete recipe
router.post('/:id/delete', (req, res) => {
  const userId = req.session.userId;
  const recipeId = req.params.id;

  if (!userId) {
    return res.send({ error: "User not logged in!" });
  }

  
  userQueries.deleteRecipe(recipeId)
    .then(() => {
      res.redirect('/recipes');
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

// Retrieve an item from database
router.get('/:id', async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.session.userId;
  userQueries.getRecipe(recipeId)
    .then(recipe => {
      if (!recipe) {
      
        return res.status(404).json({ message: "Recipe not found!" });
      }
      res.render('recipe', {recipe: recipe, user: userId});
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

//filter recipes by category
router.get('/category/:category', async (req, res) => {
  userQueries.filterRecipesByCategory(req.params.category)
    .then(recipes => {
      res.render('recipes', {recipes: recipes, user: req.session.userId});
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

//search recipes by title, ingredients, or directions
router.get('/search/:query', async (req, res) => {
  userQueries.searchRecipes(req.params.query)
    .then(recipes => {
      res.render('recipes', {recipes: recipes, user: req.session.userId});
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});



module.exports = router;