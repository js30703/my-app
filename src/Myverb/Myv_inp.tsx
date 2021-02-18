
import { useState } from "react";
import { Button, Collapse,InputGroup, FormControl,Modal} from 'react-bootstrap'
import Alert1 from '../jamo/alert'
import React,{useContext} from 'react'
import {AuthContext} from '../auth/AuthProvider'
import Axios from 'axios'



export default function MyvInp(props:any) {

    const authContext = useContext(AuthContext)
    const [mass, setMass] = useState('')
    const [check, setCheck] = useState(false)
    const [inp, setInp] = useState('')
    const [swit, setSwit] = React.useState(false)
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(!show)
        window.location.reload()
    }
  
    function checkOut(){
        if(inp === props.conju){
            setCheck(true)
        } else{
            setCheck(false)
        }
    }

    const onsub = () =>{

        Axios.delete('https://back.hangeulpha.com/backend/jamo/myverbs12/',
            {data:{id:props.verbs.id}
            ,
            headers:{
                'Authorization': `token ${authContext.authState.token}`
            }
        }).then( (res:any) => {
            setMass(res.data)
            setShow(true)
    
        }).catch( (error:any) => console.log(error.request))
        }




    return (
    
    <div style={{margin:'0px'}}>  
        <InputGroup >
            {
                authContext.authState.token != null? 
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={onsub} > delete </Button>
                </InputGroup.Append>
              : null

    
            }
            <InputGroup.Append>
                <Button variant="outline-secondary" 
                onClick ={() => setSwit(!swit)} 
                aria-controls="example-collapse-text"
                aria-expanded={swit}> ? </Button>
            </InputGroup.Append>
            <FormControl onChange ={ e => setInp(e.target.value) }placeholder={props.verbs.shape}/>
            <InputGroup.Append>
                <Alert1 right={check} fuc={checkOut} conju={props.conju} />
            </InputGroup.Append>
        </InputGroup>

        <Collapse in={swit}>
            <div id="example-collapse-text">
            
            {props.verbs.en_w}
            <br/>
            {props.verbs.example}
     
            <a href={`https://krdict.korean.go.kr/eng/dicSearch/SearchView?wordMatchFlag=N&currentPage=1&sort=W&searchType=W&proverbType=&exaType=&ParaWordNo=${props.verbs.target_code}
                 &nation=eng&nationCode=6&viewType=A&blockCount=10&viewTypes=on&myViewWord=58272&myViewWord=62103&myViewWord=37062&myViewWord=36281`} target="_blank" rel="noreferrer">more</a>
            </div>
        </Collapse>

        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mass}</Modal.Body>
        
      </Modal>
                


    </div>
        
    
    )
}
