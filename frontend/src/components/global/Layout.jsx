/* eslint-disable react/prop-types */
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (

  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 p-4 sm:p-8">{children}</main>
    <Footer />
  </div>
);

export default Layout;
