import Image from 'next/image';
import { useState } from 'react';

import excerpts from '../../utils';
import { getOrders, updateOrder } from '../../services/orderService';
import { deleteProduct, getProducts } from '../../services/productService';

import styles from '../../styles/Admin.module.css';

const Admin = ({ orders, products }) => {
  const [orderList, setOrderList] = useState(orders);
  const [productList, setProductList] = useState(products);

  const status = ['preparing', 'on the way', 'delivered'];

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProductList(products.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    const updatedOrder = {
      status: currentStatus + 1,
    };

    try {
      const { data } = await updateOrder(id, updatedOrder);
      setOrderList([data, ...orderList.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item) => {
              const { _id: id, img, prices, title } = item;
              return (
                <tr className={styles.trTitle} key={id}>
                  <td>
                    <Image
                      src={img}
                      width={50}
                      height={50}
                      objectFit='cover'
                      alt=''
                    />
                  </td>
                  <td>{excerpts(id, 5)}</td>
                  <td>{title}</td>
                  <td>${prices[0]}</td>
                  <td>
                    <button className={styles.button}>Edit</button>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((item) => {
              return (
                <tr className={styles.trTitle} key={item._id}>
                  <td>{excerpts(item._id, 5)}</td>
                  <td>{item.customer}</td>
                  <td>${item.total}</td>
                  <td>
                    {item.method === 0 ? <span>cash</span> : <span>paid</span>}
                  </td>
                  <td>{status[item.status]}</td>
                  <td>
                    <button
                      onClick={() => handleStatus(item._id)}
                      disabled={item.status === 2}
                      className={styles.btnOrder}
                    >
                      Next stage
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';

  if (myCookie.token !== process.env.NEXT_PUBLIC_TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  const { data: orders } = await getOrders();
  const { data: products } = await getProducts();

  return {
    props: {
      orders,
      products,
    },
  };
};

export default Admin;