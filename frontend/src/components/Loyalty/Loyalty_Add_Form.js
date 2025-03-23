import React,{useState} from "react";


export default function AddLoyaltyForm(){

    return(
<div className="container">      
<form>
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name="name" required/>
  </div>

  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" required/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div class="mb-3">
    <label for="telephone" class="form-label">Telephone</label>
    <input type="number" class="form-control" id="telephone" name="telephone" required/>
  </div>

  <div class="mb-3">
    <label for="address" class="form-label">Address</label>
    <input type="text" class="form-control" id="address" name="address" required/>
  </div>

  <div class="mb-3">
    <label for="category" class="form-label">Category</label>
    <input type="text" class="form-control" id="category" name="category" required/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>  
    )


}
