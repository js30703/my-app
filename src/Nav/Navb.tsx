import {Navbar, Nav} from 'react-bootstrap'
import {AuthContext} from '../auth/AuthProvider'
import React, {useContext} from 'react'
import Axios from 'axios'


export default function Navb() {
    const authContext = useContext(AuthContext)
    const onsub = () =>{
        Axios.post('https://www.hangeulpha.com/backend/rest-auth/logout/', {
                        token:localStorage.getItem("token")
                    })
        .then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            
        })}
    
    return (
        <div>
            <Navbar collapseOnSelect bg="dark" variant="dark">
                <Navbar.Brand href="/">HangeulPha</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        
                        
                        <Nav.Link href="/lessons">Lessons</Nav.Link>
                        {
                        authContext.authState.token != null?
                        <Nav.Link href="/myverbs" >My verbs</Nav.Link>    :
                        null
                        }
                        {
                        authContext.authState.token != null?
                        <Nav.Link href="/" onClick={onsub} >logout</Nav.Link>    :
                        <Nav.Link href="/login">login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>     
        </div>
    )
}
