import React, { useReducer, Dispatch, useEffect } from 'react'
import {reducer, state} from './reducer'
import Axios from 'axios'
import * as actionType from './actiontype'

type authcon ={
  authState:state,
  authDispatch:Dispatch<any>
}

export const AuthContext = React.createContext<authcon>({}as authcon)

export default function AuthProvider(props:any) {
  const [state, dispatch] = useReducer(reducer, {})
  const token = localStorage.getItem('token');
  const logout = () => {
    Axios.post('https://back.hangeulpha.com/backend/rest-auth/logout/', {
            token:localStorage.getItem('token')
        })
    .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        dispatch({type:actionType.AUTH_LOGOUT,
          error:null,
          token:null,
          expirationDate:null})
    })}

    const checkAuthTimeout = (ex:number) =>{
      setTimeout( () => {
          dispatch({type:actionType.AUTH_LOGOUT,
          error:null,
          token:null,
          expirationDate:null})
      }, ex * 1000)
  }

  useEffect(() => {
    
        if (token === null) {
            dispatch({type:actionType.AUTH_LOGOUT,
              error:null,
              token:null,
              expirationDate:null})
        } else {
            const expirationDate = new Date(Number(localStorage.getItem('expirationDate')));
            if (expirationDate.getTime() <= new Date().getTime()) {
                dispatch({type:actionType.AUTH_LOGOUT,
                  error:null,
                  token:null,
                  expirationDate:null});
                logout()
            } else {
                dispatch({type:actionType.AUTH_SUCCESS,
                  error:null,
                  token:localStorage.getItem('token'),
                  expirationDate:localStorage.getItem('expirationDate')});
                checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000);
            }  }},[token])

  
    return (
    <AuthContext.Provider value ={{authState:state, authDispatch:dispatch}}>
    {props.children}
    </AuthContext.Provider>
  )
}
