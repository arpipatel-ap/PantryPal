import React from "react";
import '../style/register.scss';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";


const RegisterForm = () =>{
  return (
    <div className="wrapper">
       <div className="form-container">
      <form action="/users/register" method="POST">
        <h1>Register</h1>
        <div className="input-box">
          <input type ="text" placeholder="Email" required />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input type ="text" placeholder="Username" required />
          <FaUser className="icon"/>
        </div>
        <div className="input-box">
          <input type ="password" placeholder="Password" required />
          <RiLockPasswordFill className="icon"/>
        </div>
        <button type ="submit">Register</button>

        //use AJAX 
        
      </form>
      </div>
    </div>
  );
}

export default RegisterForm;