import Head from "next/head";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

function BaseLayout({ children }) {
  return (
    <div  className="dark:text-white mx-auto flex flex-col relative min-h-screen">
      <Head>Blogs Page</Head>
      <NavBar />
      <div className="flex-1">

      {children}
      </div>
      <Footer/>
    </div>
  );
}

export default BaseLayout;
