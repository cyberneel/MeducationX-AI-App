import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className='p-2'>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
