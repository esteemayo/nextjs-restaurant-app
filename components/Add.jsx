import axios from 'axios';
import { useState } from 'react';

import { createProduct } from '../services/productService';

import styles from '../styles/Add.module.css';

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(null);
  const [title, setTitle] = useState(null);
  const [extra, setExtra] = useState(null);
  const [prices, setPrices] = useState([]);
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

  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uploads');

    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/learnhowtocode/image/upload',
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await createProduct({ ...newProduct });
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label htmlFor='file' className={styles.label}>
            Choose an image
          </label>
          <input
            type='file'
            id='file'
            className={styles.input}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='title' className={styles.label}>
            Title
          </label>
          <input
            type='text'
            id='title'
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='desc' className={styles.label}>
            Description
          </label>
          <textarea
            id='desc'
            rows={4}
            className={styles.textarea}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              type='number'
              placeholder='Small'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={(e) => handleChangePrice(e, 0)}
            />
            <input
              type='number'
              placeholder='Medium'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={(e) => handleChangePrice(e, 1)}
            />
            <input
              type='number'
              placeholder='Large'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={(e) => handleChangePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor='extra' className={styles.label}>
            Extra
          </label>
          <div className={styles.extra}>
            <input
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
            {extraOptions.map((item) => {
              return (
                <span key={item.text} className={styles.extraItem}>
                  {item.text}
                </span>
              );
            })}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
