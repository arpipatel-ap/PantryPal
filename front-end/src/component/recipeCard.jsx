import React, { useState, useEffect } from 'react';
import CustomImage from "./customImage";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { HiSave } from "react-icons/hi";
import axios from 'axios';
import '../style/recipes.scss';

axios.defaults.baseURL = 'http://localhost:3000';


export default function RecipeCard({recipe, userId}){
    const [liked, setLiked] = useState(false);

    useEffect(() => {
    //     console.log('User ID:', userId);
    // console.log('Recipe ID:', recipe.id);
        // Check if the user has already liked the recipe
        axios.get(`/api/likes?user_id=${userId}&recipe_id=${recipe.id}`)
      
            .then(response => {
                if (response.data.liked) {
                    setLiked(true);
                }
            })
            .catch(error => {
                console.error("There was an error checking the like status!", error);
            });
    }, [userId, recipe.id]);

    const handleLike = () => {
        console.log('User ID:', userId);
    console.log('Recipe ID:', recipe.id);


        if (liked) {
            axios.delete(`/likes/like?user_id=${userId}&recipe_id=${recipe.id}`)
                .then(response => {
                    setLiked(false);
                })
                .catch(error => {
                    console.error("There was an error unliking the recipe!", error);
                });
        } else {
            axios.post('/likes/like', { user_id: userId, recipe_id: recipe.id })
                .then(response => {
                    setLiked(true);
                })
                .catch(error => {
                    console.error("There was an error liking the recipe!", error);
                });
        }
    };
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.img} />
            <div className="recipe-card-info">
                <img className="auther-img" src={recipe.profile_pic} alt=""/>
                <div className="save-icon">
                    <HiSave />
                </div>
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-desc">{recipe.description}</p>
                <a className="view-btn" href="#!">VIEW RECIPE</a>
                <div className="like-comment ">
                <BiSolidLike onClick={handleLike} className={liked ? 'liked' : ''} />
                <FaRegComment />
                </div>
            </div>
        </div>
    );
}