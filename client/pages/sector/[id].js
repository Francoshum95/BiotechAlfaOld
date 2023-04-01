import Head from 'next/head';
import {URL_FMP} from '../../constants/baseURL';
import Sectortable from '../../components/Sectortable';
import SectorSelect from '../../components/pageselect/SectorSelect';



export default function Sector({sectordata}) {

  return (
    <div className="min-h-screen max-w-screen bg-black font-Roboto pb-10">
      <Head>
        <title>BiotechAlfa - Sector</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full bg-red-600 md:h-10 lg:h-10 h-7 flex items-center justify-between">
        <h1></h1>
        <SectorSelect/>
      </div>
      <Sectortable sector={sectordata}/>

    </div>
  )
}

export async function getServerSideProps(context) {
  const sector = await fetch(`${URL_FMP}/sector?sector=${context.params.id}`)

  const sectordata = await sector.json()
  
  if (!sectordata[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props:{
      sectordata
    }
  }
}
