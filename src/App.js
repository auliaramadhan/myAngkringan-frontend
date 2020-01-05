import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {All, Guest} from './service/auth';
import Home1 from "./pages/Front1";
import Home from "./pages/Home";
import Item from "./pages/Items";
import Checkout from "./pages/Checkout/Checkout";
import ListItem from "./pages/ListItem/ListItem";
import Profile from "./pages/Profile";
import DetailItem from "./pages/DetailItem/DetailItem";
import ContactUs from "./pages/ContactUs";
import Navbar from "./component/Navbar"; 
import Footer from "./component/Footer"; 
import Restaurants from './pages/Restaurants';



class App extends Component {
  render() {
    return (
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/homee' component={Home1} exact />
          <Route path='/item' component={Item} exact />
          <Route path='/detail/:id' component={DetailItem} exact />
          <Route path='/contact' component={ContactUs} exact/>
          {/* <Route path='/checkout'exact>
            <Checkout />
          </Route> */}
          <Route path='/checkout' component={Checkout} exact/>
          <Route path='/store' component={ListItem} exact/>
          <Route path='/restaurant/:id' component={Restaurants} exact/>
          <Route path='/profile' component={Profile} exact/>
        </Switch>
        <Footer/>
      </Router>
    )
  }
}

export default App;

