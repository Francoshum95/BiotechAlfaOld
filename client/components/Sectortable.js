import Link from 'next/link'
import { useContext } from 'react';
import { AuthStateContext } from '../context/GlobalContext';
import { Precentage } from './format/Format';
import {STOCK} from '../constants/routers';


export default function Sectortable(props) {
  const {sector} = props;
  const state = useContext(AuthStateContext);
 
  return (
    <div className="grid grid-cols-11 auto-rows-auto md:grid-cols-8 sm:grid-cols-4 select-none">
      <div className="col-span-2 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm px-5 sm:text-[10px] lg:text-base text-left">
        Company
      </div>
      <div className="col-span-1 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm text-right px-5 sm:text-[10px] lg:text-base">
        Ticker
      </div>
      <div className="col-span-1 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm text-right px-5  sm:text-[10px] lg:text-base sm:hidden">
        20 EMA
      </div>
      <div className="col-span-1 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm text-right px-5  sm:text-[10px] lg:text-base sm:hidden">
        60 EMA
      </div>
      <div className="col-span-1 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm text-right px-5  sm:text-[10px] lg:text-base sm:hidden">
        Volatility
      </div>
      <div className="col-span-1 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm text-center  sm:text-[10px] lg:text-base">
        Ral. 1D %
      </div>
      <div className="col-span-1 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm text-center  sm:text-[10px] lg:text-base sm:hidden ">
        Ral. 1W%
      </div>
      <div className="col-span-1 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm text-center  sm:text-[10px] lg:text-base sm:hidden md:hidden">
        Ral. 1M%
      </div>
      <div className="col-span-1 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm text-center  sm:text-[10px] lg:text-base sm:hidden md:hidden ">
        Ral. 3M%
      </div>
      <div className="col-span-1 row-span-1 h-7 w-full bg-gray-900 
      text-white text-sm text-center  sm:text-[10px] lg:text-base sm:hidden md:hidden">
        Ral. 1Y%
      </div>
      {
        sector && 
          sector.map(stock => {
            return(
              <>
                <div className="col-span-2 row-span-1 h-7 w-full text-yellow-500 text-left 
                  px-5 font-semibold sm:text-[10px] md:text-[11px]" key={stock._id}>
                  {stock.equity_name}
                </div>
                <div className="col-span-1 row-span-1 h-7 w-full text-yellow-500 text-right 
                            px-5 font-semibold sm:text-[10px] md:text-[11px] hover:text-yellow-600">
                  <Link href={`${STOCK}/${stock.id}&${state.accessToken}`}>
                    {stock.id}
                  </Link>
                </div>
                <div className="col-span-1 row-span-1 h-7 w-full text-white text-right 
                  px-5 font-semibold sm:text-[10px] md:text-[11px] sm:hidden">
                  {stock.stat20ema}
                </div>
                <div className="col-span-1 row-span-1 h-7 w-full text-white text-right 
                  px-5 font-semibold sm:text-[10px] md:text-[11px] sm:hidden">
                  {stock.stat60ema}
                </div>
                <div className="col-span-1 row-span-1 h-7 w-full text-white text-right 
                  px-5 font-semibold sm:text-[10px] md:text-[11px] sm:hidden">
                  {stock.statturnrange}
                </div>
                <div className={`${stock.one_days_relative_performace >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7  w-full text-center 
                   font-semibold sm:text-[10px] md:text-[11px] border-2  border-black`}>
                  {Precentage(stock.one_days_relative_performace)}
                </div>
                <div className={`${stock.one_week_relative_performance >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7 w-full text-center 
                   font-semibold sm:text-[10px] md:text-[11px] border-2 border-black sm:hidden`}>
                  {Precentage(stock.one_week_relative_performance)}
                </div>
                <div className={`${stock.one_month_relative_performance >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7 w-full text-center 
                   font-semibold sm:text-[10px] md:text-[11px] border-2 border-black sm:hidden md:hidden`}>
                  {Precentage(stock.one_month_relative_performance)}
                </div>
                <div className={`${stock.three_month_relative_performance >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7 w-full text-center 
                   font-semibold sm:text-[10px] md:text-[11px] border-2 border-black sm:hidden md:hidden`}>
                  {Precentage(stock.three_month_relative_performance)}
                </div>
                <div className={`${stock.one_year_relative_performance >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7 w-full text-center 
                   font-semibold sm:text-[10px] md:text-[11px] border-2 border-black sm:hidden md:hidden`}>
                  {Precentage(stock.one_year_relative_performance)}
                </div>
              </>
            )
          })
      }

    </div>
  )
}
