import Link from 'next/link'
import { useContext } from 'react';
import { AuthStateContext } from '../context/GlobalContext';
import { Precentage } from './format/Format';
import {STOCK, SECTOR} from '../constants/routers';

export default function Table(props) {
  const stockdata = props.stockdata
  const state = useContext(AuthStateContext);
  return (
  
    <div className="grid grid-cols-6 auto-rows-auto sm:grid-cols-4 select-none">
      <Link href={`${SECTOR}/${stockdata.id}`}>
        <div className="col-span-2 row-span-1 h-5 w-full bg-gray-900
                      text-white text-sm text-left px-5 sm:text-[10px] lg:text-base cursor-pointer hover:text-gray-400">
          {stockdata.type}
        </div>
      </Link>
      <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
                     text-white text-sm text-right px-5  sm:text-[10px] lg:text-base">
        Ticker
      </div>
      <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
                     text-white text-sm text-right px-5 sm:hidden lg:text-base">
        Value
      </div>
      <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
                     text-white text-sm text-right px-5 lg:text-base"> 
        Ral. %
      </div>
      <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
                     text-white text-sm text-right px-5 sm:hidden lg:text-base">
        Time
      </div>
      {
        stockdata.equity && 
          stockdata.equity.map(stock => {
            return(
              <>
                <div className="col-span-2 row-span-1 h-5 w-full text-yellow-500 text-left 
                px-5 font-semibold sm:text-[10px] md:text-[11px]" key={stock._id}>
                  {stock.equity_name}
                </div>
                <div className="col-span-1 row-span-1 h-7 w-full text-yellow-500 text-right 
                              px-5 font-semibold sm:text-[10px] md:text-[11px] hover:text-yellow-600">
                <Link href={`${STOCK}/${stock.id}&${state.accessToken}`}>
                  {stock.id}
                </Link>
                
                </div>
                <div className="col-span-1 row-span-1 h-7 w-full text-yellow-500 text-right 
                              px-5 font-semibold sm:hidden">
                {stock.price}
                </div>
                <div className={`${stock.one_days_relative_performace >0 ? 'text-green-400' : 'text-red-600'} col-span-1 row-span-1 h-7 w-full  text-right 
                              px-5 font-semibold sm:text-[13px]`}>
                {Precentage(stock.one_days_relative_performace)}
                </div>
                <div className="col-span-1 row-span-1 h-7 w-full text-yellow-500 text-right 
                              px-5 font-semibold sm:hidden">
                {stock.time}
                </div>
              </>
            )
          })
      }
    </div>
  )
}