import Link from 'next/link';
import {MARKET} from '../../constants/routers';

export default function SectorSelect() {
  return (
    <nav className="flex mr-5">
      <Link href={MARKET} className="relative group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md
            invisible group-hover:visible right-5">Market</span>
      </Link>
    </nav>
  )
}
