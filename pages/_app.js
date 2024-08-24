import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    if (typeof document !== undefined) {
      require('bootstrap/dist/js/bootstrap');
    }
  }, [router.events]);

  return (
    <>
    <Head>
      <script>
        console.log("kk");
      </script>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
    );
}
export default MyApp;
