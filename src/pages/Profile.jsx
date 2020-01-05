import React, { useState, useEffect } from 'react'
import useSignUpForm from '../service/customHook'
import Cookies from "js-cookie";
import Axios from "axios";



export default function Profile() {
   const [disable, setDisable] = useState(true)
   const toggleDisable = () => setDisable(!disable)
   const postDataProfile = async () =>{
      const inputData = inputs
      const result = await Axios({ method: 'post', url: "http://127.0.0.1:8080/profile",
      headers: { 'Authorization': 'Bearer ' + token },
      data: inputData })
      console.log(result)
      setDisable(false)
   }
   const { inputs, handleInputChange, handleSubmit , setInputs} = useSignUpForm(postDataProfile);
   const token = Cookies.get('token')
   useEffect(() => {
      async function getdata() {
         const result = await Axios({ method: 'get', url: "http://127.0.0.1:8080/profile",
          headers: { 'Authorization': 'Bearer ' + token } })
         console.log(result.data.data)
         setInputs(result.data.data[0])
      }
      getdata()
   }, [disable])

  
   return (
      <div className="conatiner">
         <div className="row justify-content-sm-center">
            <div class="col-md-8 col-md-push-2">
               <div class="billing-details">
                  <div class="section-title">
                     <h3 class="title">User Profile</h3>
                  </div>
                  <button class="primary-btn order-submit" onClick={toggleDisable}>Edit</button>

                  <form action="#" class='form-profile'>
                     <div class="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input class="input" type="text" name="first_name" placeholder="First Name" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.first_name} />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Last Name</label>
                        <input class="input" type="text" name="last_name" placeholder="Last Name" disabled={disable}
                           onChange={handleInputChange}
                           value={inputs&&inputs.last_name} />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Address</label>
                        <input class="input" type="text" name="address" placeholder="Address" disabled={disable}
                           onChange={handleInputChange}
                           value={inputs&&inputs.address} />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Date Of Birth</label>
                        <input class="input" type="date" name="date_of_birth" placeholder="date_of_birth" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.date_of_birth}/>
                     </div>
                     <div class="form-group">
                        <label htmlFor="">City</label>
                        <input class="input" type="text" name="city_of_birth" placeholder="City" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.city_of_birth} />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Country</label>
                        <input class="input" type="text" name="country" placeholder="Country"  disabled={disable}/>
                     </div>
                     <div class="form-group">
                        <label htmlFor="">ZIP Code</label>
                        <input class="input" type="text" name="zip-code" placeholder="ZIP Code" disabled={disable} />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Telephone</label>
                        <input class="input" type="tel" name="phone" placeholder="Telephone" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.phone}/>
                     </div>
                     <a href="#" class="primary-btn order-submit" onClick={handleSubmit}
                     style={{margin:'0 auto'}} >Save</a>
                  </form>
               </div>
               {/* 
               <div class="order-notes">
                  <textarea class="input" placeholder="Order Notes"></textarea>
               </div> */}

            </div>
         </div>
      </div>

   )
}
