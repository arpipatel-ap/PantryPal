const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/recipe');


//get recipes from database
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await userQueries.getRecipesWithUserProfiles();
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

//search recipes by title, ingredients, or directions
router.get('/search', async (req, res) => {
  const { query } = req.query;
  
  try {
    const recipes = await userQueries.searchRecipes(query);
    res.json(recipes); // Send the recipes back as JSON
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
  


//add new recipe
router.get('/add_recipes', (req, res) => {
  res.render('add_recipes', {user: req.session.userId});
});

router.post('/add_recipes',  (req, res) => {
  const userId = req.session.userId;
 
  if (!userId) {
    return res.send({ error: "error" });
  }
  const {title, ingredients, description, directions, image} = req.body;
  
  
  userQueries.addRecipe({title,  ingredients, description,directions, image, userId})
    .then((recipe) => {
      res.send({
        id: recipe.id,
        title: recipe.title,
        ingredients: recipe.ingredients,
        description: recipe.description,
        directions: recipe.directions,
        image: recipe.image,
        userId: recipe.userId
      });
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
    res.redirect('/login');
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





module.exports = router;