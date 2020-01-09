import React, {useEffect, useState} from 'react'
import CartSummary from './cart'
import useSignUpForm from '../../service/customHook'
import Cookies from "js-cookie";
import Axios from "axios";


export default function Checkout() {
   const [disable, setDisable] = useState(true)
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
   }, [disable])



   const checkoutCart = async (value) => {
         const token = Cookies.get('token')
         const result = await Axios({ method: 'post', url: "http://127.0.0.1:8080/checkout",
          headers: { 'Authorization': 'Bearer ' + token },
         data: inputs })
   }

   return (
      <main className="section">
         <div class="container">
            <div className="row justify-content-sm-center">
   
               <div class="col-md-4">
                  {/* billing details */}
                  <div class="billing-details">
                     <div class="section-title">
                        <h3 class="title">Billing address</h3>
                     </div>
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
                        <input class="input" type="textarea" name="address" placeholder="Address" disabled={disable}
                           onChange={handleInputChange}
                           value={inputs&&inputs.address} />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Telephone</label>
                        <input class="input" type="tel" name="phone" placeholder="Telephone" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.phone}/>
                     </div>
                     </div>
                     <div class="form-group">
                        <div class="input-checkbox">
                           <input type="checkbox" id="create-account" 
                           onChange={e => setDisable(!e.target.checked)} />
                           <label for="create-account">
                              <span></span>
                              Different account?
      									</label>
                        </div>
                     </div>
                  </div>
   
   

               <div class="col-md-8 order-details">
                  <div class="section-title text-center">
                     <h3 class="title">Your Order</h3>
                  </div>
                  
                  <CartSummary setTotal={(total) => setInputs({...inputs, total_harga:total})} />

                  <div class="input-checkbox">
                     <input type="checkbox" id="terms" />
                     <label for="terms">
                        <span></span>
                        I've read and accept the <a href="#">terms & conditions</a>
                     </label>
                  </div>
                  <button class="primary-btn order-submit" onClick={checkoutCart}>Place order</button>
               </div>

            </div>
   
         </div>
     
      </main>
  )
}
