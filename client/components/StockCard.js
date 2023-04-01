export default function StockCard(props) {
  const data = props[0];
  
  return (
    <>
      <div className="w-full bg-red-600 md:h-10 lg:h-10 h-7 flex items-center justify-between">
        <Search page_ticker={data.id}/>
        <StockSelect id={data.sector}/>
      </div>
      <div className="mx-auto w-full">
        <div className="mx-3 flex flex-col">
          <h1 className="text-blue-400 text-xl">
            {data.equity_name} 
          </h1>
          <h2 className="text-blue-400">
          {  data.ticker}
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
              {data.business} 
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
                  {data.price}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Chg 1D
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {PricePrecentage(data.price_change)}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Vol 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {data.volumn}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  1Y Range 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {data.price_year_low} - {data.price_year_high}
                </div>
    
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Market Cap 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {Dollarformate(data.marketcap)}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Beta 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right">
                  {Financial(data.beta)}
                </div>
                <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                  Sector 
                </div>
                <div className="col-span-1 row-span-1 text-white text-right truncate">
                  {data.sector}
                  
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
                    {Zeroformate(data.pe)}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    P/S 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {data.ps}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    EPS Growth 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {PrecentageChange(data.eps_growth)}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    Revenue Growth 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {PrecentageChange(data.revenue_growth)}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    PEG 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {Zeroformate(data.peg)}
                  </div>
                  <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                    PSG 
                  </div>
                  <div className="col-span-1 row-span-1 text-white text-right">
                    {data.psg}
                  </div>
                </div>
              </div>
            <div className="col-span-1 ">
              <div className="w-full bg-gray-600 text-white">Company Info</div>
                <div className="grid grid-cols-1 auto-rows-auto">
                  <div className="col-span-1 row-span-1 text-blue-400 text-left cursor-pointer
                    hover:text-blue-300 truncate">
                    <a href={data.website} target="_blank">
                      {data.website}
                    </a>
                  </div>
                  <div className="grid grid-cols-2 auto-rows-auto mt-3">
                    <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                      Country
                    </div>
                    <div className="col-span-1 row-span-1 text-white text-right">
                      {data.country}
                    </div>
                    <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                      Address
                    </div>
                    <div className="col-span-1 row-span-1 text-white text-right overflow-clip text-xs">
                      {data.state}, {data.city}, {data.address}
                    </div>
                    <div className="col-span-1 row-span-1 text-yellow-400 text-left">
                      CEO
                    </div>
                    <div className="col-span-1 row-span-1 text-white text-right">
                      {data.ceo}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
