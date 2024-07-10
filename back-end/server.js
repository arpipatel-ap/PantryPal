require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const db = require('./db/connection'); // Import the db module
const recipeHelper = require('./db/queries/recipe');
const PORT = process.env.PORT || 8080;
const app = express();
const session = require('express-session');


// Middleware setup
app.use(express.json());
app.use(cors());
app.use(session({
  secret:'canada key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Adjust for production environment
}));

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

const usersRoutes = require('./routes/users-api');
const recipeRoutes = require('./routes/recipes-api');
// const saveRoutes = require('./routes/save-api');
// const commentRoutes = require('./routes/comments-api');

app.use('/users', usersRoutes);
app.use('/recipes', recipeRoutes);
// app.use('/save', saveRoutes);
// app.use('/comments', commentRoutes);


// Example GET route to fetch data from PostgreSQL
app.get('/api/data', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



app.get('/api/test/db', async (req, res) => {
  app.use(express.static(path.join(__dirname, 'public')));
  try {
    const client = await db.connect(); // Try to connect to the database
    res.send('Database connection successful');
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Database connection error');
  }
});

// Default route handler
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/main', (req, res) => {
  recipeHelper.getAllRecipes()
    .then(recipes => {
      console.log(recipes);
      res.render('home', {recipes: recipes, user: req.session.userId});
    }).catch(error => {
      res.status(400).json({ message: error.message });
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
