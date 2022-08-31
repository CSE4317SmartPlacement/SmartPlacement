import Head from 'next/head'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import { AuthContextProvider } from '../contexts/auth_context'


function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Head>
        <title>Smart Placement</title>
        <link rel="icon" href='/favicon.ico' />
      </Head>
      <Navbar key="navbar" />
        <div key="dynamic-data" className="dynamic-data" style={{ minHeight: "calc(100vh - 200px)" }}>
          <Component key="component" {...pageProps} />
        </div>
      <Footer key="footer" />
    </AuthContextProvider>
  )
}

export default MyApp
