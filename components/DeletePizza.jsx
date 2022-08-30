import styles from '@/styles/DeletePizza.module.css';

const DeletePizza = ({ title, onClose, onDelete, isSelected }) => {
  return (
    <>
      <div className={styles.header}>
        <h1>Delete Product?</h1>
      </div>
      <div className={styles.body}>
        <p>Are you sure that you want to delete &apos;{title}&apos; pizza?</p>
      </div>
      <div className={styles.footer}>
        <button
          className={`${styles.btn} ${styles.btnCancel}`}
          onClick={() => onClose(false)}
        >
          Cancel
        </button>
        <button
          className={`${styles.btn} ${styles.btnDelete}`}
          onClick={() => onDelete(isSelected)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DeletePizza;
