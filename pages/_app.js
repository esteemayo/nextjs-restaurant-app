import { Provider } from 'react-redux';

import store from '@/features/store';
import Layout from '@/components/Layout';
import BackToTop from '@/components/BackToTop';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <BackToTop />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
