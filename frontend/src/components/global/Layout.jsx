/* eslint-disable react/prop-types */
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="min-h-screen  flex flex-col">
    <Header />
    <main className="flex-1 container mx-auto py-8 px-4 sm:px-8">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
