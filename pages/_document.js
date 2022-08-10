import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang={"en"}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="font-inter ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
