import Head from 'next/head';
import { useState } from 'react';

import Add from '@/components/Add';
import Featured from '@/components/Featured';
import styles from '@/styles/Home.module.css';
import AddButton from '@/components/AddButton';
import PizzaList from '@/components/PizzaList';
import { getProducts } from '@/services/productService';

export default function Home({ products, admin }) {
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name='description' content='Best pizza shop in town' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList products={products} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  let admin = false;

  if (myCookie.token === process.env.NEXT_PUBLIC_TOKEN) {
    admin = true;
  }

  const { data: products } = await getProducts();
  return {
    props: {
      products,
      admin,
    },
  };
};
