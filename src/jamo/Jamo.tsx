import { useState,useEffect } from "react"
import React from 'react'
import axios from 'axios'
import { Button,Dropdown,Container, Row } from 'react-bootstrap'
import Addcol2 from './addCol2'
import Home from '../Home/Home'



export default function Jamo() {
  const [A, setA] = useState([{id:1, shape:"먹다", verb_type:'AV', reguler:'규칙',target_code: 59531,
  en_w:"show; reveal",
  example:"To make someone know the presence or outward appearance of an object by looking at it."}])

  const [B, setB] = useState(0)
  const [level, setLevel] = useState('1')
  const [cur, setCur] = useState(0)

  const toggleShow = ( C:number ) => {
    switch( C ) {
        case 1: 
            return '았/었요';
            
        case 2:
            return 'ㄹ/을 거예요'
            
        case 3:
            return '고 싶어요'
            
        case 4: 
            return '아/어야 해요'

        case 5: 
            return 'ㄴ/은 것'

        case 6: 
        return '지 않아요'
            
        default:
            return '아/어요'
      }
}

  useEffect( () =>{
    axios.get(`https://www.hangeulpha.com/backend/jamo/verbs/${level}/`).then( res => { 
      setA(res.data)
    })
    
  },[B, level])

  return (
    <div style={{
        width:'370px',
        marginLeft: 'auto',
        marginRight:'auto',
        marginTop:'10px'

        }} className="Jamo">

        <Home></Home>

      <Container fluid>
         {/* verb level */}
          <Row style={{marginTop:'15px', marginBottom:"15px", width:'300px'}}>
              <Dropdown >
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Verb Level  :{level}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick = { () => setLevel('1')}>level: 1</Dropdown.Item>
                    <Dropdown.Item onClick = { () => setLevel('2')}>level: 2</Dropdown.Item>
                    <Dropdown.Item onClick = { () => setLevel('3')}>level: 3</Dropdown.Item>
                    
                </Dropdown.Menu>
              </Dropdown>
        </Row>

        <Row style={{ marginBottom:"15px", width:'300px'}}>
          {/* conjugation select */}
              <Dropdown >
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              CONJUGATIONS  :         {
                      toggleShow(cur)
                  }
              </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item onClick = { () => setCur(0)}>아/어요</Dropdown.Item>
                  <Dropdown.Item onClick = { () => setCur(1)}>았/었어요</Dropdown.Item>
                  <Dropdown.Item onClick = { () => setCur(2)}>ㄹ/을 거예요</Dropdown.Item>
                  <Dropdown.Item onClick = { () => setCur(3)}>고 싶어요</Dropdown.Item>
                  <Dropdown.Item onClick = { () => setCur(4)}>아/어야 해요</Dropdown.Item>
                  <Dropdown.Item onClick = { () => setCur(5)}>ㄴ/은 것</Dropdown.Item>
                  <Dropdown.Item onClick = { () => setCur(6)}>지 않아요</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>

        <Row style={{marginBottom:'20px'}}>
            <Button variant="outline-secondary" onClick ={() => setB(B+1)} block >Get new verbs </Button>
        </Row>
        </Container>        
          <Addcol2 verbs={A} cur={cur}></Addcol2>     
    </div>
  );
}


