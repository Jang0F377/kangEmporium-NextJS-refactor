import { Product } from "../typings";
import Link from "next/link";
import RenderProductCard from "./RenderProductCard";

interface HomePageProps {
  products: Array<Product>;
}

function HomeComponent({ products }: HomePageProps) {
  return (
    <div className="max-w-7xl  mx-auto text-center pt-10">
      <div className="bg-white mx-2 rounded-full  lg:p-5 xl:p-8 text-indigo-500">
        <h1 className="text-center mb-2 p-1 xl:tracking-wide xl:pb-4 xl:mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-7xl underline ">
          Welcome
        </h1>
        <div className="text-center md:text-3xl my-2 xl:text-4xl xl:mb-4 xl:mt-4">
          Check out our <Link href="/products">Products</Link> page to see our
          complete stock!
        </div>
      </div>
      <div>
        <div className="text-center text-background-primary text-2xl lg:text-4xl mt-6 mb-6 lg:mt-16">
          Have a look at what&apos;s on sale today:
        </div>
        <div className="grid grid-cols-1 gap-y-4 mx-3  md:grid-cols-2 md:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <RenderProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
