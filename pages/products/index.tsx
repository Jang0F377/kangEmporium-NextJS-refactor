import { Product } from "../../typings";
import Header from "../../components/Header";
import RenderProductCard from "../../components/RenderProductCard";
import { GetServerSideProps } from "next";
import { sanityClient } from "../../sanity";

interface ProductsPageProps {
  products: Array<Product>;
}

function Products({ products }: ProductsPageProps) {
  return (
    <div className="bg-color-primary-variant bg-main">
      <Header />
      <div className=" xl:max-w-[90rem]  mx-auto pb-20">
        <h2 className="sr-only">Products</h2>
        <div className="text-center pb-4 mb-4 text-4xl lg:text-7xl underline  mt-10">
          Products
        </div>
        <div className="grid grid-cols-1 gap-y-4 mx-2 lg:mx-2.5  md:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <RenderProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "product"]{
  _id,
  title,
  price,
  mainImage,
  slug,
  color,
  size,
  countInStock,
  body,
  onSale
}`;
  const products = await sanityClient.fetch(query);

  return {
    props: {
      products,
    },
  };
};
