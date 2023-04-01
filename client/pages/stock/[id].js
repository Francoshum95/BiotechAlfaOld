import {useState, useEffect, useContext} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { AuthStateContext, AuthDispatchContext } from '../../context/GlobalContext';
import { dispatchAddticker, dispatchRemmoveticker} from '../../context/action/authAction';
import {URL_FMP} from '../../constants/baseURL'; 
import EarningsCard from '../../components/EarningsCard';
import FinCard from '../../components/FinCard';
import OutlookCard from '../../components/OutlookCard';
import Search from '../../components/Search';
import {Financial, PricePrecentage, PrecentageChange, Zeroformate, Dollarformate} from '../../components/format/Format';
import StockSelect from '../../components/pageselect/StockSelect';
import Restricted from '../../components/Restricted';

export default function Stock({stockdata}){
  const state = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);

  const router = useRouter()
  const params = router.query.id
  const tickerid = params.split("&")[0]

  const RevenueData = {
  datasets: [{
    data:  stockdata.earningsdata.yaerRevenuechart,
    fill: false,
    parsing: {
      yAxisKey: 'revenue',
      xAxisKey: 'date'
    },
    backgroundColor: "#fb8b1e",
    borderColor: "#fb8b1e"
    }]  
  }

  const EpsData = {
    datasets: [{
    data:  stockdata.earningsdata.yaerEpschart,
    fill: false,
    parsing: {
      yAxisKey: 'eps',
      xAxisKey: 'date'
    },
    backgroundColor: "#fb8b1e",
    borderColor: "#fb8b1e"
    }] 
  }

  const [textToggle, setTexttoggle] = useState(true);
  const [toggle, setToggle] = useState('outlook');
  const [isbookmarke, setIsbookmarke] = useState(false);
  const [width, setWidth] = useState(typeof window !== "undefined" && window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [width])

  useEffect(() => {
    const getTicker_list = () => {

      if(state.accessToken){
        if(state.tickers.length !== 0){
          state.tickers.forEach(ticker =>{
            if(ticker === tickerid){
              setIsbookmarke(true)
            }
          })
        }
      }
    }
    getTicker_list()
  
  }, [state.tickers])

  const handleSelect = (e, id) => {
    e.preventDefault();
    setToggle(id);
  }


  const handleadd = async(e) =>{
    e.preventDefault();
    await dispatchAddticker(dispatch, {userid: state.userId, ticker: tickerid})
    setIsbookmarke(true)
  }

  const handleremove = async(e) =>{
    e.preventDefault();
    await dispatchRemmoveticker(dispatch, {userid: state.userId, ticker: tickerid})
    setIsbookmarke(false)
  }


  return (
    <div className="min-h-screen max-w-screen bg-black font-Roboto pb-5">
      <Head>
        <title>BiotechAlfa - {stockdata.stockdata.ticker} </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full bg-red-600 md:h-10 lg:h-10 h-7 flex items-center justify-between">
        <Search page_ticker={stockdata.stockdata.id}/>
        <StockSelect id={stockdata.stockdata.sector}/>
      </div> 
      <div className="mx-auto w-full">
        <div className="mx-3 flex flex-col">
          <h1 className="text-blue-400 text-xl">
            {stockdata.stockdata.equity_name} 
          </h1>
          <h2 className="text-blue-400">
          {  stockdata.stockdata.ticker}
          {
            state.accessToken ?(
              isbookmarke ? (
                <button className="flex relative group"
                  onClick={handleremove}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 cursor-pointer hover:opacity-30 transition-opacity duration-200 ease-linear" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  <span title="hover-text" className="absolute bg-white text-black text-xs p-0.5 rounded-md bottom-2 left-5 w-[9.5rem]
                  invisible group-hover:visible">Remove from Watchlist</span>
                </button>
              ) : 
                <button className="flex relative group"
                  onClick={handleadd}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 cursor-pointer hover:opacity-30 transition-opacity duration-200 ease-linear" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span title="hover-text" className="absolute bg-white text-black text-xs p-0.5 rounded-md bottom-2 left-5 w-[7rem]
                    invisible group-hover:visible">Add to Watchlist</span>
                </button>
            ): (
              <></>
            )
          }
          </h2>
          <div className="flex">
            <p className={`text-yellow-400 mr-4 w-11/12 ${textToggle && 'line-clamp-3'}`}>
              {stockdata.stockdata.business} 
            </p>
            <div className='text-white ml-[-10px] cursor-pointer hover:text-gray-300'
              style={{'align-self': 'flex-end'}} onClick={() => setTexttoggle(!textToggle)}>
              <span className={`${!textToggle && 'hidden'}`}>More</span>
              <span className={`${textToggle && 'hidden'}`}>Hidden</span>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 row-auto md:space-x-3 lg:space-x-3 mt-5 select-none sm:grid-cols-1">
            <div className="col-span-1 ">
              <div className="w-full bg-gray-600 text-white">Stock Info</div>
              <div className="grid grid-cols-2 auto-rows-auto">
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Price 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {stockdata.stockdata.price}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Chg 1D
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {PricePrecentage(stockdata.stockdata.price_change)}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Vol 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {stockdata.stockdata.volumn}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  1Y Range 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {stockdata.stockdata.price_year_low} - {stockdata.stockdata.price_year_high}
                </div>
    
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Market Cap 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {Dollarformate(stockdata.stockdata.marketcap)}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Beta 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {Financial(stockdata.stockdata.beta)}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Sector 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right truncate">
                  {stockdata.stockdata.sector}
                  
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="w-full bg-gray-600 text-white">Earnings Est</div>
                <div className="grid grid-cols-2 auto-rows-auto">
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    P/E 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {Zeroformate(stockdata.stockdata.pe)}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    P/S 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {stockdata.stockdata.ps}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    EPS Growth 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {PrecentageChange(stockdata.stockdata.eps_growth)}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    Revenue Growth 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {PrecentageChange(stockdata.stockdata.revenue_growth)}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    PEG 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {Zeroformate(stockdata.stockdata.peg)}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    PSG 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {stockdata.stockdata.psg}
                  </div>
                </div>
              </div>
            <div className="col-span-1 ">
              <div className="w-full bg-gray-600 text-white">Company Info</div>
                <div className="grid grid-cols-1 auto-rows-auto">
                  <div className="col-span-1 row-span-1 text-blue-400 text-left cursor-pointer
                    hover:text-blue-300 truncate">
                    <a href={stockdata.stockdata.website} target="_blank">
                      {stockdata.stockdata.website}
                    </a>
                  </div>
                  <div className="grid grid-cols-2 auto-rows-auto mt-3">
                    <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                      Country
                    </div>
                    <div className="col-span-1 row-span-1 text-white text-right">
                      {stockdata.stockdata.country}
                    </div>
                    <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                      Address
                    </div>
                    <div className="col-span-1 row-span-1 text-white text-right overflow-clip text-xs">
                      {stockdata.stockdata.state}, {stockdata.stockdata.city}, {stockdata.stockdata.address}
                    </div>
                    <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                      CEO
                    </div>
                    <div className="col-span-1 row-span-1 text-white text-right">
                      {stockdata.stockdata.ceo}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="mx-3 mt-3">
          <div className="flex justify-between select-none flex-row space-x-1">
            <button className={`w-[30%] text-center text-white bg-gray-500 cursor-pointer ${toggle != "outlook" && 'hover:bg-gray-300'}
              ${toggle != "outlook" && 'bg-gray-700'}`} onClick={(e)=>handleSelect(e, 'outlook')}  
              >Outlook</button>
            <button className={`w-[30%] text-center text-white bg-gray-500 cursor-pointer ${toggle != "earnings" && 'hover:bg-gray-300'}
              ${toggle != "earnings" && 'bg-gray-700'}`} onClick={(e)=>handleSelect(e, 'earnings')}  
              >Earnings</button>
            <button className={`w-[30%] text-center text-white bg-gray-500 cursor-pointer ${toggle != "financial" && 'hover:bg-gray-300'}
              ${toggle != "financial"&& 'bg-gray-700'}`} onClick={(e)=>handleSelect(e, 'financial')}  
              >Financial</button>
          </div>
          <div className={`${toggle != "outlook" && 'hidden'} text-white`}>
            <OutlookCard stockdata={{fdata: stockdata.outlookdata, width}}/>
          </div>
          <div className={`${toggle != "earnings" && 'hidden'} text-white`}>
              {
                stockdata.earningsdata.earningsData?(
                  <EarningsCard earnings={{revenueChart: RevenueData, epsChart: EpsData, earningsData: stockdata.earningsdata.earningsData, width}}/>
                ):
                <Restricted/>
              }
          </div>
          <div className={`${toggle != 'financial' && 'hidden'} text-white`}>
            <FinCard stockdata={{findata: stockdata.financialdata, width}}/>
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const token = context.params.id.split("&")
   
  const stockinfo = await fetch(`${URL_FMP}/outlookpage?stock=${token[0]}&token=${token[1]}`)
  const stockdata = await stockinfo.json()
  
  if (!stockdata.stockdata) {
    return {
      notFound: true,
    }
  }

  return{
    props: {
      stockdata
    }
  }

}
