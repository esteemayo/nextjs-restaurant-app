import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/PizzaCard.module.css';

const PizzaCard = ({ _id: id, img, desc, title, prices }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${id}`} passHref>
        <Image src={img} alt='' width='500' height='500' />
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.price}>${prices[0]}</span>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};

export default PizzaCard;
