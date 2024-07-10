import {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../style/login.scss';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';


const LoginForm = () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username , password }),
      });

      const data = await response.json();
        console.log(data);
      if (response.ok) {
        // Redirect or handle success as needed
        navigate('/recipes');
        console.log('Login successful');
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Login failed message' );
    }
  };


  return (
    <div className="wrapper">
     <div className="form-container">
     <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        {error && <p className="error-message">{error}</p>}
        <button type ="submit">Login</button>
        <div className="register-link">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
      </div>
    </div>
  );
}

export default LoginForm;