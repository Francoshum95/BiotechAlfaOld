import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/Loader';
import {GlobalContext} from '../context/GlobalContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(false);
    useEffect(() => {
        const handleStart = () => { setPageLoading(true); };
        const handleComplete = () => { setPageLoading(false); };
    
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
      }, [router]);

  return (
    <GlobalContext>
      {
        pageLoading? (
          <Loader/>
        ) : 
        <Component {...pageProps} />
      }
    </GlobalContext>
  )
}

export default MyApp
