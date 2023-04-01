import ACTIONS from './index';
import { URL_AUTH } from '../../constants/baseURL';

export const dispatchLogin = async(dispatch, logindata) => {
  try{

    dispatch({type: ACTIONS.REQUEST_LOGIN})
  
    const tokenres = await fetch(`${URL_AUTH}/login`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logindata)
    })

    const tokenData = await tokenres.json();

    if (tokenData.user){
      dispatch({type: ACTIONS.LOGIN, payload: tokenData})
      setTimeout(function(){
        dispatch({type: ACTIONS.CLEAN})
     }, 2000);
      return 
    } else{
      dispatch({type: ACTIONS.AUTH_FAIL, payload: tokenData})
      setTimeout(function(){
        dispatch({type: ACTIONS.CLEAN})
     }, 2000);
    } 


  }catch(err){
    dispatch({type: ACTIONS.AUTH_ERROR, err})
  }
}

export const dispatchToken = async(dispatch) => {
  try{

    dispatch({type: ACTIONS.REQUEST_LOGIN})

    const tokenres = await fetch(`${URL_AUTH}/auth/refresh-token`,{
      method: 'GET',
      credentials: 'include',
    })
    const tokenData = await tokenres.json();

    if (tokenData.user){
      dispatch({type: ACTIONS.GET_TOKEN, payload: tokenData})
      setTimeout(function(){
        dispatch({type: ACTIONS.CLEAN})
     }, 2000);
      return 
    } else{
      dispatch({type: ACTIONS.AUTH_FAIL, payload: tokenData})
      setTimeout(function(){
        dispatch({type: ACTIONS.CLEAN})
     }, 2000);
    } 

  }catch(err){
    dispatch({type: ACTIONS.REFRESH_ERROR, err})
  }   
}

export const dispatchEmailLogin = async(dispatch, logindata) => {
  try{

    dispatch({type: ACTIONS.REQUEST_LOGIN})
   
    const tokenres = await fetch(`${URL_AUTH}/login/email`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logindata)
    })

    const tokenData = await tokenres.json();
   
    if (tokenData.user){
      dispatch({type: ACTIONS.LOGIN, payload: tokenData})
      setTimeout(function(){
        dispatch({type: ACTIONS.CLEAN})
     }, 2000);
      return 
    } else{
      dispatch({type: ACTIONS.AUTH_FAIL, payload: tokenData})
      setTimeout(function(){
        dispatch({type: ACTIONS.CLEAN})
     }, 2000);
    } 


  }catch(err){
    dispatch({type: ACTIONS.AUTH_ERROR, err})
  }
}

export const dispatchLogout = async(dispatch) => {
  try{
    await fetch(`${URL_AUTH}/logout`,{
      method: 'GET',
      credentials: 'include'  
    })
    dispatch({type: ACTIONS.LOGOUT})
  }catch(err){
    dispatch({type: ACTIONS.LOGOUT})
  }
}

export const dispatchClean = (dispatch) => {
  dispatch({type: ACTIONS.CLEAN})
}

export const dispatchAddticker = async(dispatch, data) =>{
  try{

    const response = await fetch(`${URL_AUTH}/addticker`,{
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const responsedata = await response.json()

    dispatch({type: ACTIONS.ADDTICKER, payload: responsedata})

  }catch(err){
    console.log(err);
  }
}

export const dispatchRemmoveticker = async(dispatch, data) =>{
  try{

    const response = await fetch(`${URL_AUTH}/removeTicker`,{
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const responsedata = await response.json()

    dispatch({type: ACTIONS.REMOVETICKER, payload: responsedata})

  }catch(err){
    console.log(err);
  }
}

