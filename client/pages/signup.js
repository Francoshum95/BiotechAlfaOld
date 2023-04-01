import {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router'
import {URL_AUTH} from '../constants/baseURL';
import MarketSelect from '../components/pageselect/MarketSelect';
import {LOGIN, HOME} from '../constants/routers';



export default function signup() {
  
  const initialState = {
    userID:'',
    userEmail:'', 
    userPW: '', 
    userComfirmPW: '',
    status:'',
    message: ''
  }
  const [user, setUser] = useState(initialState);
  
  const {userID, userPW, userComfirmPW, userEmail, status, message} = user
  const isInvalid = userID === '' || userPW === '' || userComfirmPW === '' || userEmail === ''

  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()

    if(isInvalid){
      return 
    }
    try{
      const response = await fetch(`${URL_AUTH}/registration`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID, userEmail, userPW, userComfirmPW
        })
      })
      const reponseData = await response.json();

      if (reponseData){
        setUser({...user, status: reponseData.status, message: reponseData.message})
  
        if(reponseData.status){
          setTimeout(function(){
            router.push(HOME);
         }, 2000);
        }
      }
      
    }catch(err){
      setUser({...user, status: false, message: err})
    }
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
      <form className="mx-auto flex mt-[3rem] flex-col"
        onSubmit={handleSignup}
        >
        <header>
          <h1 className="text-white text-[3rem] font-semibold h-[5rem]">BiotechAlfa</h1>
        </header>
        <div className="flex flex-col">
          <span className="text-white text-2xl ">
            Already have an account?
          </span>
          <Link href={LOGIN} className="text-blue-400 text-sm hover:underline">
              Log in here
          </Link>
        </div>
        <main className="flex flex-col w-full mt-3">
          <span className={`${status? 'bg-green-400' : 'bg-red-500'} text-white font-semibold text-xl text-center`}>
            {message}
          </span>
          <span className="text-gray-400 font-semibold">User ID</span>
          <input
            className="rounded-sm outline-none p-1 text-white bg-gray-800 
              border-[0.5px] border-gray-400 focus:ring-2 focus:ring-blue-400 h-10 mt-2"
              value={userID} 
              type='text'
              id="userID"
              onChange={handChange}
          />
          <span className="text-gray-400 font-semibold mt-5">Email</span>
          <input
            className="rounded-sm outline-none p-1 text-white bg-gray-800 
              border-[0.5px] border-gray-400 focus:ring-2 focus:ring-blue-400 h-10 mt-2"
              value={userEmail} 
              type='text'
              id="userEmail"
              onChange={handChange}
          />
          <span className="text-gray-400 font-semibold mt-5">Password</span>
          <input
            className="rounded-sm outline-none p-1 text-white bg-gray-800 
            border-[0.5px] border-gray-400 focus:ring-2 focus:ring-blue-400 h-10 mt-2"
            value={userPW} 
            type='password'
            id="userPW"
            autoComplete="off"
            onChange={handChange}
          />
          <span className="text-gray-400 font-semibold mt-5">Comfirm Password</span>
          <input
            className="rounded-sm outline-none p-1 text-white bg-gray-800 
              border-[0.5px] border-gray-400 focus:ring-2 focus:ring-blue-400 h-10 mt-2"
              value={userComfirmPW} 
              type='password'
              id="userComfirmPW"
              autoComplete="off"
              onChange={handChange}
          />
        </main>
        <button className={`${isInvalid && 'opacity-60'} border-none h-10  font-bold font-xl mt-5
          rounded-md text-black bg-[#0A8F00]`}
          type="submit" data-testid="sign-up"
        >
          Sign Up 
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
