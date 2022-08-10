import { Product } from "../../typings";
import Header from "../../components/Header";
import { sanityClient } from "../../sanity";
import { GetStaticProps } from "next";

interface ProductSlugProps {
  product: Product;
}

function Product({ product }: ProductSlugProps) {
  console.log(product);
  return (
    <div>
      <Header />
    </div>
  );
}

export default Product;

export async function getStaticPaths() {
  const query = `*[_type == "product"]{
  _id,
  slug {
  current
}
}`;

  const products = await sanityClient.fetch(query);
  const paths = products.map((product: Product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "product" && slug.current == $slug][0]{
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
  const product = await sanityClient.fetch(query, { slug: params?.slug });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
    revalidate: 3600,
  };
};
