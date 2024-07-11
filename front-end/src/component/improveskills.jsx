import React from 'react';
import '../style/home.scss'; 
import backgroundImg from '../Assets/image.jpg'; 
import { Link } from 'react-router-dom';

export default function ImproveSkill() {
  const list = [
    "Learn New Recipes",
    "Experiment with food",
    "Write your Own Recipes",
   "Get Cooking Tips",
    "Known Nutritious fact",
    "Get Ranked"
  ]
  return (
    <div className="section improveskill">
      <div className="col img">
        <img src={backgroundImg} alt="" />
      </div>
      <div className="col typo">
        <h1 className="title">Improve Your Culinary Skills</h1>
        {list.map((item, index) => (
          <p className='skill-item' key={index}>{item}</p>
        ))}
        <Link to="/register">
      <button className="btn">Sign Up</button>
    </Link>
      </div>
    </div>
  );
}
