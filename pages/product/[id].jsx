import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Meta from '@/components/Meta';
import excerpts from '@/utils/index';
import styles from '@/styles/Product.module.css';
import { addProduct } from '@/features/cart/cartSlice';
import { getProduct, getProducts } from '@/services/productService';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.prices[0]);

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = product.prices[sizeIndex] - product.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, extras, price, quantity }));
  };

  return (
    <>
      <Meta title={product.title} description={excerpts(product.desc, 100)} />
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imgContainer}>
            <Image src={product.img} objectFit='contain' layout='fill' alt='' />
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{product.title}</h1>
          <span className={styles.price}>${price}</span>
          <p className={styles.desc}>{product.desc}</p>
          <h3 className={styles.choose}>Choose the size</h3>
          <div className={styles.sizes}>
            <div className={styles.size} onClick={() => handleSize(0)}>
              <Image src='/img/size.png' layout='fill' alt='' />
              <span className={styles.number}>Small</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(1)}>
              <Image src='/img/size.png' layout='fill' alt='' />
              <span className={styles.number}>Medium</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(2)}>
              <Image src='/img/size.png' layout='fill' alt='' />
              <span className={styles.number}>Large</span>
            </div>
          </div>
          <h3 className={styles.choose}>Choose additional ingredients</h3>
          <div className={styles.ingredients}>
            {product.extraOptions.map((option) => {
              return (
                <div key={option._id} className={styles.option}>
                  <input
                    type='checkbox'
                    id={option.text}
                    name={option.text}
                    className={styles.checkbox}
                    onChange={(e) => handleChange(e, option)}
                  />
                  <label htmlFor={option.text}>{option.text}</label>
                </div>
              );
            })}
          </div>
          <div className={styles.add}>
            <input
              type='number'
              defaultValue={1}
              className={styles.quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={handleClick} className={styles.button}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: product } = await getProduct(id);

  return {
    props: {
      product,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const { data: products } = await getProducts();

  const ids = products.map((product) => product._id);
  const paths = ids.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Product;
