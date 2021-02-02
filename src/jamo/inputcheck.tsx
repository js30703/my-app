
import { useState } from "react";
import { Button, Collapse,InputGroup, FormControl,Modal} from 'react-bootstrap'
import Alert1 from './alert'
import React,{useContext} from 'react'
import {AuthContext} from '../auth/AuthProvider'
import Axios from 'axios'


export default function Inputcheck(props:any) {
    const authContext = useContext(AuthContext)
    const [check, setCheck] = useState(false)
    const [inp, setInp] = useState('')
    const [swit, setSwit] = React.useState(false)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(!show)
  
    function checkOut(){
        if(inp === props.conju){
            setCheck(true)
        } else{
            setCheck(false)
        }
    }

    const onsub = () =>{
        
        Axios.post('https://back.hangeulpha.com/backend/jamo/myverbs12/',
            {id:props.verbs.id}
            ,{
            headers:{
                'Authorization': `token ${authContext.authState.token}`
            }
        }).then( (res:any) => {
            handleClose()

        }).catch( (error:any) => console.log(error.request))
        }

    return (
    
    <div >  
        <InputGroup >
            
            
            <InputGroup.Append>
                <Button variant="outline-secondary" 
                onClick ={() => setSwit(!swit)} 
                aria-controls="example-collapse-text"
                aria-expanded={swit}> About this verb </Button>
            </InputGroup.Append>
            <FormControl onChange ={ e => setInp(e.target.value) } placeholder={props.verbs.shape}/>
            <InputGroup.Append>
                <Alert1 right={check} fuc={checkOut} conju={props.conju} />
            </InputGroup.Append>

            {
                authContext.authState.token != null? 
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={onsub} > Add to my list </Button>
                </InputGroup.Append>
              : 
              <InputGroup.Append>
                <Button variant="outline-secondary"  disabled > Add to my list </Button>
              </InputGroup.Append>

    
            }
        </InputGroup>

        

        <Collapse in={swit}>
            <div id="example-collapse-text">
            
            {props.verbs.en_w}
            <br/>
            {props.verbs.example}
            <br/>
            <a href={`https://krdict.korean.go.kr/eng/dicSearch/SearchView?wordMatchFlag=N&currentPage=1&sort=W&searchType=W&proverbType=&exaType=&ParaWordNo=${props.verbs.target_code}
                 &nation=eng&nationCode=6&viewType=A&blockCount=10&viewTypes=on&myViewWord=58272&myViewWord=62103&myViewWord=37062&myViewWord=36281`} target="_blank" rel="noreferrer">
                     More Information</a>
            </div>
        </Collapse>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>successfully added</Modal.Body>
        
      </Modal>
                


    </div>
        
    
    )
}
