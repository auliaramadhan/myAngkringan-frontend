import React, {useEffect, useState} from 'react'
import CartSummary from './cart'
import useSignUpForm from '../../service/customHook'
import Cookies from "js-cookie";
// import Axios from "axios";
import _ from 'lodash'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/action/getData'
import { postCheckout } from '../../redux/action/postData'


function Checkout(props) {
   const [disable, setDisable] = useState(true)
   const { inputs, handleInputChange, handleSubmit , setInputs} = useSignUpForm();
   useEffect(() => {
      const token = Cookies.get('token')
      props.dispatch(getProfile(token))
   }, [])
   useEffect(() => {
      setInputs(props.profile.data)
   }, [setInputs, props.profile.data, disable])


   const checkoutCart = async () => {
      // e.preventDefault()
      inputs.total_harga = _.sumBy(props.cart.data, (v) => v.total)
      console.log(inputs.total_harga)
      if (!inputs.total_harga) {
         return alert('please fill you cart first')
      }
      const token = Cookies.get('token')
      await props.dispatch(postCheckout(token, inputs))
         props.history.push('/store')
      if (props.checkout.status.success) {
         props.history.push('/store')
      } 

   }
   // async (value) => {
   //       const token = Cookies.get('token')
   //       const result = await Axios({ method: 'post', url: "http://127.0.0.1:8080/checkout",
   //        headers: { 'Authorization': 'Bearer ' + token },
   //       data: inputs })
   //       if (result.data.success) {
   //          props.history.push('/store')
   //       } 
   // }

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
                        value={inputs&&inputs.first_name} required/>
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Last Name</label>
                        <input class="input" type="text" name="last_name" placeholder="Last Name" disabled={disable}
                           onChange={handleInputChange}
                           value={inputs&&inputs.last_name} required/>
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Address</label>
                        <input class="input" type="textarea" name="address" placeholder="Address" disabled={disable}
                           onChange={handleInputChange}
                           value={inputs&&inputs.address} required/>
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Telephone</label>
                        <input class="input" type="tel" name="phone" placeholder="Telephone" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.phone} required/>
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
                  
                  <CartSummary checkoutCart={checkoutCart}/>
                  
                  {/* <button class="primary-btn order-submit" onClick={checkoutCart}>Place order</button> */}
            </div>
         </div>
      </main>
  )
}
const mapStateToProps = state => {
	return {
      profile: state.profile,
      checkout: state.checkout,
      cart: state.cart
	}
}

export default connect(mapStateToProps)(Checkout)