import Head from "next/head";
import Header from "../components/Header";
import { CartItem, Product } from "../typings";
import { GetServerSideProps } from "next";
import { sanityClient } from "../sanity";
import Newsletter from "../components/Newsletter";
import Contact from "../components/Contact";
import HomeComponent from "../components/HomeComponent";

interface GetProductProps {
  products: Array<Product>;
}

const Home = ({ products }: GetProductProps) => {
  return (
    <>
      <Head>
        <title>The Emporium</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HomeComponent products={products} />
      <Newsletter />
      <Contact />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "product" && onSale == true]{
  _id,
  title,
  price,
  mainImage,
  slug,
  color,
  size,
  countInStock,
  body,
  onSale,
}`;
  const products = await sanityClient.fetch(query);

  return {
    props: {
      products,
    },
  };
};
