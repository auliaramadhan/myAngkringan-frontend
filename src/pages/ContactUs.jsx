import React, { Component } from 'react'
import { Form, Button, Label } from 'react-bootstrap'

export default class ContactUs extends Component {
   constructor(props) {
      super(props)
   
      this.state = {
          nama: null,
          email: null,
          message:null
      }
   }

   handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
   }
   handleSubmit  = (event) =>{
      alert('A name was submitted: ' + this.state);
      event.preventDefault();
      console.log(this.state)
      event.preventDefault();
    }
  
   render(){
      return (
         <section id="mu-about-us">
         <div class="container">
           <div class="row">
             <div class="col-md-12">
               <div class="mu-about-us-area">
     
                 <div class="mu-title">
                   <span class="mu-subtitle">Discover</span>
                   <h2>ABOUT US</h2>
                 </div>
     
                 <div class="row">
                   <div class="col-md-6">
                    <div class="mu-about-us-left">     
                     <img src="assets/img/about-us.png" alt="img" />           
                     </div>
                   </div>
                   <div class="col-md-6">
                      <div class="mu-about-us-right">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam minus aliquid, itaque illum assumenda repellendus dolorem, dolore numquam totam saepe, porro delectus, libero enim odio quo. Explicabo ex sapiente sit eligendi, facere voluptatum! Quia vero rerum sunt porro architecto corrupti eaque corporis eum, enim soluta, perferendis dignissimos, repellendus, beatae laboriosam.</p>                              
                       <ul>
                         <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                         <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                         <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia.</li>                    
                         <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                         <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                         <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia.</li>
                       </ul>
                       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque similique molestias est quod reprehenderit, quibusdam nam qui, quam magnam.</p>  
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
      )
   }
}


// <Form>
// <Form.Group>
//   <Form.Label for="exampleEmail">Email</Form.Label>
//   <Form.Control type="email" name="email" id="exampleEmail" placeholder="email" onChange={this.handleChange} />
// </Form.Group>
// <Form.Group>
//   <Form.Label for="exampleNama">Nama</Form.Label>
//   <Form.Control type="text" name="nama" id="exampleNama" placeholder="Nama"  onChange={this.handleChange}/>
// </Form.Group>
// <Form.Group>
//   <Form.Label for="examplemessage">Nama</Form.Label>
//   <Form.Control type="textarea" name="message" id="examplemessage" placeholder="message"  onChange={this.handleChange}/>
// </Form.Group>
// <Button onClick={this.handleSubmit}>Submit</Button>
// <div>
//  {this.state.nama}
//  {this.state.message}
//  {this.state.email}
// </div>
// </Form>