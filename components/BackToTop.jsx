import { useEffect, useState } from 'react';
import styles from '@/styles/BackToTop.module.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 250 ? true : false);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);
    return () => document.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={styles.scroll}>
      {isVisible && (
        <div className={styles.icon} onClick={handleBackToTop}>
          △
        </div>
      )}
    </div>
  );
};

export default BackToTop;
