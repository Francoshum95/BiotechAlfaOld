import ACTIONS from '../action';

export const atuthReducer = (initialState, action) =>{

  
  switch(action.type){
    case ACTIONS.REQUEST_LOGIN: {
      return {
        ...initialState,
        isLoading: true
      }
    }
    case ACTIONS.LOGIN: {
      return {
        ...initialState,
        userId: action.payload.user,
        status: action.payload.status,
        accessToken: action.payload.accessToken,
        message: action.payload.message,
        isLoading: false, 
        tickers: action.payload.tickers
      }
    }
    case ACTIONS.GET_TOKEN: {
      return {
        ...initialState,
        userId: action.payload.user,
        status: action.payload.status,
        accessToken: action.payload.accessToken,
        isLoading: false, 
        tickers: action.payload.tickers
      }
    }
    case ACTIONS.AUTH_FAIL: {
      return {
        ...initialState, 
        message: action.payload.message,
        status: action.payload.status,
        accessToken: false,  
        isLoading: false
      }
    }
    case ACTIONS.AUTH_ERROR: {
      return {
        ...initialState, 
        message: "Error, Please Try Again Later",
        status: false,
        accessToken: false, 
        isLoading: false 
      }
    }
    case ACTIONS.REFRESH_ERROR: {
      return {
        ...initialState, 
        status: false,
        accessToken: false, 
        isLoading: false,
        tickers: []
      }
    }
    case ACTIONS.LOGOUT: {
      return {
        ...initialState, 
        accessToken: false,
        status: false,
        tickers: []
      }
    }
    case ACTIONS.CLEAN:{
      return {
        ...initialState,
        message: "",
      }
    }
    case ACTIONS.ADDTICKER:{
      return {
        ...initialState,
        tickers: action.payload.tickers
      }
    }
    case ACTIONS.REMOVETICKER: {
      return {
        ...initialState,
        tickers: action.payload.tickers
      }
    }
    default:
      return initialState;
  }
}



