import { useState,useEffect } from "react"
import React from 'react'
import Axios from 'axios'
import { Dropdown,Container, Col, Row,Pagination } from 'react-bootstrap'
import Addcol2 from './addCol2'
import './pagi.css'


export default function Myverbs() {
  const [A, setA] = useState([{id:1, shape:"먹다", verb_type:'AV', reguler:'규칙',target_code: 59531,
  en_w:"show; reveal",
  example:"To make someone know the presence or outward appearance of an object by looking at it."}])

  const [level, setLevel] = useState('1')
  const [cur, setCur] = useState(0)
  const [page, setPage] = useState(1)
  const [pageC, setPageC] = useState(1)
  
  let items = [];
  for (let number = 1; number <= Math.ceil(pageC/4); number++) {
  items.push(
    <Pagination.Item key={number} active={number === page} onClick={()=>{setPage(number)}}>
      {number}
    </Pagination.Item>,
  );
}

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
            
        default:
            return '아/어요'
      }
}

  useEffect( () =>{
    Axios.get(`https://back.hangeulpha.com/backend/jamo/myverbs12/?page=${page}`,{
      headers:{
          'Authorization': `token ${localStorage.getItem('token')}`
      }
    }).then( res => { 
      setA(res.data.results)
      setPageC(res.data.count)
      
    })
    
  },[cur,page])

  
  return (
    <div style={{
        width:'620px',
        marginLeft: 'auto',
        marginRight:'auto',
        marginTop:'50px'

        }} className="Jamo">

      <Container>
        <Row style={{ marginBottom:'20px'} }>
          {/* conjugation select */}
        
          <Col>
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
              </Dropdown.Menu>
            </Dropdown>
            </Col>
          
        </Row>

        <Row><Addcol2 verbs={A} cur={cur}></Addcol2> </Row>
        <Row></Row>
      </Container>
      
      <Pagination bsPrefix = 'pagi'>{items}</Pagination>
      
      
    
      
    </div>
  );
}
