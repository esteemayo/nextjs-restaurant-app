import { useState } from 'react';

import Featured from '@/components/Featured';
import Add from '@/components/Add';
import AddButton from '@/components/AddButton';
import PizzaList from '@/components/PizzaList';
import { getProducts } from '@/services/productService';
import styles from '@/styles/Home.module.css';

export default function Home({ products, admin }) {
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
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
