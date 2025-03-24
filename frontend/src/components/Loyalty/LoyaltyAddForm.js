import React,{useState} from "react";
import axios from 'axios';

export default function AddLoyaltyForm(){

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[telephone, setTelephone] = useState("");
  const[address, setAddress] = useState("");
  const[category, setCategory] = useState("");

  function sendData(e){
    e.preventDefault();
    
    const newLoyalty = {
      name,
      email,
      telephone,
      address,
      category
    }

    axios.post("http://localhost:8080/LoyaltyProgramme/add", newLoyalty)
      .then(() => {
        alert("Loyalty Form Successfully Submitted")
        // Clear input fields after successful submission
        setName("");
        setEmail("");
        setTelephone("");
        setAddress("");
        setCategory("");
        
      })
      .catch((err) => {
        alert(err);
      });
  
  }

    return(
<div className="container">      
<form onSubmit={sendData}>
  <div className="mb-3">
    <label for="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" 
    onChange={(e)=>{
        setName(e.target.value);
    }}  />
  </div>

  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" 
    onChange={(e)=>{
      setEmail(e.target.value);
  }}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label for="telephone" className="form-label">Telephone</label>
    <input type="number" className="form-control" id="telephone" name="telephone" 
    onChange={(e)=>{
      setTelephone(e.target.value);
  }}/>
  </div>

  <div className="mb-3">
    <label for="address" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" name="address" 
    onChange={(e)=>{
      setAddress(e.target.value);
  }}/>
  </div>

  <div className="mb-3">
    <label for="category" className="form-label">Category</label>
    <input type="text" className="form-control" id="category" name="category"
    onChange={(e)=>{
      setCategory(e.target.value);
  }}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>  
    )


}
