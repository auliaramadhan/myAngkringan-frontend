import React, { Fragment, useState, useEffect } from "react";
import {
   Navbar,
   Nav,
   NavDropdown,
   Form,
   FormControl,
   Button,
   Container,
   InputGroup,
   NavItem,
   Toast
} from "react-bootstrap";
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import Axios from "axios";
import _ from 'lodash'
import { connect } from 'react-redux'
import useSignUpForm from "../service/customHook";
import { getAuth } from "../redux/action/getData";
import { Alert } from "react-bootstrap";

function Main(props) {

   const login = async (e) => {
      e.preventDefault()
      const result = await Axios.post("http://52.91.248.206:8080/user/login", dataLogin)
      const data = result.data
      console.log(data)
      if (data.success) {
         await Cookies.set('token', data.auth, { expires: 1 });
         props.dispatch(getAuth(signUp.inputs))
      } else window.alert(data.msg);
   };
   const forgotPass = async (e) => {
      if (!dataLogin.username) {
         alert('please add username firste')
         return;
      }
      e.preventDefault()
      const result = await Axios.post("http://52.91.248.206:8080/user/forgot_password", dataLogin)
      const data = result.data
      console.log(data)
      window.alert(data.msg)
   };

   const [dataLogin, setDataLogin] = useState({})
   const postDataProfile = async () => {
      if (signUp.inputs.password === signUp.inputs.repassword) {
         try {
            const result = await Axios.post("http://52.91.248.206:8080/user/registrasi", signUp.inputs)
            const data = result.data
            console.log(data)
            if (data.success) setShowToast(!showToast)
            else window.alert(data.msg);
         } catch (error) {
            window.alert(error)
         }
      } else { window.alert('password harus sama') }
   }
   const signUp = useSignUpForm(postDataProfile);

   //toast
   const [showToast, setShowToast] = useState(false);
   const toggleShowToast = () => setShowToast(!showToast);

   return (
      <div>
         {props.auth.isLoading &&  <div class="lds-ring"><div></div><div></div><div></div></div> }
         <Navbar style={{ padding: '0.25rem 1rem' }} bg="dark" variant="dark" expand="sm">
            <Navbar.Brand to="#home"><strong>My Angkringan</strong></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="mr-auto">
               </Nav>
               <Nav>
                  <Form inline>
                     <InputGroup className="input-group-sm">
                        <FormControl
                           type="text"
                           placeholder="username"
                           required
                           onChange={(e) => setDataLogin({ ...dataLogin, username: e.target.value })}
                           value={dataLogin.username} />
                        <FormControl
                           type="password"
                           placeholder="password"
                           required
                           style={{ backgroundClip: 'border-box' }}
                           onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}
                           value={dataLogin.password} />
                        <InputGroup.Append>
                           <Button variant="outline-light" onClick={login} type="submit">
                              <i class="fa fa-sign-in-alt" aria-hidden="true"></i>
                           </Button>
                        </InputGroup.Append>
                     </InputGroup>
                  </Form>
                  <Link class="nav-link" to='#' onClick={forgotPass} > forgot pass</Link>
               </Nav>
            </Navbar.Collapse>
         </Navbar>

         <Container >
            <div className="section">
               <div class="row justify-content-sm-center">
                  <div class="col-sm-10 col-sm-push-1">
                     <div class="card">
                        <article class="card-body">
                           <h4 class="card-title text-center mb-4 mt-1">Register</h4>
                           <hr />
                           {/* <p class="text-success text-center">Some message goes here</p> */}
                           <form>
                              <div class="form-group">
                                 <div class="input-group">
                                    <div class="input-group-prepend">
                                       <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                    </div>
                                    <input name="username" class="form-control" placeholder="username" type="text" name="username"
                                       onChange={signUp.handleInputChange}
                                       value={signUp.inputs.username} required />
                                 </div>
                              </div>
                              <div class="form-group">
                                 <div class="input-group">
                                    <div class="input-group-prepend">
                                       <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                                    </div>
                                    <input name="email" class="form-control" placeholder="Email" type="email" name="email"
                                       onChange={signUp.handleInputChange}
                                       value={signUp.inputs.email} required />
                                 </div>
                              </div>
                              <div class="form-group">
                                 <div class="input-group">
                                    <div class="input-group-prepend">
                                       <span class="input-group-text"> <i class="fa fa-lock"></i></span>
                                    </div>
                                    <input class="form-control" placeholder="password" type="password" name="password"
                                       onChange={signUp.handleInputChange}
                                       value={signUp.inputs.password} required />
                                 </div>
                              </div>
                              <div class="form-group">
                                 <div class="input-group">
                                    <div class="input-group-prepend">
                                       <span class="input-group-text"> <i class="fa fa-lock"></i></span>
                                    </div>
                                    <input class="form-control" placeholder="repassword" type="password" name="repassword"
                                       onChange={signUp.handleInputChange}
                                       value={signUp.inputs.repassword} required />
                                 </div>
                              </div>
                              <div class="form-group">
                                 <button type="submit" class="btn btn-primary btn-block"
                                    onClick={signUp.handleSubmit}> Register  </button>
                              </div>
                           </form>
                        </article>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
         <Toast show={showToast} onClose={toggleShowToast}>
            <Toast.Header>
               <strong className="mr-auto">Notif</strong>
            </Toast.Header>
            <Toast.Body>You can Login Now</Toast.Body>
         </Toast>
      </div>
   )
}

const mapStateToProps = state => {
   return {
      auth: state.auth,
   }
}

export default connect(mapStateToProps)(Main)
