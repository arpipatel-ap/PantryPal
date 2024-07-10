import CustomImage from "./customImage";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { HiSave } from "react-icons/hi";


export default function Saved({recipe}){
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image}/>
            <div className="recipe-card-info">
                <img className="auther-img" src={recipe.authorImg} alt=""/>
                <div className="save-icon">
                    <HiSave />
                </div>
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <a className="view-btn" href="#!">VIEW RECIPE</a>
                <div className="like-comment ">
                <BiSolidLike />
                <FaRegComment />
                </div>
            </div>
        </div>
    )
}