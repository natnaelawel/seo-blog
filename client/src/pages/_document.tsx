import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="dark">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="Next js exercise" />
          <meta name="keywords" content="next js seo blog with tailwindcss" />
          <meta name="author" content="Nathaniel Hussein" />
        </Head>
        <body className="bg-white dark:bg-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
