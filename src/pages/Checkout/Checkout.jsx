import React, {useEffect, useState} from 'react'
import CartSummary from './cart'
import useSignUpForm from '../../service/customHook'
import Cookies from "js-cookie";
import Axios from "axios";


export default function Checkout() {
   const { inputs, handleInputChange, handleSubmit , setInputs} = useSignUpForm();
   useEffect(() => {
      const token = Cookies.get('token')
      async function getdata() {
         const result = await Axios({ method: 'get', url: "http://127.0.0.1:8080/profile",
          headers: { 'Authorization': 'Bearer ' + token } })
         console.log(result.data.data)
         setInputs(result.data.data[0])
      }
      getdata()
   }, [])
   return (
      <main className="section">
         <div class="container">
            <div className="row">
   
               <div class="col-md-4">
                  {/* billing details */}
                  <div class="billing-details">
                     <div class="section-title">
                        <h3 class="title">Billing address</h3>
                     </div>
                     <div class="form-group">
                        <input class="input" type="text" name="first-name" placeholder="First Name" />
                     </div>
                     <div class="form-group">
                        <input class="input" type="text" name="last-name" placeholder="Last Name" />
                     </div>
                     <div class="form-group">
                        <input class="input" type="email" name="email" placeholder="Email" />
                     </div>
                     <div class="form-group">
                        <input class="input" type="text" name="address" placeholder="Address" />
                     </div>
                     <div class="form-group">
                        <input class="input" type="text" name="city" placeholder="City" />
                     </div>
                     <div class="form-group">
                        <input class="input" type="text" name="country" placeholder="Country" />
                     </div>
                     <div class="form-group">
                        <input class="input" type="text" name="zip-code" placeholder="ZIP Code" />
                     </div>
                     <div class="form-group">
                        <input class="input" type="tel" name="tel" placeholder="Telephone" />
                     </div>
                     <div class="form-group">
                        <div class="input-checkbox">
                           <input type="checkbox" id="create-account" />
                           <label for="create-account">
                              <span></span>
                              Create Account?
      									</label>
                           <div class="caption">
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                              <input class="input" type="password" name="password" placeholder="Enter Your Password" />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="order-notes">
                     <textarea class="input" placeholder="Order Notes"></textarea>
                  </div>
               </div>
   
   
               <div class="col-md-8 order-details">
                  <div class="section-title text-center">
                     <h3 class="title">Your Order</h3>
                  </div>
                  
                  <CartSummary />

                  <div class="input-checkbox">
                     <input type="checkbox" id="terms" />
                     <label for="terms">
                        <span></span>
                        I've read and accept the <a href="#">terms & conditions</a>
                     </label>
                  </div>
                  <button class="primary-btn order-submit">Place order</button>
               </div>
   
            </div>
   
         </div>
     
      </main>
  )
}
