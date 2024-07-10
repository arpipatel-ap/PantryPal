import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './component/navbar';
import LoginForm from './component/login';
import RegisterForm from './component/register';
import Home from './pages/home';
import Recipes from './pages/recipes';
import AddRecipes from './pages/add_recipes';
import SavedRecipes from './pages/saved_recipes';
import MyRecipes from './pages/my_recipes';
import ViewRecipes from './pages/view_recipe';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  return (
    <Router>
       <NavBar isLoggedIn={isLoggedIn} /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add_recipes" element={<AddRecipes />} />
        <Route path="/my_recipes" element={<MyRecipes />} />
        <Route path="/view_recipes" element={<ViewRecipes />} />
        <Route path="/saved_recipes" element={<SavedRecipes />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
       
      </Routes>
    </Router>
  );
};

export default App;

