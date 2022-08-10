import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  addItemToCart,
  calculateCartSubtotal,
  calculateTax,
  removeItemFromCart,
  selectCartItems,
} from "../../features/cart/cartSlice";
import { CartItem, Product } from "../../typings";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import { urlFor } from "../../sanity";
import Link from "next/link";
import { ThunkDispatch } from "redux-thunk";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
}

interface CartScreenListItem {
  product: CartItem;
  dispatch: ThunkDispatch<any, undefined, any>;
}

function Cart() {
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(calculateCartSubtotal);
  const tax = useAppSelector(calculateTax);
  const anythingInCart = cartItems.length;
  const dispatch = useAppDispatch();

  const EmptyCart = () => {
    return (
      <div className="flex flex-col font-inter my-auto p-3 text-center">
        <div className="text-3xl ">Your cart is currently empty.</div>
        <div className="text-3xl ">Start adding things to see them here!</div>
      </div>
    );
  };
  return (
    <div className="h-screen mx-auto lg:w-9/12 mt-5 lg:mt-10">
      <div className="bg-white rounded mt-5 mx-4 sm:mx-6 lg:m-10 p-2 sm:p-6 lg:p-10">
        <h1 className="text-3xl font-inter font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200 ">
              {anythingInCart ? (
                cartItems.map((item) => (
                  <CartScreenListComp
                    key={item.product._id}
                    product={item}
                    dispatch={dispatch}
                  />
                ))
              ) : (
                <EmptyCart />
              )}
            </ul>
          </section>
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <CartScreenOrderSummary subtotal={subtotal} tax={Number(tax)} />
          </section>
        </form>
      </div>
    </div>
  );
}

export default Cart;

const CartScreenListComp = ({ product, dispatch }: CartScreenListItem) => {
  return (
    <li key={product.product._id} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <img
          src={urlFor(product.product.mainImage).url()}
          alt={"ERR"}
          className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <Link href={`/products/${product.product.slug.current}`}>
                <h3 className="text-sm md:text-base">
                  <div className="font-medium text-gray-700 hover:text-gray-800 hover:cursor-pointer">
                    {product.product.title}
                  </div>
                </h3>
              </Link>
            </div>
            <div className="mt-1 flex text-sm md:text-base">
              {product.product.color ? (
                <p className="text-gray-500">{product.product.color}</p>
              ) : (
                <div />
              )}
              {product.product.size[0].name != undefined || null ? (
                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                  {product.product.size[0].name}
                </p>
              ) : (
                <div />
              )}
            </div>
            <p className="mt-1 text-sm md:text-base font-medium text-gray-900">
              $ {product.product.price}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label
              htmlFor={`quantity-${product.product.title}`}
              className="sr-only"
            >
              Quantity, {product.product.title}
            </label>
            <div className="w-fit p-1.5 md:text-base font-medium text-gray-700 text-left text-sm">
              {product.quantity}
            </div>
            <div className="absolute right-0 top-0">
              <button
                type="button"
                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row relative">
          <p className="mt-4 flex text-sm text-gray-700 space-x-2">
            {product.product.countInStock ? (
              <CheckIcon
                className="flex-shrink-0 h-5 w-5 text-green-500"
                aria-hidden="true"
              />
            ) : (
              <ClockIcon
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                aria-hidden="true"
              />
            )}

            <span>
              {product.product.countInStock ? "In stock" : `Ships in 3-4 weeks`}
            </span>
          </p>
          <div className="flex flex-col absolute bottom-8 gap-y-1.5 md:bottom-0 right-1 md:gap-y-3">
            <button
              type="button"
              className="text-sm font-medium text-indigo-500 hover:text-indigo-800"
              onClick={() => {
                dispatch(
                  addItemToCart({
                    product: product.product,
                    quantity: product.quantity,
                  })
                );
              }}
            >
              <span>Add</span>
            </button>
            <button
              type="button"
              className="text-sm font-medium px-1 text-indigo-500 hover:text-indigo-800 "
              onClick={() => {
                dispatch(
                  removeItemFromCart({
                    product: product.product,
                    quantity: product.quantity,
                  })
                );
              }}
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

function CartScreenOrderSummary({ tax, subtotal }: CartSummaryProps) {
  return (
    <div className="">
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">$ {subtotal}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
            <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">
                Learn more about how shipping is calculated
              </span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </dt>
          <dd className="text-sm font-medium text-gray-900"></dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="flex text-sm text-gray-600">
            <span>Tax estimate</span>
            <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">
                Learn more about how tax is calculated
              </span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </dt>
          <dd className="text-sm font-medium text-gray-900">$ {tax}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="text-base font-medium text-gray-900">Order total</dt>
          <dd className="text-base font-medium text-gray-900">
            $ {(tax + subtotal).toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <Link href="/checkout">
          <button
            type={"submit"}
            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
