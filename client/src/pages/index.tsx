import Head from "next/head";
import BaseLayout from "../components/Layout/BaseLayout";

export default function Home() {

  return (
    <BaseLayout>
      <Head>
        <title>Home</title>
      </Head>
      <h1 className="dark:text-white text-yellow-500">Hello world</h1>
    </BaseLayout>
  );
}
