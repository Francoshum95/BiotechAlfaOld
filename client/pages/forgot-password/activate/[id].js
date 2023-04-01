import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { URL_AUTH } from '../../../constants/baseURL';
import { HOME } from '../../../constants/routers';

export default function ForgotPasswordAct(activatedata) {
  const initialState = {
    userPW: '', 
    userComfirmPW: '',
    status:'',
    message: '', 
  }


  const router = useRouter()

  if (!activatedata.activatedata.status){
    setTimeout(function(){
      router.push(HOME);  
    }, 2000);
  }

  const [user, setUser] = useState(initialState);
  const {userPW, userComfirmPW, status, message} = user
  const isInvalid = userPW === '' || userComfirmPW === '' 

  const token = router.query.id

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try{
      const response = await fetch(`${URL_AUTH}/reset/rest-password`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token, userPW, userComfirmPW
        })
      })
      const reponseData = await response.json();
      
      setUser({...user, status: reponseData.status, message: reponseData.message, userPW: "", userComfirmPW: ""})

      if(reponseData.redirect){
        setTimeout(function(){
          router.push(HOME);
       }, 2000);
      }

    }catch(err){
      setUser({...user, status: false, message: err, userPW: "", userComfirmPW: ""})
    }
  }

  const handChange = e => {
    const {id, value} = e.target
    setUser({...user, [id]:value})
  }

  return (
    <div className="min-h-screen bg-black font-Roboto select-none flex flex-col">
      <Head>
        <title>BiotechAlfa - Reset Password </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <form className="mx-auto flex mt-[5rem] flex-col text-center">
          <header>
            <h1 className="text-white text-[3rem] font-semibold h-[5rem]">BiotechAlfa</h1>
            <h2 className="text-white text-[1.7rem] font-semibold">Reset Your Password</h2>
          </header>
          {
            activatedata.activatedata.status === false ? (
              <main className="flex flex-col w-full mt-3">
                <span className='text-red-400'>
                  {activatedata.activatedata.message}
                </span>
              </main>
            ) : (
              <>
                <main className="flex flex-col w-full mt-3">
                  <span className={`${ !status ? 'text-red-400': 'text-green-400'}`}>
                    {message}
                  </span>
                  <span className="text-gray-400 font-semibold">New Password</span>
                  <input
                    className="rounded-sm outline-none p-1 text-white bg-gray-800 
                      border-[0.5px] border-gray-400 focus:ring-2 focus:ring-blue-400 h-10 mt-2"
                      value={userPW} 
                      type='password'
                      id="userPW"
                      onChange={handChange}
                  />
                  <span className="text-gray-400 font-semibold">Comfirm Your New Password</span>
                  <input
                    className="rounded-sm outline-none p-1 text-white bg-gray-800 
                      border-[0.5px] border-gray-400 focus:ring-2 focus:ring-blue-400 h-10 mt-2"
                      value={userComfirmPW} 
                      type='password'
                      id="userComfirmPW"
                      onChange={handChange}
                  />
                
              </main>
              <button className={`${isInvalid && 'opacity-60'} border-none h-10  font-bold font-xl mt-5
                rounded-md text-black bg-[#0A8F00]`}
                disable={isInvalid} type="submit" data-testid="reset-pw"
                onClick={handleResetPassword}
              >
                Reset
              </button>
            </>
            )
          }
        </form>
      <fotter className="mt-10 border-t-[0.5px] border-white p-3 text-xs text-white flex flex-col w-[290px] mx-auto">
        <span className="mt-2">Quotes delayed at least 24 hours.</span>
        <span className="mt-6">The content of this webpage is not an investment advice and does not constitute any offer or solicitation to offer or recommendation of any investment product. It is for general purposes only and does not take into account your individual needs, investment objectives and specific financial circumstances.</span>
        <span className="mt-6">Copyright © 2021 BiotechAlfa.com. All Rights Reserved.</span>
      </fotter>
    </div>
  )
}

export async function getServerSideProps(context) {
  const activate = await fetch(`${URL_AUTH}/reset/password-activation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${context.params.id}`,
    }
  })

  const activatedata = await activate.json()

  return {
    props: {
      activatedata
    }
  }
}
