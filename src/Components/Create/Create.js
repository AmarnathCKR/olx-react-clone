import React, { Fragment, useState,useContext } from 'react';
import {getStorage , ref , getDownloadURL , uploadBytesResumable } from 'firebase/storage'
import { addDoc,collection} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import {authContext,firebaseContext} from '../../store/firebaseContext'
const  Create = () => {
  const navigate = useNavigate()
  const {db} = useContext(firebaseContext)
  const {user} = useContext(authContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const data = new Date()
  const  handleSubmit  =() =>{
    if(image == null) return ; 
  
    const storage = getStorage();
    const  imagesRef = ref(storage, `/image/${image.name}`)
      const productCollectionRef = collection(db,"Products")
      //  uploadBytes(imagesRef, image).then(()=>{
          uploadBytesResumable(imagesRef,image).then(()=>{
        // alert('image done')
         getDownloadURL(imagesRef).then((url)=>{
          console.log(url);
         addDoc(productCollectionRef,{
               name:name,
               category:category,
               price:price,
               image : url,
              userId :user.uid,
              createdAt :data.toString()
        }).then(()=>{
          navigate('/')
        }).catch((error)=>{
          console.log(error);
        })
      })
      //  
      //   }).then(()=>{
      //     //  navigate('/login')
      //     console.log('sucesss');
      //   })
      // }).catch((error)=>{
      //  console.log(error);
      })  
   
    
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              // defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              // defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input"
             type="number" 
             id="fname"
            name="Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
              
              />
            <br />
         
          <br />
          <img  alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
         
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])}  type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
