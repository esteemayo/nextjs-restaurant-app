import { ToastContainer } from 'react-toastify';

import Footer from './Footer';
import Meta from './Meta';
import Navbar from './Navbar';

import 'react-toastify/dist/ReactToastify.min.css';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Navbar />
      <ToastContainer />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
