import Footer from "../Components/Footer";

import Navbar from "../Components/Navbar";

function HomeLayout({ children }) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}

export default HomeLayout;
