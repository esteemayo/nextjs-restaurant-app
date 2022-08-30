import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import styles from '@/styles/Add.module.css';
import { getProduct, updateProduct } from '@/services/productService';

const Edit = ({ setClose, isSelected }) => {
  const [id, setId] = useState(null);
  const [desc, setDesc] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [extra, setExtra] = useState(null);
  const [prices, setPrices] = useState([]);
  const [product, setProduct] = useState({});
  const [extraOptions, setExtraOptions] = useState([]);

  const handleChangePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = Number(e.target.value);
    setPrices(currentPrices);
  };

  const handleExtraInput = ({ target: input }) => {
    const { name, type, value } = input;
    if (type === 'number') value = Number(value);

    setExtra({ ...extra, [name]: value });
  };

  const handleDeleteExtra = (id, itemIndex) => {
    setExtraOptions(
      extraOptions.filter(
        (item, index) => item._id !== id || index !== itemIndex
      )
    );
  };

  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/learnhowtocode/image/upload',
        data
      );
      const { url } = res.data;

      const updatedProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await updateProduct(id, { ...updatedProduct });
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProduct(isSelected);
        setProduct(data);
        setId(data._id);
        setTitle(data.title);
        setDesc(data.desc);
        setPrices(data.prices);
        setExtraOptions(data.extraOptions);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [isSelected]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Update {product.title}</h1>
        <div className={`${styles.item}`}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              {product.img && (
                <Image
                  src={file ? URL.createObjectURL(file) : product.img}
                  width={50}
                  height={50}
                  objectFit='cover'
                  alt={product.title}
                />
              )}
            </div>
            <div className={styles.fileInput}>
              <label htmlFor='file' className={styles.label}>
                Choose an image
              </label>
              <input
                type='file'
                id='file'
                style={{ display: 'none' }}
                className={`${styles.input} ${styles.formInput}`}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor='title' className={styles.label}>
            Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='desc' className={styles.label}>
            Description
          </label>
          <textarea
            id='desc'
            value={desc}
            rows={4}
            className={styles.textarea}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.item}>
          <label htmlFor='prices' className={styles.label}>
            Prices
          </label>
          <div className={styles.priceContainer}>
            <input
              id='prices'
              type='number'
              placeholder={prices[0]}
              onChange={(e) => handleChangePrice(e, 0)}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <input
              type='number'
              placeholder={prices[1]}
              onChange={(e) => handleChangePrice(e, 1)}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <input
              type='number'
              placeholder={prices[2]}
              onChange={(e) => handleChangePrice(e, 2)}
              className={`${styles.input} ${styles.inputSm}`}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor='extra' className={styles.label}>
            Extra
          </label>
          <div className={styles.extra}>
            <input
              id='extra'
              type='text'
              name='text'
              placeholder='Item'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={handleExtraInput}
            />
            <input
              type='number'
              name='price'
              placeholder='Price'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={handleExtraInput}
            />
            <button
              className={styles.extraButton}
              disabled={extra === null}
              onClick={handleExtra}
            >
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((item, index) => {
              return (
                <span key={item.text} className={styles.extraItemUpdate}>
                  <span
                    className={styles.deleteItem}
                    onClick={() => handleDeleteExtra(item._id, index)}
                  >
                    x
                  </span>
                  {item.text}
                </span>
              );
            })}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Edit;
