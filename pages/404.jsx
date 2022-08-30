import Image from 'next/image';

import Meta from '@/components/Meta';
import styles from '@/styles/404.module.css';

const NotFound = () => {
  return (
    <>
      <Meta title='Page Not Found' />
      <div className={styles.container}>
        <Image src='/img/404.jpg' width={750} height={750} alt='Not Found' />
      </div>
    </>
  );
};

export default NotFound;
