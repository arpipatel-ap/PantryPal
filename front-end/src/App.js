import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './component/navbar';
import LoginForm from './component/login';
import RegisterForm from './component/register';
import Home, { About } from './pages/home';
import Recipes from './pages/recipes';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  return (
    <Router>
       <NavBar isLoggedIn={isLoggedIn} /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
       
      </Routes>
    </Router>
  );
};

export default App;

