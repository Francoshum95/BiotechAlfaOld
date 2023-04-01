import Head from 'next/head';
import ErrorSelect from '../components/pageselect/ErrorSelect';
import Restricted from '../components/Restricted';


export default function Custom404() {
  return (
    <div className="min-h-screen max-w-screen bg-black font-Roboto pb-5">
      <Head>
        <title>BiotechAlfa - 404 </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full bg-red-600 md:h-10 lg:h-10 h-7 flex items-center justify-between">
        <div className="ml-11">
          <ErrorSelect/>
        </div>
      </div>
      <header className="select-none flex flex-col text-center my-[15rem]">
        <h1 className="text-white text-[3rem] font-semibold h-[5rem]">BiotechAlfa</h1>
        <h2 className="text-white text-[1.7rem] font-semibold">404 Not Found </h2>
        <Restricted/>
      </header>
    </div>
  )
}