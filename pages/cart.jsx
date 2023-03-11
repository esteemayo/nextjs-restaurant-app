import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import Meta from '@/components/Meta';
import styles from '@/styles/Cart.module.css';
import { reset } from '@/features/cart/cartSlice';
import OrderDetail from '@/components/OrderDetail';
import { createNewOrder } from '@/services/orderService';

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { products, total } = useSelector((state) => ({ ...state.cart }));

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const amount = total;
  const currency = 'USD';
  const style = { layout: 'vertical' };

  const createOrder = async (dataObj) => {
    try {
      const { data, status } = await createNewOrder(dataObj);

      if (status === 201) {
        dispatch(reset());
        router.push(`/orders/${data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  if (products.length < 1) {
    return (
      <div className={styles.empty} style={{ height: 'calc(80vh - 10rem)' }}>
        <h1 style={{ textAlign: 'center' }}>Your cart is currently empty!</h1>
      </div>
    );
  }

  return (
    <>
      <Meta title='Cart' />
      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => {
                const { img, title, price, extras, quantity } = item;
                return (
                  <tr key={index} className={styles.tr}>
                    <td>
                      <div className={styles.imgContainer}>
                        <Image
                          src={img}
                          layout='fill'
                          objectFit='cover'
                          alt=''
                        />
                      </div>
                    </td>
                    <td>
                      <span className={styles.name}>{title}</span>
                    </td>
                    <td>
                      {extras?.length > 0 ? (
                        <span className={styles.extras}>
                          {extras.map((extra) => {
                            return <span key={extra._id}>{extra.text}, </span>;
                          })}
                        </span>
                      ) : (
                        <span>&mdash;&mdash;&mdash;</span>
                      )}
                    </td>
                    <td>
                      <span className={styles.price}>${price}</span>
                    </td>
                    <td>
                      <span className={styles.quantity}>{quantity}</span>
                    </td>
                    <td>
                      <span className={styles.total}>
                        ${parseFloat(price * quantity).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>$
              {parseFloat(total).toFixed(2)}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>$
              {parseFloat(total).toFixed(2)}
            </div>
            {open ? (
              <div className={styles.paymentMethods}>
                <button
                  className={styles.payButton}
                  onClick={() => setCash(true)}
                >
                  CASH ON DELIVERY
                </button>
                <PayPalScriptProvider
                  options={{
                    'client-id':
                      'AXJ2ypD8R2JOJPTAEUyTTBlJxe_UQqxvj_TcImf3uCKHuNGXr7RU0gkOYl_EtiAyklMWcNEAqrt4migY',
                    components: 'buttons',
                    currency: 'USD',
                    'disable-funding': 'credit,card,p24',
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button onClick={() => setOpen(true)} className={styles.button}>
                CHECKOUT NOW!
              </button>
            )}
          </div>
        </div>
        {cash && <OrderDetail total={total} createOrder={createOrder} />}
      </div>
    </>
  );
};

export default Cart;
