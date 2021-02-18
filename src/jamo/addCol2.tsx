import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Inputcheck from './inputcheck'
import * as jamo from "./jamo23";


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

            case 6: 
                return jamo.JI(V.shape)+' 않아요'
                
            default:
                return jamo.A_EO(V.shape, V.reguler)+'요'
          }
    }

    return (
        <div>
        <Container fluid>
        {/* // style={{width:'680px'}} > */}
        
                {props.verbs.map( (verb:any) => { 
                    
                    return ( <div key ={verb.shape} > 
                    
                    <Row>
                        <Col> 
                            <Inputcheck verbs={verb} conju={conjuType(props.cur, verb)}/>
                        </Col>
                    </Row>
                    <br/></div>) } )

                    
                    } 
        </Container>
        
        </div>
    )
}

