import PizzaCard from './PizzaCard';
import styles from '@/styles/PizzaList.module.css';

const PizzaList = ({ products }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The best pizza in town</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam iste in
        qui vitae, amet enim officia omnis odio nesciunt pariatur sit? Eum
        quidem repellat amet accusamus libero nam quae hic.
      </p>
      <div className={styles.wrapper}>
        {products.map((item) => {
          return <PizzaCard key={item._id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default PizzaList;
