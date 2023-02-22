import React, { useEffect , useContext } from 'react';
import {authContext, firebaseContext} from './store/firebaseContext'
import {BrowserRouter,  Routes ,Route} from 'react-router-dom'

 import Signup from './Pages/Signup'
 import Login from './Pages/Login'
 import Create from './Pages/Create'
 import View from './Pages/ViewPost'
import './App.css';
import Post from './store/postContext'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const {setUser} = useContext(authContext)
  const {firebaseAuth} = useContext(firebaseContext)
  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
      if(user){
        setUser(user)
        console.log('loginn in ');
      }
      })
  })
  return (
    <div>
      <Post>
     <BrowserRouter>
     <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/Signup' element={<Signup/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/create' element={<Create/>}/>
   <Route path='/view' element={<View/>}/>
     </Routes>
     
     </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
