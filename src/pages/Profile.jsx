import React, { useState, useEffect } from 'react'
import useSignUpForm from '../service/customHook'
import Cookies from "js-cookie";
import Axios from "axios";
import { connect } from 'react-redux'
import { getProfile } from '../redux/action/getData'
import {  postProfile } from '../redux/action/postData'



function Profile(props) {
   const [disable, setDisable] = useState(true)
   const toggleDisable = () => setDisable(!disable)
   const postDataProfile = () =>{
      const token = Cookies.get('token')
      props.dispatch(postProfile(token, inputs))
      setDisable(true)
   }
   const { inputs, handleInputChange, handleSubmit , setInputs} = useSignUpForm(postDataProfile);
   useEffect(() => { //jadi tanda tanya
      setInputs(props.profile.data)
   }, [setInputs, props.profile.data, disable])

   useEffect(() => {
      const token = Cookies.get('token')
      props.dispatch(getProfile(token))
      // async function getdata() {
      //    const result = await Axios({ method: 'get', url: "http://52.91.248.206:8080/profile",
      //     headers: { 'Authorization': 'Bearer ' + token } })
      //    console.log(result.data.data)
      //    setInputs(result.data.data[0])
      // }
      // getdata()
   }, [disable])

   console.log(inputs.date_of_birth&&inputs.date_of_birth.split('T')[0])
  
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
                        value={inputs&&inputs.first_name}  required />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Last Name</label>
                        <input class="input" type="text" name="last_name" placeholder="Last Name" disabled={disable}
                           onChange={handleInputChange}
                           value={inputs&&inputs.last_name} required />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Address</label>
                        <input class="input" type="text" name="address" placeholder="Address" disabled={disable}
                           onChange={handleInputChange}
                           value={inputs&&inputs.address} required />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Date Of Birth</label>
                        <input class="input" type="date" name="date_of_birth" placeholder="date_of_birth" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs.date_of_birth&&inputs.date_of_birth.split('T')[0]}required />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">City</label>
                        <input class="input" type="text" name="city_of_birth" placeholder="City" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.city_of_birth} required />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Country</label>
                        <input class="input" type="text" name="country" placeholder="Country"  disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.country} required />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">ZIP Code</label>
                        <input class="input" type="text" name="zip_code" placeholder="ZIP Code" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.zip_code} required />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Telephone</label>
                        <input class="input" type="tel" name="phone" placeholder="Telephone" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.phone} required />
                     </div>
                     <button class="primary-btn order-submit update-cart" onClick={handleSubmit}
                     style={{margin:'0 auto'}} disabled={disable}>Save</button>
                  </form>
               </div>
            </div>
         </div>
      </div>

   )
}
const mapStateToProps = state => {
	return {
      profile: state.profile,
	}
}

export default connect(mapStateToProps)(Profile)