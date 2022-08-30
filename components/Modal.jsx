import styles from '@/styles/Modal.module.css';

const Modal = ({ onClose, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => onClose(false)}>
          X
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
