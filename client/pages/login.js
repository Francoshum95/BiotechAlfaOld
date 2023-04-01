import {useState, useContext} from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router'
import {dispatchLogin, dispatchClean} from '../context/action/authAction';
import { AuthDispatchContext, AuthStateContext } from '../context/GlobalContext';
import MarketSelect from '../components/pageselect/MarketSelect';
import {SIGNUP, HOME, FORGOTPW, LOGINEMAIL} from '../constants/routers';


export default function login() {

  const initialState = {
    user_id:'',
    user_password: '', 
    save: false,
  }
  
  const [user, setUser] = useState(initialState);

  const state = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);

  const router = useRouter()

  const {user_id, user_password, save} = user
  const isInvalid = user_id ==  '' || user_password == '' 


  if(state.accessToken){
    setTimeout(function(){
      router.push(HOME);
      dispatchClean(dispatch)
   }, 1000);

  }

  const handleSignin = async (e) => {
    e.preventDefault()

    if(isInvalid){
      return 
    }else if(state.isLoading){
      return 
    }

    await dispatchLogin(dispatch, {user_id, user_password, save})
  
  }

  const handChange = e => {
    const {id, value} = e.target
    if (id === 'save'){
      if(save === true){
        setUser({...user, save: false})
        return 
      } else if (save === false){
        setUser({...user, save: true})
        return 
      }
    }
    setUser({...user, [id]:value})
  }


  return (
    <div className="min-h-screen bg-black font-Roboto select-none flex flex-col">
      <Head>
        <title>BiotechAlfa - Login </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mx-6 mt-6">
        <MarketSelect/>
      </div>
      <form className="mx-auto flex mt-[5rem] flex-col">
        <header>
          <h1 className="text-white text-[3rem] font-semibold h-[5rem]">BiotechAlfa</h1>
        </header>
        <div className="flex flex-col">
          <span className="text-white text-2xl ">
            Don't have an account?
          </span>
          <Link href={SIGNUP} className="text-blue-400 text-sm hover:underline">
              Register here, it's FREE
          </Link>
        </div>
        <main className="flex flex-col w-full mt-3">
          <span className={`${ !state.status ? 'text-red-400': 'text-green-400'}`}>
            {state.message}
          </span>
          <span className="text-gray-400 font-semibold">User ID</span>
          <input
            className="rounded-sm outline-none p-1 text-white bg-gray-800 
              border-[0.5px] border-gray-400 focus:ring-2 focus:ring-blue-400 h-10 mt-2"
              value={user_id} 
              type='text'
              id="user_id"
              onChange={handChange}
          />
          <span className="text-gray-400 font-semibold mt-10">Password</span>
          <input
            className="rounded-sm outline-none p-1 text-white bg-gray-800 
            border-[0.5px] border-gray-400 focus:ring-2 focus:ring-blue-400 h-10 mt-2"
            value={user_password} 
            type='password'
            id="user_password"
            autoComplete="off"
            onChange={handChange}
          />
          <label className="flex mt-5 ">
            <input
              type="checkbox"
              value=""
              id="save"
              onChange={handChange}
              className="rounded-sm outline-none cursor-pointer before:bg-gray-800"
            />
            <span className="ml-3 text-gray-400 font-semibold">Remember Me</span>
          </label>
        </main>
        <div className="mt-2 flex text-white justify-between text-sm p-2 ">
          <Link href={FORGOTPW}>
            <span className="cursor-pointer hover:text-blue-400">Forgot password</span>
          </Link>
          <span className="text-gray-400">|</span>
          <Link href={LOGINEMAIL}>
            <span className="cursor-pointer hover:text-blue-400">Forgot User ID</span>
          </Link>
        </div>
        <button className={`${isInvalid && 'opacity-60'} border-none h-10  font-bold font-xl mt-5
          rounded-md text-black bg-[#0A8F00]`}
          type="submit" data-testid="sign-in"
          onClick={handleSignin}
        >
          {state.isLoading ?'Loading': 'Log In'}
        </button>
      </form>
      <fotter className="mt-10 border-t-[0.5px] border-white p-3 text-xs text-white flex flex-col w-[290px] mx-auto">
        <span className="mt-2">Quotes delayed at least 24 hours.</span>
        <span className="mt-6">The content of this webpage is not an investment advice and does not constitute any offer or solicitation to offer or recommendation of any investment product. It is for general purposes only and does not take into account your individual needs, investment objectives and specific financial circumstances.</span>
        <span className="mt-6">Copyright © 2021 BiotechAlfa.com. All Rights Reserved.</span>
      </fotter>
    </div>
  )
}

