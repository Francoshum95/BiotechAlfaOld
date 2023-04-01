import Link from 'next/link'
import { LOGIN, SIGNUP } from '../constants/routers'

export default function Restricted() {
  return (
    <div className="w-full h-[15rem] bg-gray-400 bg-opacity-40 rounded-md mt-5 select-none">
      <div className="flex items-center h-[15rem] justify-center">
        <span className="text-white font-smibold flex sm:text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Please</span>
          <Link href={LOGIN} className="ml-1 text-blue-400 cursor-pointer hover:text-blue-300">
            Login 
          </Link>
          <span className="ml-1">/</span>
          <Link href={SIGNUP} className="ml-1 text-blue-400 cursor-pointer hover:text-blue-300">
            Sign Up  
          </Link>
          <span className="ml-1">To Access Complete Content </span>
            
        </span>
      </div>
    </div>
  )
}
