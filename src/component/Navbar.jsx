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
  NavItem
} from "react-bootstrap";
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
import Axios from "axios";
import Modal from "./Modal";

export default function () {

  const [show, setShow] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  useEffect(() => {
    setisLogin(Cookies.get('token')?true:false)
    console.log(isLogin)
  }, [])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {Cookies.remove('token');setisLogin(false) }
  const login = async () => {
    const result = await Axios.post("http://127.0.0.1:8080/user/login", dataLogin)
    const data = result.data
    console.log(data)
    if (data.success) {
      Cookies.set('token', data.auth, {expires:1/24});
      setisLogin(true)
    }else window.alert(data.msg);
  };

  const [dataLogin, setDataLogin] = useState({})
  return (
    <div>
      <Fragment>
        <Navbar style={{ padding: '0.25rem 1rem' }} bg="dark" variant="dark" expand="lg">
          <Navbar.Brand to="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link class="nav-link" to="/home">Home</Link>
              <Link class="nav-link" to="/store">Store</Link>
            </Nav>

            {!isLogin ?
              <Nav>
                <Form inline>
                  <InputGroup className="input-group-sm">
                    <FormControl
                      type="text"
                      placeholder="username"
                      className=""
                      onChange={(e)=> setDataLogin({...dataLogin,username:e.target.value})}
                      value={dataLogin.username}
                      
                    />
                    <FormControl
                      type="password"
                      placeholder="password"
                      class=""
                      style={{ backgroundClip: 'border-box' }}
                      onChange={(e)=> setDataLogin({...dataLogin,password:e.target.value})}
                      value={dataLogin.password}

                    />
                    <InputGroup.Append>
                      <Button variant="outline-light" onClick={login}>
                        <i class="fa fa-sign-in-alt" aria-hidden="true"></i>
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
                <Link class="nav-link" to='#' onClick={handleShow} > Sign up</Link>
              </Nav> :
              <Nav>
                <Link class="nav-link" to='/checkout' >
                  <i class="fas fa-shopping-cart" aria-hidden="true"></i> Cart</Link>
                <Link class="nav-link" to='/profile'>
                  <i class="fas fa-user" aria-hidden="true"></i> Profile</Link>
                <Button onClick={logout}> Logout</Button>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>

        <Modal show={show} hide={handleClose} >
          <div class="card">
            <article class="card-body">
              <h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
              <hr />
              <p class="text-success text-center">Some message goes here</p>
              <form>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                    </div>
                    <input name="username" class="form-control" placeholder="username" type="text" />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                    </div>
                    <input name="email" class="form-control" placeholder="Email" type="email" />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"> <i class="fa fa-lock"></i> password</span>
                    </div>
                    <input class="form-control" placeholder="password" type="password" />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text"> <i class="fa fa-lock"></i> password again</span>
                    </div>
                    <input class="form-control" placeholder="repassword" type="repassword" />
                  </div>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-block"> Register  </button>
                </div>
                <p class="text-center"><a href="#" class="btn">Forgot password?</a></p>
              </form>
            </article>
          </div>
        </Modal>
      </Fragment>
    </div>
  )
}
