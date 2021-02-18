import * as actionTypes from './actiontype'

export type state ={
    token:boolean|null,
    error:string|null,
    loading:boolean,
    expirationDate:string|null
} 

export type action = {type:string|null, token:string|null , error:string|null, expirationDate:string|null} 

export const initialState = {
    token: null,
    error: null,
    loading: false,
    expirationDate: null
}


const updatedObject = (oldObject:object, updatedProperties:object) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}


const authStart = (state:state) => {
    return updatedObject(state, {
        token: null,
        error: null,
        loading: true
    });

}

const authSuccess = (state:object, action:action) => {
    return updatedObject(state, {
        token: action.token,
        error: null,
        loading: false,
        expirationDate:action.expirationDate
    });

} 

const authFail = (state:object, action:action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false
    });
}

 const authLogout = (state:object, action:action) => {
    return updatedObject(state, {
        token: null,
        error: null,
        loading: false,
        expirationDate: null
    });

}


export const reducer = (state:state = initialState, action:action ) : any => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default : return state ; 
    }
} 

