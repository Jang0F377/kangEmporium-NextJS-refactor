import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  addItemToCart,
  calculateCartSubtotal,
  calculateTax,
  removeItemFromCart,
  selectCartItems,
} from "../../features/cart/cartSlice";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import { urlFor } from "../../sanity";
import { useRouter } from "next/router";

function Checkout() {
  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);
  const [giveDiscount, setGiveDiscount] = useState(false);
  const couponCode = { code: "CHEAPSKATE", amount: 16 };
  const [discount, setDiscount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [address, setAddress] = useState("");
  const tax = useAppSelector(calculateTax);
  const subtotal = useAppSelector(calculateCartSubtotal);
  const dispatch = useAppDispatch();
  const [total, setTotal] = useState(subtotal + Number(tax));

  const handleDiscountCode = () => {
    if (discount === couponCode.code) {
      setGiveDiscount(true);
      setTotal(subtotal + Number(tax) - couponCode.amount);
    }
  };
  return (
    <div className="font-inter w-11/12 lg:w-9/12  mx-auto bg-gray-100 rounded mt-10 lg:mt-20 lg:pb-10">
      <main className="lg:min-h-fit lg:overflow-hidden lg:flex lg:flex-row-reverse">
        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section
          aria-labelledby="order-heading"
          className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
        >
          <Disclosure as="div" className="max-w-lg mx-auto">
            {({ open }) => (
              <>
                <div className="flex items-center justify-between">
                  <h2
                    id="order-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Your Order
                  </h2>
                  <Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
                    {open ? (
                      <span>Hide full summary</span>
                    ) : (
                      <span>Show full summary</span>
                    )}
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel>
                  <ul className="divide-y divide-gray-200 border-b border-gray-200">
                    {cartItems.map((product) => (
                      <li
                        key={product.product.title}
                        className="flex py-6 space-x-6"
                      >
                        <img
                          src={urlFor(product.product.mainImage).url()}
                          alt={"ERR"}
                          className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
                        />
                        <div className="flex flex-col justify-between space-y-4">
                          <div className="text-sm font-medium space-y-1">
                            <h3 className="text-gray-900">
                              {product.product.title}
                            </h3>
                            <p className="text-gray-900">
                              $ {product.product.price}
                            </p>
                            {product.product.color ? (
                              <p className="text-gray-500">
                                {product.product.color}
                              </p>
                            ) : (
                              <div />
                            )}
                            {product.product.size[0].name != undefined ||
                            null ? (
                              <p className="text-gray-500">
                                {product.product.size[0].name}
                              </p>
                            ) : (
                              <div />
                            )}
                          </div>
                          <div className="flex space-x-4">
                            <button
                              onClick={() => {
                                dispatch(
                                  addItemToCart({
                                    product: product.product,
                                    quantity: product.quantity,
                                  })
                                );
                              }}
                              type="button"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Add
                            </button>
                            <div className="flex border-l border-gray-300 pl-4">
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
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <form className="mt-10">
                    <label
                      htmlFor="discount-code-mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Discount code
                    </label>
                    <div className="flex space-x-4 mt-1">
                      <input
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        type="text"
                        id="discount-code-mobile"
                        name="discount-code-mobile"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        onClick={handleDiscountCode}
                        type="button"
                        className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                      >
                        Apply
                      </button>
                    </div>
                  </form>

                  <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="text-gray-900">$ {subtotal}</dd>
                    </div>
                    {giveDiscount ? (
                      <div className="flex justify-between">
                        <dt className="flex">
                          Discount
                          <span className="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">
                            {couponCode.code}
                          </span>
                        </dt>
                        <dd className="text-gray-900">
                          - ${couponCode.amount}
                        </dd>
                      </div>
                    ) : null}
                    <div className="flex justify-between">
                      <dt>Taxes</dt>
                      <dd className="text-gray-900">${tax}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shipping</dt>
                      <dd className="text-gray-900">FREE</dd>
                    </div>
                  </dl>
                </Disclosure.Panel>

                <p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
                  <span className="text-base">Total</span>
                  <span className="text-base">$ {total}</span>
                </p>
              </>
            )}
          </Disclosure>
        </section>
        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="hidden bg-gray-50 w-full max-w-md flex-col lg:flex rounded"
        >
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul className="flex-auto overflow-y-auto divide-y divide-gray-200  px-6">
            {cartItems.map((product) => (
              <li key={product.product.title} className="flex py-6 space-x-6">
                <img
                  src={urlFor(product.product.mainImage).url()}
                  alt={"ERR"}
                  className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
                />
                <div className="flex flex-col justify-between space-y-4">
                  <div className="text-sm font-medium space-y-1">
                    <h3 className="text-gray-900">{product.product.title}</h3>
                    <p className="text-gray-900">${product.product.price}</p>
                    {product.product.color ? (
                      <p className="text-gray-500">{product.product.color}</p>
                    ) : (
                      <div />
                    )}
                    {product.product.size[0].name != undefined || null ? (
                      <p className="text-gray-500">
                        {product.product.size[0].name}
                      </p>
                    ) : null}
                    {product.quantity}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        dispatch(
                          addItemToCart({
                            product: product.product,
                            quantity: product.quantity,
                          })
                        );
                      }}
                      type="button"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Add
                    </button>
                    <div className="flex border-l border-gray-300 pl-4">
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
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
            <form>
              <label
                htmlFor="discount-code"
                className="block text-sm font-medium text-gray-700"
              >
                Discount code
              </label>
              <div className="flex space-x-4 mt-1">
                <input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  type="text"
                  id="discount-code"
                  name="discount-code"
                  className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  onClick={handleDiscountCode}
                  type="button"
                  className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Apply
                </button>
              </div>
            </form>

            <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">$ {subtotal}</dd>
              </div>
              {giveDiscount ? (
                <div className="flex justify-between">
                  <dt className="flex">
                    Discount
                    <span className="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">
                      {couponCode.code}
                    </span>
                  </dt>
                  <dd className="text-gray-900">- ${couponCode.amount}</dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">$ {tax}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-gray-900">FREE</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                <dt>Total</dt>
                <dd className="text-base">$ {total}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
        >
          <h2 id="payment-heading" className="sr-only">
            Payment and shipping details
          </h2>

          <div className="max-w-lg mx-auto lg:pt-16">
            <button
              onClick={() => alert("This doesnt go anywhere")}
              type="button"
              className="w-full flex items-center justify-center bg-black border border-transparent text-white rounded-md py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              <span className="sr-only">Pay with Apple Pay</span>
              <svg
                className="h-5 w-auto"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 20"
              >
                <path d="M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z" />
              </svg>
            </button>

            <div className="relative mt-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white rounded-full text-sm font-medium text-gray-500">
                  or
                </span>
              </div>
            </div>

            <form className="mt-6">
              <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                <div className="col-span-full">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      type="number"
                      maxLength={16}
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-8 sm:col-span-9">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      maxLength={5}
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      maxLength={4}
                      type="number"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      className="p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <div className="flex items-center h-5">
                  <input
                    id="same-as-shipping"
                    name="same-as-shipping"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <label
                  htmlFor="same-as-shipping"
                  className="text-sm font-medium text-gray-900"
                >
                  Billing address is the same as shipping address
                </label>
              </div>

              <button
                onClick={() => {
                  router
                    .push({
                      pathname: "/summary",
                      query: {
                        email: email,
                        name: name,
                        cardNumber: cardNumber,
                        cardExp: cardExp,
                        address: address,
                        subtotal: subtotal,
                        tax: tax,
                        total: total,
                      },
                    })
                    .then();
                }}
                type="button"
                className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Pay $ {total}
              </button>

              <p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
                <LockClosedIcon
                  className="w-5 h-5 text-gray-400 mr-1.5"
                  aria-hidden="true"
                />
                Payment details stored in plain text
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Checkout;
