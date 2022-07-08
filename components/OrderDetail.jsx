import { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';

const OrderDetail = ({ total, createOrder }) => {
  const [address, setAddress] = useState('');
  const [customer, setCustomer] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const newOrder = {
      customer,
      address,
      total,
      method: 0,
    };

    createOrder({ ...newOrder });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay $12 after delivery</h1>
        <div className={styles.item}>
          <label htmlFor='customer' className={styles.label}>
            Name Surname
          </label>
          <input
            type='text'
            id='customer'
            placeholder='John Doe'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='phone' className={styles.label}>
            Phone Number
          </label>
          <input
            type='tel'
            id='phone'
            placeholder='+1 234 567 89'
            className={styles.input}
            // onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='address' className={styles.label}>
            Address
          </label>
          <textarea
            id='address'
            placeholder='Elton St, 505 NY'
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
