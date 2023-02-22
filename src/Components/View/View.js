import React,{useEffect,useState,useContext} from 'react';
import { firebaseContext } from '../../store/firebaseContext';
import { postContext } from '../../store/postContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import './View.css';
 function View() {
  const [userDetails,setUserDetails] = useState({})
  const {postDetails} = useContext(postContext)
  const {db} = useContext(firebaseContext)
  

  useEffect(()=>{
    const view  = async()=>{
      const {userId} = postDetails
      const userCollectionRef = collection(db, "users");
      const queryFromUser  =  query(userCollectionRef, where("id", "==", userId));
      const querySnapshot =  await getDocs(queryFromUser);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUserDetails(doc.data())
      });
    }
    
    view()
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.category} </span>
          <p>{postDetails.name} </p>
          <span>{postDetails.createdAt} </span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
