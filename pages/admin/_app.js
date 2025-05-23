import React from 'react';
import { Toaster } from 'react-hot-toast';
import { StateContext } from '../context/StateContext';
import { Layout } from '../components';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
