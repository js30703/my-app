import {Form, Button, Col} from 'react-bootstrap'
import Axios from 'axios'
import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router'



interface IFormInputs {
    email:string,
    username: string, 
    password1: string,
    password2: string
  }

export default function Reset() {
    const {register, handleSubmit} = useForm<IFormInputs>({
        criteriaMode: "all",
        mode:'onChange'
    })
    const [redirect, setRedirect] = useState(false)
    

    const onsub = (data:any) =>{
        Axios.post('https://www.hangeulpha.com/backend/rest-auth/password/reset/', {
            email:data.email,

        })
        setRedirect(true)
            
    }

    if (redirect) {
        return(<Redirect to='' />)
    } else  {
    return ( 
        <div style={{
            width : '360px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '15px',
        }}>
            <h2>Reset password</h2>
            <Form onSubmit = {handleSubmit(onsub)} >

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Email</Form.Label>     
                
                <Form.Control style={{width:'270px'}} name='email' placeholder="Email" 
                ref={register({
                    required:true,
                    
                })} />
                <Form.Text></Form.Text>
                    
            </Form.Group>
                
            
            <Form.Row>
                <Col>
                    <Button variant="outline-secondary" type="submit" block>
                        Submit
                    </Button>
                </Col>
                
            </Form.Row>
            </Form>
            
        </div>
    )
}}
