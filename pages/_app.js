import Layout from "../layout";
import "../public/assets/scss/admin.scss";
import { ToastContainer } from 'react-toastify';
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

  return (
    <>
      <Head>
        <title>E-Home Lessor page</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,500,500i,600,600i,700,700i,800,800i" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i" rel="stylesheet" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer theme="light" />
      <Analytics /> 
    </>
  );
}

export default MyApp;
