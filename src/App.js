import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./pages/home";
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
          <Route path='/about' component={Home} exact>
          {/* <Home/> ddd */}
          dfdsf
          </Route>
          <Route path='/contact' component={ContactUs} exact/>
        </Switch>
        <Footer/>
      </Router>
    )
  }
}

export default App;

