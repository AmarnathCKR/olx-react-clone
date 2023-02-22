import React, { useState,useContext } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import {firebaseContext} from '../../store/firebaseContext'
// import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {firebaseAuth} = useContext(firebaseContext)
  const handleLogin = (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(firebaseAuth,email,password).then(()=>{
      navigate('/')
    }).catch((error)=>{
    console.log(error)
    })
  }
  return (
    <div className='bg'>
      <div className="loginParentDiv">
        {/* <img width="200px" height="200px" src={Logo} alt='login img'></img> */}
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            // defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            // defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
          <a  href='#/' >Signup</a>
        </form>
     
      </div>
    </div>
  );
}

export default Login;
