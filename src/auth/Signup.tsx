import {Form, Button, Col} from 'react-bootstrap'
import Axios from 'axios'
import React, {useContext, useState} from 'react'
import { useForm } from 'react-hook-form';
import {AuthContext} from '../auth/AuthProvider'
import { Redirect } from 'react-router'
import * as actionType from './actiontype'


interface IFormInputs {
    email:string,
    username: string, 
    password1: string,
    password2: string
  }

export default function Signup() {
    const {register, errors, handleSubmit, getValues, trigger} = useForm<IFormInputs>({
        criteriaMode: "all",
        mode:'onChange'
    })
    const [redirect, setRedirect] = useState(false)
    const [nameVery, setNameVery] = useState(false)
    const [nameMess, setNameMess] = useState('Please check user name')
    const authContext = useContext(AuthContext)
    const nameCheckSub =(data:any) =>{
        Axios.post('http://127.0.0.1:8000/jamo/username/',{
            username:getValues('username')
        }).then(res => {
            if (!res.data.use) {
                setNameVery(false)
                setNameMess(res.data.message)
            }
            else {
                setNameVery(true)
            }
            trigger('username')
        })
    }
    const onsub = (data:any) =>{
        authContext.authDispatch({type:actionType.AUTH_START})
        Axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            // email:data.email,
            username: data.username, 
            password1: data.password1,
            password2: data.password2
        })
.then(res => {const token = res.data.key
    const expirationDate = new Date(new Date().getTime() + 1800*1000); // 만료시간 : 30분
    authContext.authDispatch({
        type:actionType.AUTH_SUCCESS, 
        token:res.data.key, 
        expirationDate:expirationDate
    })
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.getTime().toString());            
    setRedirect(true)})
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
            <h2>Sign up</h2>
            <Form onSubmit = {handleSubmit(onsub)} >

            <Form.Group controlId="formGridAddress1">
                    <Form.Label>User Name</Form.Label>
                    <Form.Row>
                    <Col>
                    
                    <Form.Control style={{width:'270px'}} name='username' placeholder="User name" 
                    ref={register({
                        required:true,
                        validate: value => nameVery
                        ,
                    })} />

                    </Col>
                    <Col><Button variant="outline-secondary" type="submit" onClick={nameCheckSub} block>
                            check
                        </Button></Col>
                        </Form.Row>
                    {  
                        errors.username?.types?.required
                        && <p style={{color:'red'}}>error : <span style={{color:'gray'}}>
                        usename is required </span></p>                
                    }
                    {  
                        
                         errors.username?.types?.validate
                        && <p style={{color:'red'}}>error : <span style={{color:'gray'}}>
                        {nameMess}</span></p>                
                    }
                </Form.Group>
                
            
                
                <Form.Group controlId="formGridPassword1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password1' type="password" placeholder="Password" ref={register({
                        required:true,
                        pattern: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{0,50}).{1,50}/i,
                        minLength:8
                    })} />
                
                    {
                        errors.password1?.types?.required 
                        && <p style={{color:'red'}}>error  :   <span style={{color:'gray'}}>
                        password is required </span><br/></p>
                    }
                    {  
                        errors.password1?.types?.pattern 
                        && <p style={{color:'red'}}>error  :   <span style={{color:'gray'}}>
                        password should contain more than one special character and number. </span></p>
                    }
                    {  
                        errors.password1?.types?.minLength 
                        && <p style={{color:'red'}}>error  :   <span style={{color:'gray'}}>
                        password should be longer than 8 characters </span></p>
                    }
                </Form.Group>

                <Form.Group controlId="formGridPassword2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name='password2' type="password" placeholder="Password" ref={register({
                        validate: value => value === getValues('password1')
                        ,
                        required:true                       
                    })} />

                    {
                        errors.password2?.types?.required 
                        && <p style={{color:'red'}}>error  :   <span style={{color:'gray'}}>
                        password comfirmation is required </span><br/></p>
                    }

                    {  

                        errors.password2?.types?.validate
                        && <p style={{color:'red'}}>error : <span style={{color:'gray'}}>
                        password is not identical </span></p>                
                    }

                </Form.Group>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" ref={register({
                        required:true,
                        pattern:/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+\.[a-zA-Z]{2,}$/i,
                        })} />

                        <Form.Text>Email is optional. But if you do not eroll email adress, 
                            <br/>It is impossible to find your password as you foget it.</Form.Text>
                    {
                        errors.email?.types?.required 
                        && <p style={{color:'red'}}>error  :   <span style={{color:'gray'}}>
                        email is required </span><br/></p>
                    }
                    {
                        errors.email?.types?.pattern 
                        && <p style={{color:'red'}}>error  :   <span style={{color:'gray'}}>
                        Invalid email form </span><br/></p>
                    }
                    
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
