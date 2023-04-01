import Head from 'next/head';
import { useRouter } from 'next/router'
import {URL_AUTH} from '../../constants/baseURL';
import {HOME} from '../../constants/routers';

export default function RegistrationAct(activatedata) {
  const router = useRouter()

  setTimeout(function(){
    router.push(HOME);  
 }, 3000);

  return (
    <div className="min-h-screen bg-black font-Roboto select-none flex flex-col">
      <Head>
        <title>BiotechAlfa - Activatation </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="text-white flex mx-auto mt-[10rem] text-[7rem] font-bold">Biotechalfa</h1>
      <div className="flex mx-auto text-3xl mt-4 text-blue-400 font-semibold">
        {activatedata.activatedata.message}
      </div>
      <fotter className="mt-10 border-t-[0.5px] border-white p-3 text-xs text-white flex flex-col w-[290px] mx-auto">
        <span className="mt-2">Quotes delayed at least 24 hours.</span>
        <span className="mt-6">The content of this webpage is not an investment advice and does not constitute any offer or solicitation to offer or recommendation of any investment product. It is for general purposes only and does not take into account your individual needs, investment objectives and specific financial circumstances.</span>
        <span className="mt-6">Copyright © 2021 BiotechAlfa.com. All Rights Reserved.</span>
      </fotter>
    </div>
  )
}

export async function getServerSideProps(context) {
  const activate = await fetch(`${URL_AUTH}/registration/activation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${context.params.id}`,
    }
  })

  const activatedata = await activate.json()

  return {
    props: {
      activatedata
    }
  }
}