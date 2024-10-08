const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const userQueries = require('../db/queries/recipe');


//get recipes from database
router.get('/recipes', async(req, res) => {
  try {
    const recipes = await userQueries.getRecipesWithUserProfiles();
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

//search recipes by title, ingredients, or directions
router.get('/search', async(req, res) => {
  const { query } = req.query;

  try {
    const recipes = await userQueries.searchRecipes(query);
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});



//add new recipe
router.get('/add_recipes', (req, res) => {
  res.render('add_recipes', { user: req.session.userId });
});

router.post('/add_recipes', (req, res) => {
  const userId = req.session.userId;
  
  if (!userId) {
    return res.status(400).send({ error: "error" });
  }
  const { title, ingredients, description, directions, image } = req.body;


  userQueries.addRecipe({ title, description, ingredients, directions, image, userId })
    .then((recipe) => {
      res.send({
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

// Retrieve categories name for nav bar from database
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT category_id,category_name FROM categories;');

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const recipes = await pool.query('SELECT category_name FROM categories WHERE category_id = $1;', [categoryId]);
    res.json(recipes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch recipes by category
router.get('/category', async (req, res) => {
const { category } = req.query;
console.log("inside recipes/categories", category);
try {
  const recipes = await userQueries.filterRecipesByCategory(category);
  res.json(recipes);
} catch (error) {
  console.log(error, "message error");
  res.status(500).json({ error: 'Internal server error' });
}
});


//add pages for home page
router.get('/', async (req, res) => {
  try {
    const recipes = await pool.query('SELECT * FROM recipes LIMIT 9');
    res.json(recipes.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//edit recipe
router.get('/edit/:id', (req, res) => {
  const recipeId = req.params.id;
  userQueries.getRecipe(recipeId)
    .then(recipe => {
      res.render('edit_recipe', { user: req.session.userId, recipe: recipe });
    });
});

router.post('/:id/edit_recipe', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect('/login');
    return res.send({ error: "User not logged in!" });
  }

  const recipeId = req.params.id;
  const { title, description, ingredients, directions, img } = req.body;

  userQueries.editRecipe({ title, description, ingredients, directions, img, recipeId })
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

// Retrieve an recipe from database
router.get('/:id', async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.session.userId;
  userQueries.getRecipeById(recipeId)
    .then(recipe => {
      if (!recipe) {

        return res.status(404).json({ message: "Recipe not found!" });
      }
      res.json({ recipe: recipe});
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});



module.exports = router;
