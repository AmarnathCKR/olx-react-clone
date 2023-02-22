import React, { useState, useEffect,useContext } from 'react';
import { collection, getDocs } from "firebase/firestore"; 

import Heart from '../../assets/Heart';
import { firebaseContext } from '../../store/firebaseContext';
import './Post.css';
import { postContext } from '../../store/postContext';
import {useNavigate} from 'react-router-dom';
function Posts() {
 
  const {db} = useContext(firebaseContext)
  const [product,setProduct] = useState([])
  const {setPostDetails} = useContext(postContext)
   const navigate = useNavigate()
 useEffect(()=>{
  getDocs(collection(db,"Products")).then((querySnapshot)=>{
const allPost = querySnapshot.docs.map((doc)=>{
  return{
    ...doc.data(),
    id:doc.id
  }

})
console.log(allPost);

setProduct(allPost)
  })
},[])
    

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
          product.map((product,key)=>{
        return <div key={key}
            className="card"
            // key={product.id}
            onClick={()=>{
                 setPostDetails(product)
              navigate('/view')
            }}
           
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.image} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAtd}</span>
            </div>
          </div>
        
          })
         }

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
