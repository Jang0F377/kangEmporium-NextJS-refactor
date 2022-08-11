import { Product } from "../../typings";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { GetStaticProps } from "next";
import { useAppDispatch } from "../../hooks/hooks";
import React, { Fragment, useState } from "react";
import { addItemToCart } from "../../features/cart/cartSlice";
import {
  CheckCircleIcon,
  CheckIcon,
  StarIcon,
  XIcon,
} from "@heroicons/react/solid";
import { RadioGroup, Transition } from "@headlessui/react";
import { PortableText } from "@portabletext/react";
import { Comment } from "postcss";
import Comments from "../../components/Comments";

interface ProductSlugProps {
  product: Product;
}

function Product({ product }: ProductSlugProps) {
  const reviews = { average: 4, totalCount: 1624 };
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState(
    product.size ? product.size[0] : { _key: "", description: "", name: "" }
  );
  const [show, setShow] = useState(false);
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const handleClick = () => {
    dispatch(
      addItemToCart({
        product: {
          ...product,
          size: [selectedSize],
        },
        quantity: 1,
      })
    );
    setShow(true);
    wait(1250).then(() => setShow(false));
  };
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="h-full lg:pb-10">
      <div className="mx-auto px-4 sm:py-16 w-11/12 lg:w-9/12 sm:px-6 bg-gray-200 lg:px-8 rounded mt-10 lg:mb-20 lg:py-8">
        {product ? (
          <div>
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
              {/* product details */}
              <div className="lg:max-w-lg lg:self-end">
                <div className="mt-4">
                  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    {product.title}
                  </h1>
                </div>

                <section aria-labelledby="information-heading" className="mt-4">
                  <h2 id="information-heading" className="sr-only">
                    Product information
                  </h2>

                  <div className="flex  items-center">
                    <p className="text-gray-900 sm:text-xl">${product.price}</p>

                    <div className="ml-4 pl-4 border-l border-gray-300">
                      <h2 className="sr-only">Reviews</h2>
                      <div className="flex products-center">
                        <div>
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  reviews.average > rating
                                    ? "text-yellow-400"
                                    : "text-gray-300",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">
                            {reviews.average} out of 5 stars
                          </p>
                        </div>
                        <p className="ml-2 text-sm text-gray-500">
                          {reviews.totalCount} reviews
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex text-sm font-medium lg:text-base text-left  p-1 m-1">
                    <PortableText value={product.body.en} />
                  </div>

                  <div className="mt-6 flex products-center">
                    <CheckIcon
                      className="flex-shrink-0 w-5 h-5 text-green-500"
                      aria-hidden="true"
                    />
                    <p className="ml-2 text-sm text-gray-500">
                      In stock and ready to ship
                    </p>
                  </div>
                </section>
              </div>

              {/* product image */}
              <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                  <img
                    src={urlFor(product.mainImage).url()}
                    alt={"ERR"}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              </div>

              {/* product form */}
              <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                <section aria-labelledby="options-heading">
                  <h2 id="options-heading" className="sr-only">
                    Product options
                  </h2>

                  <form>
                    <div className="sm:flex sm:justify-between">
                      {/* Size selector */}
                      {product.size != undefined || null ? (
                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                        >
                          <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                            Size
                          </RadioGroup.Label>
                          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {product.size.map((s) => (
                              <RadioGroup.Option
                                as="div"
                                key={s.name}
                                value={s}
                                className={({ active }) =>
                                  classNames(
                                    active ? "ring-2 ring-indigo-500" : "",
                                    "relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none"
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label
                                      as="p"
                                      className="text-base font-medium text-gray-900"
                                    >
                                      {s.name}
                                    </RadioGroup.Label>
                                    {s.description ? (
                                      <RadioGroup.Description
                                        as="p"
                                        className="mt-1 text-sm text-gray-500"
                                      >
                                        {s.description}
                                      </RadioGroup.Description>
                                    ) : null}

                                    <div
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-indigo-500"
                                          : "border-transparent",
                                        "absolute -inset-px rounded-lg pointer-events-none"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      ) : (
                        <div />
                      )}
                    </div>
                    <div className="mt-10">
                      <button
                        type={"button"}
                        onClick={handleClick}
                        className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                      >
                        Add to bag
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
            <Comments comments={product.comments} _id={product._id} />
          </div>
        ) : (
          <div>ERROR</div>
        )}
        <div
          aria-live="assertive"
          className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
        >
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            <Transition
              show={show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        Added to Cart
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        type="button"
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
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
  'comments': *[
    _type == "comment" && product._ref == ^._id && approved == true
  ]
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
