/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, Fragment } from 'react'
import useSignUpForm from '../service/customHook'
import Cookies from "js-cookie";
import Axios from "axios";
import { connect } from 'react-redux'
import { getProfile } from '../redux/action/getData'
import {  postProfile, postLogout } from '../redux/action/postData'
import JwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';


function Profile(props) {
   const [disable, setDisable] = useState(true)
   const toggleDisable = () => setDisable(!disable)
   const postDataProfile =async () =>{
      const token = Cookies.get('token')
      setDisable(true)
      await props.dispatch(postProfile(token, inputs))
      props.dispatch(getProfile(token))
   }
   const { inputs, handleInputChange, handleSubmit , setInputs} = useSignUpForm(postDataProfile);
   useEffect(() => { 
      setInputs(props.profile.data)
   }, [setInputs, props.profile.data, disable])

   useEffect(() => {
      const token = Cookies.get('token')
      props.dispatch(getProfile(token))
   }, [])

   async function postChangePassword(event) {
      event.preventDefault();
      if (inputs.password !== inputs.confirmPassword) {
         alert('pasword tidak sesuai')
         return;
      }
      const token = Cookies.get('token')
      const username = JwtDecode(token).username
      const res = await Axios({
         method:'put',
         url: `http://52.91.248.206:8080/user/changeuser/${username}`,
         data: inputs ,
         headers: { 'Authorization': 'Bearer ' + token }
      })
      setDisable(true)
      if (res.data.success) {
         alert('sukses')
         await props.dispatch(postLogout(token))
         return (<Redirect to='/' /> )
         // if (props.auth.status.success) {
         // } 
      } else alert(res.data.msg)
   }

   const onChangeImage = e => {
      if (!e) {
         return;
      }
      const files = Array.from(e.target.files)[0]
      if (files.type !== 'image/jpeg' && files.type !== 'image/png') {
         alert('must be png or jpeg')
         return;
      }
      const formData = new FormData()
      formData.append('image', files,files.name)
      console.log(files)
      console.log(files.type)
      setDisable(v => !v)
  
      const token = Cookies.get('token')
      fetch(`http://52.91.248.206:8080/profile/changeavatar`, {
        method: 'PATCH',
        body: formData,
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then(res => res.json())
      .then(images => {
         props.dispatch(getProfile(token))
      }).catch(err => console.log(err))
    }
  
  
   return (
      <div className="conatiner">
         <div className="row justify-content-sm-center">
            <div class="col-md-8 col-md-push-2">
               { props.profile.data && inputs && <div class="billing-details">
                  <div class="section-title">
                     <h3 class="title">User Profile</h3>
                  </div>
                  <img src={"http://52.91.248.206:8080" + props.profile.data.avatar} class="rounded mx-auto d-block thumbnail" alt="image"
                  onError={(e) => (e.target.src !== "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png")
                  ? e.target.src = "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" : null } />
                  {!disable && <input type='file' id='single' onChange={onChangeImage} disabled={disable}  />}

                  <form action="#" class='form-profile mt-5'>
                  <button class="primary-btn order-submit " onClick={toggleDisable}>Edit</button>
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

                     {!disable &&  <Fragment>
                     <h3>Change Password</h3>
                     <div class="form-group">
                        <label htmlFor="">New Password</label>
                        <input class="input" type="password" name="password" placeholder="Password" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.password} required />
                     </div>
                     <div class="form-group">
                        <label htmlFor="">Confirm Password</label>
                        <input class="input" type="password" name="confirmPassword" placeholder="Confirm Password" disabled={disable}
                        onChange={handleInputChange}
                        value={inputs&&inputs.confirmPassword} required />
                     </div>
                     <button class="primary-btn order-submit update-cart" onClick={postChangePassword}
                     style={{margin:'0 auto'}} disabled={disable}>Change Password</button>
                     </Fragment>
                     }
                  </form>
               </div>
            }
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