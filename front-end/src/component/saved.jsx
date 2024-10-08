import React, { useState, useEffect, useCallback } from 'react';
import CustomImage from "./customImage";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { HiSave } from "react-icons/hi";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Saved({ recipe, userId  }) {
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();
  
  const handleRemoveSaveRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/save/${recipe.recipe_id}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe })
      });
   
      if (response.ok) {
        navigate(0);
      } else {
        setError('Failed to remove recipe!');
        console.error('Failed to remove recipe!');
      }
    } catch (error) {
        
        setError('There was an error removing the recipe!');
        console.error('There was an error removing the recipe!', error);
    }

  };
  useEffect(() => {
    
    const fetchLikeStatus = async () => {
        try {
            const res = await axios.get(`/likes/like-status/${userId}/${recipe.recipe_id}`);
            
            setLiked(res.data.hasLiked);

        } catch (error) {
            console.error('Error fetching like status:', error.message);
        }
    };

    const fetchLikes = async () => {
        try {
            const res = await axios.get(`/likes/likes/${recipe.recipe_id}`);
            
            setLikeCount(parseInt(res.data.count, 10));
        } catch (error) {
            console.error('Error fetching like count:', error.message);
        }
    };

        fetchLikeStatus();
        fetchLikes();
    }, [userId, recipe.recipe_id]);

    const handleLike = useCallback(async () => {
        try {
            if (liked) {
                await axios.delete('/likes/like', { data: { user_id: userId, recipe_id: recipe.recipe_id } });
                setLikeCount((prev) => Math.max(prev - 1, 0));
             } else {
                await axios.post('likes/like', { user_id: userId,   recipe_id: recipe.recipe_id });
            setLikeCount((prev) => prev + 1);
            }
            setLiked(!liked);
        } catch (error) {
            console.error('Error updating like status:', error.message);
        }
    }, [liked, userId, recipe.recipe_id]);


return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.img}/>
            <div className="recipe-card-info">
                <img className="auther-img" src={recipe.profile_pic} alt=""/>
                <div className="save-icon">
                   <Link onClick={handleRemoveSaveRecipe}><HiSave /></Link>
                </div>
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-desc">{recipe.description}</p>
                <Link className="view-btn" to={`/recipes/${recipe.recipe_id}`}>VIEW RECIPE</Link>
                 <div className="like-comment">
                    <div className='like'>
                        <BiSolidLike onClick={handleLike} className={liked ? 'liked' : ''} />
                        <span>{likeCount}</span>
                    </div>
                    <Link to={`/recipes/${recipe.recipe_id}`} className='comment'>
                        <FaRegComment />
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}