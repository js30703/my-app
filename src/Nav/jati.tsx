import React,{useContext} from 'react'
import {AuthContext} from '../auth/AuthProvider'
import Axios from 'axios'


export default function Jati() {
    const authContext = useContext(AuthContext)
    const onsub = () =>{
        Axios.get('http://localhost:8000/jamo/myverbs12/',{
            headers:{
                'Authorization': `token ${authContext.authState.token}`
            }
        })
        .then( (res:any) => {
            console.log(res.data)
            })
        .catch( (error:any) => console.log(error.request) )
        }
    return (
        <div>
            <button onClick = {onsub}> Click me </button>
        </div>
    )
}
