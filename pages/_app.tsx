import 'antd/dist/antd.css';
import '../styles/globals.css'

import { AppLayout } from '../layouts/AppLayout'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
