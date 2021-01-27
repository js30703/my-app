import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import MyvInp from './Myv_inp'
import * as jamo from "../jamo/jamo23";


export default function Addcol2(props:any) {
    const conjuType = ( C:number , V:any ) => {
        switch( C ) {
            case 1: 
                return jamo.ATT_EOTT(V.shape, V.reguler)+'요';
                
            case 2:
                return jamo.L_LEUL(V.shape, V.reguler)+ ' 거예요'
                
            case 3:
                return jamo.GO(V.shape)+' 싶어요'
                
            case 4: 
                return jamo.A_EO(V.shape, V.reguler)+'야 해요'
               
            case 5: 
                return jamo.N_EUN(V.shape, V.reguler)+' 것'
                
            default:
                return jamo.A_EO(V.shape, V.reguler)+'요'
          }
    }

    return (
        <div>
        <Container style={{width:'620px'}} >
        
                {props.verbs.map( (verb:any) => { 
                    
                    return ( <div key ={verb.shape} > 
                    
                    <Row>
                        <Col> 
                            <MyvInp verbs={verb} conju={conjuType(props.cur, verb)}/>
                        </Col>
                    </Row>
                    <br/></div>) } )

                    
                    } 

                {props.verbs.shape==null ? "please add verbs on you list": null}
        </Container>
        
        </div>
    )
}

