import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home1 from "./pages/Front1";
import Home from "./pages/Home";
import Item from "./pages/Items";
import Checkout from "./pages/Checkout";
import ListItem from "./pages/ListItem";
import DetailItem from "./pages/DetailItem";
import ContactUs from "./pages/ContactUs";
import Navbar from "./component/Navbar"; 
import Footer from "./component/Footer"; 


class App extends Component {
  render() {
    return (
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' render={()=> <Home/>} exact>
          </Route>
          <Route path='/homee' component={Home1} exact />
          <Route path='/item' component={Item} exact />
          <Route path='/detail' component={DetailItem} exact />
          <Route path='/contact' component={ContactUs} exact/>
          <Route path='/checkout' component={Checkout} exact/>
          <Route path='/store' component={ListItem} exact/>
        </Switch>
        <Footer/>
      </Router>
    )
  }
}

export default App;

