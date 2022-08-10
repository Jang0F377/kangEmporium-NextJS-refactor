import React, { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  calculateCartSubtotal,
  calculateTax,
  removeItemFromCart,
  selectCartItems,
} from "../features/cart/cartSlice";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { XIcon } from "@heroicons/react/outline";
import { urlFor } from "../sanity";
import test from "node:test";

const Header: React.FC = () => {
  const [drawer, setDrawer] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState(false);

  const cartItems = useAppSelector(selectCartItems);
  const cartSubtotal = useAppSelector(calculateCartSubtotal);
  const dispatch = useAppDispatch();

  function EmptyCart() {
    return (
      <div className="flex flex-col my-auto p-3 text-center ">
        <div className="text-2xl p-1 m-1  font-poppins">
          Your cart is currently empty.
        </div>
        <div className="text-2xl p-1 m-1 font-poppins">
          Start adding things to see them here!
        </div>
      </div>
    );
  }

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0);
  };
  return (
    <div className=" lg:max-w-screen-2xl mx-auto">
      <header className="bg-indigo-500 rounded-b text-white ">
        <nav className="mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex justify-between items-center  border-b border-black lg:border-none">
            <div className="flex">
              <a
                href={"/"}
                className="flex flex-col lg:text-lg md:flex-row md:text-2xl md:space-x-5 lg:flex-col lg:space-x-0 -my-2.5 hover:text-indigo-800 hover:scale-105 hover:-translate-y-0.5 xl:hover:-translate-y-1"
              >
                <div>Koach</div>
                <div>Kang&apos;s</div>
                <div>Emporium</div>
              </a>
            </div>
            <div className="hidden lg:flex-grow justify-evenly lg:flex items-center text-4xl ">
              <Link href="/">
                <div className="p-2 mx-2 hover:text-indigo-800 hover:cursor-pointer hover:scale-110 hover:-rotate-6">
                  Home
                </div>
              </Link>
              <Link href="/products">
                <div className="p-2 mx-2 hover:text-indigo-800 hover:cursor-pointer hover:scale-110 hover:-translate-y-1.5">
                  Products
                </div>
              </Link>
              <p
                onClick={() => setDrawer(true)}
                className="p-2 mx-2 hover:text-indigo-800 hover:cursor-pointer hover:scale-110 hover:rotate-6"
              >
                Cart
              </p>
            </div>
            <div className=" lg:ml-10 space-x-4">
              {authorizedUser ? (
                <button
                  type="button"
                  className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Logout &rarr;
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="inline-block bg-background-primary py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-transparent hover:text-white hover:border-white"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-transparent hover:text-white hover:border-white"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="py-4 flex flex-wrap justify-center items-center space-x-6 text-xl sm:text-2xl md:text-3xl lg:hidden">
            <Link href="/">
              <div className="p-2 mx-2 hover:text-indigo-800 hover:cursor-pointer hover:scale-110 hover:-rotate-6">
                Home
              </div>
            </Link>
            <Link href="/products">
              <div className="p-2 mx-2 hover:text-indigo-800 hover:cursor-pointer hover:scale-110 hover:-translate-y-1.5">
                Products
              </div>
            </Link>
            <p
              onClick={() => setDrawer(true)}
              className="p-2 mx-2 hover:text-indigo-800 hover:cursor-pointer hover:scale-110 hover:rotate-6"
            >
              Cart
            </p>
          </div>
        </nav>
      </header>

      <Transition.Root show={drawer} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-inter"
          onClose={() => setDrawer(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-2xl font-medium text-gray-900">
                            {" "}
                            Shopping cart{" "}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setDrawer(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {getCartCount() ? (
                                cartItems.map((product) => (
                                  <li
                                    key={product.product.title}
                                    className="flex py-6"
                                  >
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={urlFor(
                                          product.product.mainImage
                                        ).url()}
                                        alt={"ERR"}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3> {product.product.title}</h3>
                                          <p className="ml-4">
                                            ${product.product.price}
                                          </p>
                                        </div>
                                        {product.product.color ? (
                                          <p className="mt-1 text-sm text-gray-500">
                                            {product.product.color}
                                          </p>
                                        ) : null}
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">
                                          Qty {product.quantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            onClick={() => {
                                              dispatch(
                                                removeItemFromCart({
                                                  product: product.product,
                                                  quantity: product.quantity,
                                                })
                                              );
                                            }}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))
                              ) : (
                                <EmptyCart />
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>$ {cartSubtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link href={"/cart"}>
                            <button
                              onClick={() => setDrawer(false)}
                              className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Checkout
                            </button>
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setDrawer(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Header;
