import React,{useContext} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext, firebaseContext } from '../../store/firebaseContext';
import { signOut } from 'firebase/auth';
function Header() {
  const navigate = useNavigate()
  const {user} = useContext(authContext)
  const {firebaseAuth} = useContext(firebaseContext)
  const handleLogout = ()=>{
    signOut(firebaseAuth);
    navigate('/login')
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        <Link to='/Signup'><span>{user ? user.displayName :'Login'}</span></Link>  
          <hr />
          
        </div>
       {user && <span onClick={handleLogout}> Logout</span>} 
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
           <Link to='/create'><span>SELL</span></Link> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
