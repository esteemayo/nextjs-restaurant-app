import Head from 'next/head';

import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import { getProducts } from '../services/productService';

import styles from '../styles/Home.module.css';

export default function Home({ products }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name='description' content='Best pizza shop in town' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      <PizzaList products={products} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data: products } = await getProducts();
  return {
    props: {
      products,
    },
  };
};
