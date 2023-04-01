import { useState, useContext} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuthDispatchContext, AuthStateContext } from '../../context/GlobalContext';
import { dispatchRemmoveticker, dispatchAddticker} from '../../context/action/authAction';
import SearchAdd from '../../components/SearchAdd';
import { NosymbolNoNullPrecentage } from '../../components/format/Format';
import { URL_FMP } from '../../constants/baseURL';
import { HOME, STOCK} from '../../constants/routers';


export default function portfolio({portfolioDataList}) {
  const [openEdit, setOpenEdit] = useState(false);
  const state = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);

  const [portfolioData, setportfolioData] = useState(portfolioDataList)

  const handleRemove = async (e, id) => {
    e.preventDefault()

    portfolioData.forEach((ticker, index) => {
      if(ticker.id === id){
        portfolioData.splice(index, 1)
      }
    })

    setportfolioData([...portfolioData])
    await dispatchRemmoveticker(dispatch, {userid: state.userId, ticker: id})
  }

  const handleAdd = async (e, id) => {
    e.preventDefault()
    
    const fetchstock = await fetch(`${URL_FMP}/summarystock?stock=${id}`)
    const fechstockdata = await fetchstock.json()

    portfolioData.push(fechstockdata[0])
    
    setportfolioData([...portfolioData])
    await dispatchAddticker(dispatch, {userid: state.userId, ticker: id})
    
  }


  return (
    <div className="min-h-screen max-w-screen bg-black font-Roboto pb-5"> 
      <Head>
        <title>BiotechAlfa - Your Portfolio </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div className="w-full bg-red-600 md:h-10 lg:h-10 h-7 flex items-center justify-between">
              <h1 className="text-white text-xs md:text-sm lg:text-lg ml-5">Portfolio</h1>
              <nav className="flex mr-5">
                {
                  openEdit?(
                  <button className="cursor-pointer relative group mr-5"
                    onClick={()=>setOpenEdit(!openEdit)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md right-3
                    invisible group-hover:visible">Done</span>
                  </button>

                  ):(
                    <button className="cursor-pointer relative group mr-5"
                      onClick={()=>setOpenEdit(!openEdit)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                      </svg>
                      <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md right-3
                      invisible group-hover:visible">Edit</span>
                    </button>
                  )
                }
                <Link href={HOME} className="relative group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    <span title="hover-text" className="absolute bg-white text-black text-xs p-1 rounded-md
                      invisible group-hover:visible">Home</span>
                </Link>
              </nav>
        </div>
        <div className="grid grid-cols-12 md:grid-cols-6 sm:grid-cols-4 auto-rows-auto select-none">
              <div className="col-span-2 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-left px-5 ">
                Ticker
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-right px-5 sm:hidden md:hidden">
                Price
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-right px-5 sm:hidden md:hidden">
                Volume
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-right px-5 md:hidden sm:hidden">
                20 EMA
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-right px-5 md:hidden sm:hidden">
                60 EMA
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-right px-5 md:hidden sm:hidden">
                Volatility
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-center ">
                Ral. 1D %
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-center ">
                Ral. 1W%
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-center sm:hidden">
                Ral. 1M%
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-center sm:hidden">
                Ral. 3M%
              </div>
              <div className="col-span-1 row-span-1 h-5 w-full bg-gray-900 
              text-white text-[12px] text-center md:hidden sm:hidden">
                Ral. 1Y%
              </div>
              {
                portfolioData&&
                  portfolioData.map(stock => {
                    return(
                      <>
                      <div className="col-span-2 row-span-1 h-7 w-full text-yellow-500 text-left 
                        px-5 font-semibold sm:text-[10px] md:text-[11px] group">
                        <button className={`${!openEdit && 'hidden'} cursor-pointer mr-3`}
                          onClick={(e)=> handleRemove(e, stock.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <Link className="hover:text-yellow-600" href={`${STOCK}/${stock.id}&${state.accessToken}`}>
                            {stock.id}
                        </Link>
                      </div>
                      <div className="col-span-1 row-span-1 h-7 w-full text-yellow-500 text-right 
                        px-5 font-semibold sm:text-[10px] md:text-[11px] sm:hidden md:hidden">
                        {stock.price}
                      </div>
                      <div className="col-span-1 row-span-1 h-7 w-full text-yellow-500 text-right 
                        px-5 font-semibold sm:text-[10px] md:text-[11px] sm:hidden md:hidden">
                        {stock.volumn}
                      </div>
                      <div className="col-span-1 row-span-1 h-7 w-full text-yellow-500 text-right 
                        px-5 font-semibold sm:text-[10px] md:text-[11px] md:hidden sm:hidden">
                        {stock.stat20ema}
                      </div>
                      <div className="col-span-1 row-span-1 h-7 w-full text-yellow-500 text-right 
                        px-5 font-semibold sm:text-[10px] md:text-[11px] md:hidden sm:hidden">
                        {stock.stat60ema}
                      </div>
                      <div className="col-span-1 row-span-1 h-7 w-full text-yellow-500 text-right 
                        px-5 font-semibold sm:text-[10px] md:text-[11px] md:hidden sm:hidden">
                        {stock.statturnrange}
                      </div>
                      <div className={`${stock.one_days_relative_performace >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7  w-full text-center 
                        font-semibold sm:text-[10px] md:text-[11px] border-2  border-black`}>
                        {NosymbolNoNullPrecentage(stock.one_days_relative_performace)}
                      </div>
                      <div className={`${stock.one_week_relative_performance >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7  w-full text-center 
                        font-semibold sm:text-[10px] md:text-[11px] border-2  border-black`}>
                        {NosymbolNoNullPrecentage(stock.one_week_relative_performance)}
                      </div>
                      <div className={`${stock.one_month_relative_performance >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7  w-full text-center 
                        font-semibold sm:text-[10px] md:text-[11px] border-2  border-black sm:hidden`}>
                        {NosymbolNoNullPrecentage(stock.one_month_relative_performance)}
                      </div>
                      <div className={`${stock.three_month_relative_performance >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7  w-full text-center 
                        font-semibold sm:text-[10px] md:text-[11px] border-2  border-black sm:hidden`}>
                        {NosymbolNoNullPrecentage(stock.three_month_relative_performance)}
                      </div>
                      <div className={`${stock.one_year_relative_performance >0 ? 'bg-green-400' : 'bg-red-500'} col-span-1 row-span-1 h-7  w-full text-center 
                        font-semibold sm:text-[10px] md:text-[11px] border-2  border-black md:hidden sm:hidden`}>
                        {NosymbolNoNullPrecentage(stock.one_year_relative_performance)}
                      </div>
                      </>
                    )
                  })
              }
              
              <div className={`${!openEdit && 'hidden'} mt-2`}> 
                <SearchAdd addFunction = {handleAdd}/>
              </div>
        </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const token = context.params.id.split("&")

  var portfolioDataList = []
  
  if(token[1] === "false"){
    return {
      notFound: true
    }
  } else if(token[0]===""){
    return{
      props:{
        portfolioDataList
      }
    }
  }
 
  const portfolio = await fetch(`${URL_FMP}/summarymany?stock=${token[0]}&token=${token[1]}`,{
    method: 'GET'
  })
 
  portfolioDataList = await portfolio.json()

  if(!portfolioDataList[0]){
    return {
      notFound: true
    }
  }

  return {
    props:{
      portfolioDataList
    }
  }
}
