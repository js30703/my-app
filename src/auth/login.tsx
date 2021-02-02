import Axios from 'axios'
import React, {useContext, useState} from 'react'
import { useForm } from 'react-hook-form';
import {Form, Button, Row, Col} from 'react-bootstrap'
import {AuthContext} from '../auth/AuthProvider'
import { Redirect } from 'react-router'
import * as actionType from './actiontype'

export default function Login() {
    const {register, handleSubmit} = useForm()
    const [redirect, setRedirect] = useState(false)
    const authContext = useContext(AuthContext)
    const onsub = (data:any) =>{
        authContext.authDispatch({type:actionType.AUTH_START})
        Axios.post('https://back.hangeulpha.com/backend/rest-auth/login/', {
                        username: data.username, 
                        password: data.password
                    })
        .then(res => {
            const token = res.data.key
            const expirationDate = new Date(new Date().getTime() + 1800*1000); // 만료시간 : 30분
            authContext.authDispatch({
                type:actionType.AUTH_SUCCESS, 
                token:res.data.key, 
                expirationDate:expirationDate
            })
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate.getTime().toString());            
            setRedirect(true)
            }
        )
        .catch( error => {
            if (error.response) {
                console.log('error.response')
                authContext.authDispatch({
                    type:actionType.AUTH_FAIL,
                    error:error.response.data.password})
              }
              else if (error.request) {
                console.log('error.request')
                authContext.authDispatch({
                    type:actionType.AUTH_FAIL,
                    error:error.request.statusText})
              }             
                })
            
        }
    
 
    if (redirect) {
        return(<Redirect to='' />)
    } else  {
            return (
        <div style={{
            width : '320px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '15px',
        }}>           
            {authContext.authState.error}
            {authContext.authState.loading? 'now loading' : 
            <Form onSubmit = {handleSubmit(onsub)}>
                <h1> Log in </h1>
                <br/>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control name="username" placeholder="Username" ref={register} />
                    
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" ref={register} />
                </Form.Group>
                    <a href='./reset'>forget password</a>
                <Row>
               
                        <Button style={{marginBottom:'20px'}} variant="outline-secondary" type="submit" block>
                            Submit
                        </Button>
                    
                </Row>
                 <Row>
                    
                
        
                <Button variant="outline-secondary" href="./signup" block>
                    Sign up
                </Button>
                
                </Row>

            
                
            </Form>
        }

        </div>
    )}
    }
