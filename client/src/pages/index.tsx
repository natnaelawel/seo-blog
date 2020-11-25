import Head from "next/head";
import NavBar from "../components/NavBar";

export default function Home() {
  const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

  return (
    <div className="dark:text-white mx-auto">
      <Head>
        <title>Home</title>
      </Head>
      <NavBar/>
      <h1 className="dark:text-white text-yellow-500">Hello world</h1>
    </div>
  );
}
