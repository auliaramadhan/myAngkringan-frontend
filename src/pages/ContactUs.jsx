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
         <Form>
         <Form.Group>
           <Form.Label for="exampleEmail">Email</Form.Label>
           <Form.Control type="email" name="email" id="exampleEmail" placeholder="email" onChange={this.handleChange} />
         </Form.Group>
         <Form.Group>
           <Form.Label for="exampleNama">Nama</Form.Label>
           <Form.Control type="text" name="nama" id="exampleNama" placeholder="Nama"  onChange={this.handleChange}/>
         </Form.Group>
         <Form.Group>
           <Form.Label for="examplemessage">Nama</Form.Label>
           <Form.Control type="textarea" name="message" id="examplemessage" placeholder="message"  onChange={this.handleChange}/>
         </Form.Group>
         <Button onClick={this.handleSubmit}>Submit</Button>
       <div>
          {this.state.nama}
          {this.state.message}
          {this.state.email}
       </div>
       </Form>
      )
   }
}
