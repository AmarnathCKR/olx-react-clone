import React, { useState,useContext } from 'react';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
 import { addDoc,collection} from 'firebase/firestore'

import { firebaseContext } from '../../store/firebaseContext';
import {Link, useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const {firebaseAuth,db} = useContext(firebaseContext)
  const userCollectionRef = collection(db,"users")
  const handleSubmit = async (e)=>{
    e.preventDefault()
     createUserWithEmailAndPassword(firebaseAuth,email,password).then((result)=>{
      updateProfile(firebaseAuth.currentUser,{
        displayName:username
      })
   console.log(result);
   try {
    addDoc(userCollectionRef,{
      id:result.user.uid,
      username:username,
      email:email,
      phone:phone,
      password:password
    }).then(()=>{
       navigate('/login')
    })
     } catch (err) {
    console.log(err);
  }
})
  
  }
  return (
    <div >

      <div className='bg' >
        <div className="signupParentDiv">
        <img width="200px" height="200px" className='logo' src={Logo}  alt="logo img" ></img>
        <form className='input_frm' onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text" 
            id="fname"
            name="name"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            // defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            // defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            // defaultValue="Doe"
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
            onChange={(e)=>{setPassword(e.target.value)}}
            // defaultValue="Doe"
          />
          <br />
          <br />
          <button type='submit' >Signup</button>
          <Link to='/login'> Login </Link> 
        </form>
       
      </div>
    </div>
        </div>
       
  );
}
