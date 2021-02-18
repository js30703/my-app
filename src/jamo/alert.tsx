import React from 'react'
import { useState } from "react";
import { Modal, Button } from 'react-bootstrap'

export default function Alert1(props:any) {
    const [smShow, setSmShow] = useState(false);
    const [A, setA] = useState(false)

    function showModal() {
        props.fuc() 
        setSmShow(true)
    }
    return (
     <div>
    
        <Button variant="outline-secondary" onClick={() => {showModal()} }block>confrim</Button>
        
        <Modal
          centered
          show={smShow}
          onHide={() => setSmShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title >
              {props.right? 'Right' : 'Wrong'}
            </Modal.Title>
            
          
          </Modal.Header>  
          <Modal.Body>

          {A? 
            <Button variant="outline-secondary" onClick={ () =>{setA(false)}}> {props.conju} </Button> 
            : <Button variant="outline-secondary" onClick={ () =>{setA(true)}}> Answer </Button>}
          </Modal.Body>
        </Modal>
    </div>
    );
  }

