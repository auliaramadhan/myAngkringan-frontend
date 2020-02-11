import React, { Component, useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import home from "./pages/home";
import Item from "./pages/Items";
import Checkout from "./pages/Checkout/Checkout";
import ListItem from "./pages/ListItem/ListItem";
import Profile from "./pages/Profile";
import DetailItem from "./pages/DetailItem/DetailItem";
import ContactUs from "./pages/ContactUs";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Restaurants from './pages/Restaurants';
import Purchased from './pages/Purchased';

import Cookies from "js-cookie";
import jwtdecode from 'jwt-decode'
import Main from './pages/Main';
import { connect } from 'react-redux';

function App(props) {
  const [role, setRole] = useState('')

  const isAllowed = (user, rights) =>
    rights.includes(user);

  useEffect(() => {
    if (Cookies.get('token')) {
      setRole(jwtdecode(Cookies.get('token')).roles)
    } else setRole('')
    console.log(props)
  }, [props.auth.token])
  return (
    <Router>
      {isAllowed(role, ['customer']) && <Navbar />}
      {isAllowed(role, ['customer']) ?
        <Switch>

          <Route path='/' component={home} exact />
          <Route path='/item' component={Item} exact />
          <Route path='/detail/:id' component={DetailItem} exact />
          <Route path='/contact' component={ContactUs} exact />          <Route path='/checkout' component={Checkout} exact />
          <Route path='/store' component={ListItem} exact />
          <Route path='/restaurant/:id' component={Restaurants} exact />
          <Route path='/profile' component={Profile} exact />
          <Route path='/history' component={Purchased} exact />
          <Route path="*" component={NotFound} />
        </Switch> :
        <Switch>
          <Route path='/' component={Main} exact />
          <Route path={["/item", "/detail/:id", "/contact", '/store', '/restaurant/:id', '/profile', '/history']} component={NotAllowed} />
        </Switch>
      }
      <Footer />
    </Router>
  )
}

const NotFound = () => {
  return (
    <div class="container-fluid  min-100">
      <div className="section" >
        <div class="row justify-content-sm-center">
          <div class="col-md-6">
            <div class="error-template">
              <h1>
                Oops!</h1>
              <h2>
                404 Not Found</h2>
              <div class="error-details">
                Sorry, an error has occured, Requested page not found!
                  </div>
              <div class="error-actions">
                <Link to="/" class="btn btn-danger btn-lg"><span class="glyphicon glyphicon-home"></span>
                  Take Me Home </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const NotAllowed = () => {
  return (
    <div class="container-fluid min-100">
      <div className="section">
        <div class="row justify-content-sm-center">
          <div class="col-md-6">
            <div class="error-template">
              <h1>
                Oops!</h1>
              <h2>
                You Don't have access to this site </h2>
              <div class="error-details">
                Sorry, this page is limited please login first!
                  </div>
              <div class="error-actions">
                <Link to="/" class="btn btn-danger btn-lg"><span class="glyphicon glyphicon-home"></span>
                  Take Me Home </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(App)