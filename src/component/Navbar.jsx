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
import { getCart } from '../redux/action/getData'
import { deleteCart } from "../redux/action/deletePutData";
import { postLogout } from "../redux/action/postData";

function NavHeader(props) {

  const [show, setShow] = useState(false);
  useEffect(() => {
    props.dispatch(getCart(Cookies.get('token')))
  }, [props.cart.status, props.checkout.status])

  const logout = async () => {
    props.dispatch(postLogout(Cookies.get('token')))
  }
  return (
    <div>
      <Fragment>
        <Navbar style={{ padding: '0.25rem 1rem' }} bg="dark" variant="dark" expand="md">
          <Navbar.Brand to="#home"><strong>My Angkringan</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link class="nav-link" to="/">Home</Link>
              <Link class="nav-link" to="/store">Store</Link>
            </Nav>

            <Nav>
              <NavDropdown title={<Fragment>
                <i class="fa fa-shopping-cart"></i>
                <span>Your Cart</span>
                <div class="qty">{props.cart.data && props.cart.data.length}</div>
              </Fragment>} id="basic-nav-dropdown">
                <div class="cart-dropdown">

                  <div class="cart-list">
                    {props.cart.data && props.cart.data.map(v =>
                      <div class="product-widget">
                        <div class="product-img">
                          <img src={"http://52.91.248.206:8080".concat(v.image)} alt="" />
                        </div>
                        <div class="product-body">
                          <h3 class="product-name">
                            <Link to={'/detail/' + v.id_item} >{v.name}</Link></h3>
                          <h4 class="product-price"><span class="qty">{v.qty}x</span>{v.total}</h4></div>
                        <button class="delete"
                          onClick={() => props.dispatch(deleteCart(Cookies.get('token'), v.id))}  ><i class="fa fa-trash"></i></button>
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
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart,
    checkout: state.checkout
  }
}

export default connect(mapStateToProps)(NavHeader)