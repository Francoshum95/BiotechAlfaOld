import {useContext} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { AuthDispatchContext, AuthStateContext } from '../../context/GlobalContext';
import { dispatchLogout } from '../../context/action/authAction';
import {MARKET, LOGIN, FRONT, PORTFOLIO} from '../../constants/routers';

export default function HomeSelect() {
  const dispatch = useContext(AuthDispatchContext);
  const state = useContext(AuthStateContext);

  const router = useRouter()

  const handleLogout = async () =>{
    await dispatchLogout(dispatch)
    router.push(FRONT);
  }


  return (
    <nav className="flex mr-5 space-x-5">
      <Link className="relative group" href={MARKET}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md
            invisible group-hover:visible right-5">Market</span>
      </Link>
      <Link className="relative group" href={`${PORTFOLIO}/${state.tickers}&${state.accessToken}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md
            invisible group-hover:visible right-5">Portfolio</span>
      </Link>
      {
        state.accessToken ? (
          <button className="cursor-pointer relative group"
            onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md
            invisible group-hover:visible right-5">Logout</span>
          </button>
        ) : (
          <Link className="cursor-pointer relative group" href={LOGIN}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md
              invisible group-hover:visible right-5">Login</span>
          </Link>
        )
      }
    </nav>
  )
}
