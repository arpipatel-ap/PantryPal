import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/register.scss';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';


const RegisterForm = () =>{
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate('/recipes');
        console.log('Registration successful');
      } else {
        // Registration failed, handle the error
        console.error('Registration failed:', data.error);
       
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('Registration failed: ' + error.message );
    }
  };
  return (
    <div className="wrapper">
       <div className="form-container">
       <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input type ="text"
           placeholder="Email" 
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           required />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input type ="text"
           placeholder="Username"
           value={username}
            onChange={(e) => setUsername(e.target.value)}
           required />
          <FaUser className="icon"/>
        </div>
        <div className="input-box">
          <input type ="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
          <RiLockPasswordFill className="icon"/>
        </div>
        <button type ="submit">Register</button>
        <div className="login-link">
        <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
        
      </form>
      </div>
    </div>
  );
}

export default RegisterForm;