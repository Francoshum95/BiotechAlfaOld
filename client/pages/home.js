import Head from 'next/head';
import WeeklyChart from '../components/WeeklyChart';
import {URL_STOCK, URL_NEWS} from '../constants/baseURL'; 
import { DateFormat } from '../components/format/Format';
import HomeSelect from '../components/pageselect/HomeSelect';

export default function home({maindata, earningsdata, gaindata, losedata}) {

  return (
    <div className="min-h-screen bg-black font-Roboto select-none flex flex-col">
      <Head>
        <title>BiotechAlfa - Home </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full bg-red-600 md:h-10 lg:h-10 h-7 flex items-center justify-between">
        <h1 className="text-white text-xs md:text-sm lg:text-lg ml-5">All News</h1>
        <HomeSelect/>
      </div>
      <div className=" mx-auto w-full mt-2">
        <div className="mx-3 flex flex-col xl:flex-row">
          <div className="xl:w-7/12">
            <div className="flex flex-col w-full">
              <h1 className="sm:text-xl text-4xl  font-bold text-white">Industry News</h1>
              <div className="w-full flex flex-col mt-2">
                {
                  maindata.items && 
                  maindata.items.map(stock => {
                    return(
                      <article className="flex border border-black cursor-pointer hover:border-white" 
                      key={stock.link}>
                      <a className="flex text-yellow-500 text-xs justify-between items-center md:text-sm lg:text-xl" 
                        href={stock.link} target="_blank">
                        <time className="text-xs ml-2 mr-4 ">{DateFormat(stock.pubDate)}</time>
                        {stock.title}
                      </a>
                    </article>
                    )
                  })
                }
              </div>
              <div className="flex flex-col w-full mt-2">
                <h1 className="sm:text-xl text-4xl  font-bold text-white">Earnings News</h1>
                <div className="w-full flex flex-col mt-2">
                  {
                    earningsdata.items && 
                    earningsdata.items.map(stock => {
                      return(
                        <article className="flex border border-black cursor-pointer hover:border-white" 
                        key={stock.link}>
                        <a className="flex text-yellow-500 text-xs justify-between items-center md:text-sm lg:text-xl" 
                          href={stock.link} target="_blank">
                          <time className="text-xs ml-2 mr-4 ">{DateFormat(stock.pubDate)}</time>
                          {stock.title}
                        </a>
                      </article>
                      )
                    })
                  }
                </div>
              </div>
            </div>
        </div>
        <div className="flex justify-between flex-col mt-2 xl:w-5/12">
              <h1 className="text-4xl font-bold text-white hidden xl:inline-block">Market</h1>
              <div className="flex flex-col w-full">
                <h1 className="sm:text-xl text-4xl font-bold text-white xl:hidden">Most Gainer</h1>
                <WeeklyChart chartdata={gaindata}/>
              </div>
              <div className="flex flex-col w-full">
                <h1 className="sm:text-xl text-4xl font-bold text-white xl:hidden">Most Loser</h1>
                <WeeklyChart chartdata={losedata}/>
              </div>
            </div>  
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {

  const mainnews = await fetch(`${URL_NEWS}/biospace_industry`)
  const maindata = await mainnews.json()

  const earningsnews = await fetch(`${URL_NEWS}/biospace_earnings`)
  const earningsdata = await earningsnews.json()

  const gain = await fetch(`${URL_STOCK}/weekly?direction=-1`)
  const gaindata = {
    datasets: [{
      data: await gain.json(),
      parsing: {
        yAxisKey: 'one_week_relative_performance',
        xAxisKey: 'id'
      },
      backgroundColor: ["#fb8b1e"],} 
    ]
  };

  const lose = await fetch(`${URL_STOCK}/weekly?direction=1`)

  const losedata = {
    datasets: [{
      data: await lose.json(),
      parsing: {
        yAxisKey: 'one_week_relative_performance',
        xAxisKey: 'id'
      },
      backgroundColor: ["#fb8b1e"],} 
    ]
  }; 

  return {
    props: {
      maindata,
      earningsdata,
      gaindata,
      losedata
    }, 
    revalidate: 60*15
  }
}



