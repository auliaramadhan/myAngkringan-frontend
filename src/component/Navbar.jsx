import React, { Fragment, useState } from "react";
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
// import { Link } from 'react-router-bootstrap'
import Modal from "./Modal";

export default function () {

  const [show, setShow] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Fragment>
        <Navbar style={{padding:'0.25rem 1rem'}} bg="dark" variant="dark" expand="lg">
          <Navbar.Brand to="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link class="nav-link" to="#home">Home</Link>
              <Link class="nav-link" to="#link">Link</Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>

              {!isLogin?
            <Nav>
                <Form inline>
              <InputGroup className="input-group-sm">
                  <FormControl
                    type="email"
                    placeholder="username"
                    className=""
                  />
                  <FormControl
                    type="password"
                    placeholder="password"
                    class=""
                    style={{backgroundClip:'border-box'}}

                  />
                  <InputGroup.Append>
                    <Button variant="outline-light">
                      <i class="fa fa-sign-in-alt" aria-hidden="true"></i>
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
              <Link class="nav-link" to='#' onClick={handleShow} > Sign up</Link>
              </Nav>:
              <Nav> 
                <Link class="nav-link" to='#' onClick={handleShow} >
                <i class="fas fa-shopping-cart" aria-hidden="true"></i> Cart</Link>
                <Link class="nav-link" to='#' onClick={handleShow} >
                <i class="fas fa-user" aria-hidden="true"></i> Profile</Link>
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
                           <input name="" class="form-control" placeholder="Email or login" type="email" />
                        </div>
                     </div>
                     <div class="form-group">
                        <div class="input-group">
                           <div class="input-group-prepend">
                              <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                           </div>
                           <input class="form-control" placeholder="password" type="password" />
                        </div>
                     </div>
                     <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block"> Login  </button>
                     </div>
                     <p class="text-center"><a href="#" class="btn">Forgot password?</a></p>
                  </form>
               </article>
            </div> < hr />
        </Modal>
      </Fragment>
    </div>
  )
}
