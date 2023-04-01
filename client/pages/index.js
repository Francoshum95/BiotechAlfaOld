import { useEffect} from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import {HOME} from '../constants/routers'


export default function Home() {
  const router = useRouter()
  useEffect(()=> {
    const handleDown = event => {
      if(event.key === 'Enter'){
        router.push(HOME)
      }
    }
    window.addEventListener("keydown", handleDown)
    return () => {
      window.removeEventListener("keydown", handleDown)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>BiotechAlfa</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-screen min-h-screen bg-black font-Roboto select-none flex flex-col">
        <div className="md:mt-[11rem] lg:mt-[11rem] mt-[5rem] px-[5rem] flex lg:flex-row items-center flex-col mb-[3rem]">
          <div className="flex flex-col h-[20rem] md:h-[15rem] lg:h-[20rem]">
            <h1 className="text-white lg:text-[7rem] md:text-[6rem] text-4xl font-semibold">BiotechAlfa</h1>
            <Link href={HOME}>
              <h3 className="text-blue-500 text-2xl cursor-pointer hover:text-blue-700 w-[201px] mt-2 md:mt-12 lg:mt-12">{`<Enter> to start`}</h3>
            </Link>
          </div>
          <div className="flex">
            <div className="text-white">
              <h3 className="text-xl lg:text-[2rem] md:text-[2rem]">A Platform for Healthcare investor</h3>
              <h3 className="mt-2 text-yellow-400">Research, Observation and More </h3>
            </div>
          </div>
        </div>
        <div className="mt-auto mb-[2rem] px-[5rem]">
          <div className="flex text-yellow-400">
            <a href="https://github.com/Francoshum95" className="cursor-pointer" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>          
            </a>
            <a href="mailto:biotechalfa@gmail.com" className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </a>
          </div>
          <div className="text-white text-xs text-center mt-6 md:text-sm lg:text-sm">
            <h1>Quotes delayed at least 24 hours.</h1>
            <h2>The content of this webpage is not an investment advice and does not constitute any offer or solicitation to offer or recommendation of any investment product. It is for general purposes only and does not take into account your individual needs, investment objectives and specific financial circumstances.</h2>
            <h2>Copyright © 2021 BiotechAlfa.com. All Rights Reserved.</h2>
          </div>3
        </div>
      </div>
    </div>
  )
}
