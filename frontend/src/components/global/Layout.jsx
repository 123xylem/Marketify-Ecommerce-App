/* eslint-disable react/prop-types */
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="min-h-screen  flex flex-col">
    <Header />
    <main className="flex-1 relative container mx-auto py-8 px-4 sm:px-8 min-h-[90vh]">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
