import React from 'react'
import { Modal, Button } from "react-bootstrap";


export default function(props) {
   console.log(props)
   return (
      <Modal show={props.show} onHide={props.hide}>
         <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {props.children}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={props.hide}>
               Close
          </Button>
            <Button variant="primary" onClick={props.hide}>
               Save Changes
          </Button>
         </Modal.Footer>
      </Modal>

   )
}

/* <form class="form-signin">
  <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
  <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
  <label for="inputEmail" class="sr-only">Email address</label>
  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
  <label for="inputPassword" class="sr-only">Password</label>
  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
  <div class="checkbox mb-3">
    <label>
      <input type="checkbox" value="remember-me"/> Remember me
    </label>
  </div>
  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
  <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
</form> */