import Head from "next/head";
import BaseLayout from "../components/Layout/BaseLayout";
import Home from "../components/Home";

export default function HomePage() {
  return (
    <BaseLayout>
      <Head>
        <title>Home</title>
      </Head>
      <Home />
    </BaseLayout>
  );
}
