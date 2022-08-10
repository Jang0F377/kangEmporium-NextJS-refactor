import React from "react";
import { Product } from "../typings";
import Image from "next/image";
import { urlFor } from "../sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

interface RenderProductCardProps {
  product: Product;
}

function RenderProductCard({ product }: RenderProductCardProps) {
  return (
    <Link href={`/products/${product.slug.current}`}>
      <div
        key={product._id}
        className="group relative bg-white border border-gray-200 rounded flex flex-col cursor-pointer"
      >
        <div className="flex object-center object-cover rounded aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96 ">
          <img
            src={urlFor(product.mainImage).url()}
            alt={"ALT"}
            className="rounded"
          />
        </div>
        <div className=" flex p-4 space-y-2 flex flex-col">
          <h3 className="text-base lg:text-lg text-center font-semibold text-indigo-700">
            <div>{product.title}</div>
          </h3>
          <div className="flex text-sm font-medium lg:text-base text-left  p-1 m-1">
            <PortableText value={product.body.en} />
          </div>
          <div className="flex flex-col p-1">
            <p className="absolute bottom-0.5 p-1 right-2 text-base lg:text-lg font-medium text-indigo-700">
              $ {product.price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RenderProductCard;
