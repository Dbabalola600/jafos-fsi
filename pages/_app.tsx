import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/nprogress.css'
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dotenv from 'dotenv';



dotenv.config();
function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  // loading bar 
  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());

    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  }, []);
  return <Component {...pageProps} />

  
}

export default MyApp
