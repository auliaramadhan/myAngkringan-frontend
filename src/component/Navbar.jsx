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
import Modal from "./Modal";
import { connect } from 'react-redux'
import useSignUpForm from "../service/customHook";
import {getCart} from '../redux/action/getData'
import { deleteCart } from "../redux/action/deleteData";

function NavHeader(props) {

  const [show, setShow] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  useEffect(() => {
    setisLogin(Cookies.get('token') ? true : false)
    console.log(isLogin)
  }, [])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    props.dispatch(getCart(Cookies.get('token')))
  }, [props.cart.status, props.checkout.status])

  const logout = async () => {
    const res = await Axios({
      method: 'post',
      url: "http://127.0.0.1:8080/user/logout",
      headers: { 'Authorization': 'Bearer ' + Cookies.get('token') }
    })
    console.log(res)
    if (res.data.success) {
      Cookies.remove('token'); setisLogin(false)
    }
  }
  const login = async (e) => {
    e.preventDefault()
    const result = await Axios.post("http://127.0.0.1:8080/user/login", dataLogin)
    const data = result.data
    console.log(data)
    if (data.success) {
      Cookies.set('token', data.auth, { expires: 1 });
      setisLogin(true)
    } else window.alert(data.msg);
  };

  const [dataLogin, setDataLogin] = useState({})
  const postDataProfile = async () => {
    console.log(signUp.inputs)
    if (signUp.inputs.password === signUp.inputs.repassword) {
      try {
        const result = await Axios.post("http://127.0.0.1:8080/user/registrasi", signUp.inputs)
        const data = result.data
        console.log(data)
        // if (data.success) window.alert('Silahkan login')
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
      <Fragment>
        <Navbar style={{ padding: '0.25rem 1rem' }} bg="dark" variant="dark" expand="lg">
          <Navbar.Brand to="#home"><strong>My Angkringan</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link class="nav-link" to="/">Home</Link>
              <Link class="nav-link" to="/store">Store</Link>
            </Nav>

            {!isLogin ?
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
                <Link class="nav-link" to='#' onClick={handleShow} > Sign up</Link>
              </Nav> :
              <Nav>
                  <NavDropdown title={<Fragment>
                <i class="fa fa-shopping-cart"></i>
                <span>Your Cart</span>
                <div class="qty">{props.cart.data && props.cart.data.length}</div>
              </Fragment>} id="basic-nav-dropdown">
                <div class="cart-dropdown">
                {props.cart.isLoading && <div class="lds-ring"><div></div></div> }
                  <div class="cart-list">
                    {props.cart.data && props.cart.data.map(v =>
                    <div class="product-widget">
                      <div class="product-img">
													<img src={"http://localhost:8080".concat(v.image)} alt="" />
												</div>
                      <div class="product-body">
                        <h3 class="product-name">
                          <Link to={'/detail/' + v.id_item} >{v.name}</Link></h3>
                    <h4 class="product-price"><span class="qty">{v.qty}x</span>{v.total}</h4></div>
                      <button class="delete"
                      onClick={() => props.dispatch(deleteCart(Cookies.get('token'),v.id))}  ><i class="fa fa-trash"></i></button>
                    </div>
                    )}
                  </div>
                  <div class="cart-summary"><small>
                  {props.cart.data && props.cart.data.length} Item(s) selected</small>
                    <h5>SUBTOTAL: {_.sumBy(props.cart.data || [], v => v.total) || 0} </h5></div>
                  <div class="cart-btns">
                    <Link to="/history">History</Link>
                    <Link to="/checkout">Checkout  <i class="fa fa-arrow-circle-right"></i></Link></div>
                </div>
              </NavDropdown>
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
        </Modal>
        <Toast show={showToast} onClose={toggleShowToast}>
        <Toast.Header>
            <strong className="mr-auto">Notif</strong>
          </Toast.Header>
          <Toast.Body>You can Login Now</Toast.Body>
        </Toast>
      </Fragment>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    checkout: state.checkout
  }
}

export default connect(mapStateToProps)(NavHeader)