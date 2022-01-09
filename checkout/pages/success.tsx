import axios from 'axios';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import constants from '../constants';
import Layout from '../components/Layout';

const Success = () => {
  const router = useRouter();
  const { source } = router.query;

  useEffect(() => {
    if (source !== undefined) {
      (async () => {
        await axios.post(`${constants.endpoint}/orders/confirm`, {
          source,
        });
      })();
    }
  }, [source]);
  return (
    <Layout>
      <div className='py-5 text-center'>
        <h2>Success</h2>
        <p className='lead'>your purchase was successful!</p>
      </div>
    </Layout>
  );
};

export default Success;
