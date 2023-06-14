import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Layout } from '@/components/layout'
import getCategoryData from '@/lib/getCategoryData'
import getBrandsData from '@/lib/getBrandsData'
import { getSession } from 'next-auth/react'
import { useLanguage } from '@/hooks/useLanguage'

import { Poppins } from 'next/font/google';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head'
const poppins = Poppins({
  weight: '300',
  subsets: ['latin'],
});

type TProps = AppProps & {
  data: any,
  brands_data: any,
  session: any,
  userAddrData: any
};


const App = ({ Component, data, brands_data, pageProps }: TProps) => {

  const getDirection = (lang: any) => {
    if (lang === "ar") {
      return "rtl"
    }
    return "ltl"
  }

  const { t, locale } = useLanguage();
  return (
    <>
      <Head>
        <title>Life Pharmacy UAE - Online Pharmacy Delivery in 30 minutes</title>
      </Head>
      <NextNProgress color="#eba834" />
      <SessionProvider >
        <main dir={getDirection(locale)} className={poppins.className}>
          <Layout data={data} brands_data={brands_data}  isArabic={false} lang={locale ? locale : "en"} langData={t} >
            <Component {...pageProps} />
          </Layout>
        </main>
      </SessionProvider></>

  )

}

App.getInitialProps = async (context: any) => {

  const data = await getCategoryData()

  const brands_data = await getBrandsData(false)

  // const session = await getSession(context);
  // var userAddrData = {
  //   data: {
  //     addresses: []
  //   }
  // };
  // if (session) {
  //   const userAddrheaderRes = await fetch('https://prodapp.lifepharmacy.com/api/user/addresses', {
  //     headers: {
  //       Authorization: `Bearer ${session.token.token}`
  //     }
  //   });
  //   userAddrData = await userAddrheaderRes.json();
  // }
  return {
    data,
    brands_data
  };
};

export default App;