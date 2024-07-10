import {useState} from "react";
import NavBar from "../component/navbar";
import '../style/navbar.scss';
import '../style/home.scss';
import '../style/footer.scss';
import '../style/add_recipes.scss';
import '../style/view_recipes.scss';
import { GiHamburgerMenu } from "react-icons/gi";
import Footer from "../component/footer";
import View from "../component/view";


const ViewRecipes = () =>{
  
  const [showNav, setShowNav] = useState(false)
  return (

    <div className="content">
      <header>
        <GiHamburgerMenu  onClick={() => setShowNav(!showNav)}/>
        <a href ="#!" className="logo" >Pantry<span>Pal</span></a>
      </header>
      <NavBar show ={showNav} /> 
      <div className="main-add">
      <View />
      </div>
      <Footer />
    </div>
  
  );
}

export default ViewRecipes;