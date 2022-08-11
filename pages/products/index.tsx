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
    <>
      <div className=" xl:max-w-[90rem]  mx-auto pb-20">
        <div className="bg-indigo-400 my-7 py-1.5 max-w-xs md:my-14 xl:my-20 rounded-full md:max-w-sm lg:max-w-md xl:max-w-xl mx-auto md:py-2  lg:py-4 text-white hover:text-black">
          <h2 className="sr-only">Products</h2>
          <div className="text-center text-3xl md:text-5xl lg:text-7xl underline">
            Products
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-4 mx-2 lg:mx-2.5  md:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <RenderProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
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
