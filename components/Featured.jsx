import Image from 'next/image';
import { useState } from 'react';

import styles from '@/styles/Featured.module.css';

const Featured = () => {
  const [index, setIndex] = useState(0);

  const handleArrow = (direction) => {
    if (direction === 'left') {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === 'right') {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  const images = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ];

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        onClick={() => handleArrow('left')}
        style={{ left: 0 }}
      >
        <Image src='/img/arrowl.png' alt='' layout='fill' objectFit='contain' />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, index) => {
          return (
            <div key={index} className={styles.imgContainer}>
              <Image src={img} alt='' layout='fill' objectFit='contain' />
            </div>
          );
        })}
      </div>
      <div
        className={styles.arrowContainer}
        onClick={() => handleArrow('right')}
        style={{ right: 0 }}
      >
        <Image src='/img/arrowr.png' alt='' layout='fill' objectFit='contain' />
      </div>
    </div>
  );
};

export default Featured;
