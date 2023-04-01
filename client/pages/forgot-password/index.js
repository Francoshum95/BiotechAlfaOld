import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router'
import {URL_AUTH} from '../../constants/baseURL';
import {SIGNUP,HOME} from '../../constants/routers';
import MarketSelect from '../../components/pageselect/MarketSelect';

export default function forgotpassword() {

  const initialState = {
    user_email:'',
    status:false,
    message: ''
  }

  const [resetInfo, setResetInfo] = useState(initialState);
  const {user_email, status, message} = resetInfo

  const isInvalid = user_email === '' 

  const router = useRouter()

  const handleResetpassword = async (e) => {
    e.preventDefault()
    
    if(isInvalid){
      return 
    }

    try{
      const response = await fetch(`${URL_AUTH}/reset/password`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_email})
      })
      const reponseData = await response.json();

      setResetInfo({user_email: "", status: reponseData.status, message: reponseData.message}) 
      setTimeout(function(){
        router.push(HOME);  
      }, 2000);
    } catch(err){
      setResetInfo({user_email: "", status: false, message: err}) 
    }
  }

  const handChange = e => {
    const {id, value} = e.target
    setResetInfo({...resetInfo, [id]:value})
  }

  
  return (
    <div className="min-h-screen bg-black font-Roboto select-none flex flex-col">
      <Head>
        <title>BiotechAlfa - Forgot Your Password </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mx-6 mt-6">
        <MarketSelect/>
      </div>
      <form className="mx-auto flex mt-[5rem] flex-col">
        <header>
          <h1 className="text-white text-[3rem] font-semibold h-[5rem]">BiotechAlfa</h1>
          <h2 className="text-white text-[1.7rem] font-semibold">Reset Your Password</h2>
        </header>
        <div className="flex flex-col">
          <span className="text-white text-xl ">
            Don't have an account?
          </span>
          <Link className="text-blue-400 text-sm hover:underline" href={SIGNUP}>
              Register here, it's FREE
          </Link>
        </div>
        <main className="flex flex-col w-full mt-3">
          <span className={`${ !status ? 'text-red-400': 'text-green-400'}`}>
            {message}
          </span>
          <span className="text-gray-400 font-semibold">Your Eamil</span>
          <input
            className="rounded-sm outline-none p-1 text-white bg-gray-800 
              border-[0.5px] border-gray-400 focus:ring-2 focus:ring-blue-400 h-10 mt-2"
              value={user_email} 
              type='text'
              id="user_email"
              onChange={handChange}
          />
        </main>
        <button className={`${isInvalid && 'opacity-60'} border-none h-10  font-bold font-xl mt-5
          rounded-md text-black bg-[#0A8F00]`}
          disable={isInvalid} type="submit" data-testid="reset-pw"
          onClick={handleResetpassword}
        >
          Submit
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
