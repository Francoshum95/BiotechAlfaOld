import Link from 'next/link';
import {SECTOR, MARKET, HOME} from '../../constants/routers';

export default function StockSelect(props) {
  const {id} = props;

  return (
    <nav className="flex mr-5 space-x-5">
      <Link className="relative group" href={HOME}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md
            invisible group-hover:visible right-5">Home</span>
      </Link>
      <Link className="relative group" href={MARKET}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md
            invisible group-hover:visible right-5">Market</span>
      </Link>
      <Link className="relative group" href={`${SECTOR}/${id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md
            invisible group-hover:visible right-5">{id}</span>
      </Link>
    </nav>
  )
}

