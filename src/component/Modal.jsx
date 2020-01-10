import React from 'react'
import { Modal, Button } from "react-bootstrap";


export default function(props) {
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