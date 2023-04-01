import { createContext, useReducer, useEffect} from "react";
import {dispatchToken, dispatchClean} from '../context/action/authAction';
import {atuthReducer} from './reducers/authReducer';

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext(); 

const initialState = {
  userId: "",
  status: "",
  accessToken: false,
  isLoading: false,
  message: "",
  tickers: []
}

export function GlobalContext({children}) {
  const [state, dispatch] = useReducer(atuthReducer, initialState);

  useEffect(() => {

    const refersh_token = async() => {
      await dispatchToken(dispatch);
      dispatchClean(dispatch)
      
    }
    refersh_token()

    return () => {
      refersh_token()
    }
  }, [])

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}
