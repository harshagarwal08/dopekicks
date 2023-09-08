import CartItem from "@/components/CartItem";
import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

import { makePaymentRequest } from "@/utils/api";

const Cart = () => {
  const [loading, setLoading] = React.useState(false);
  const { cartItems, total } = useSelector((state) => state.cart);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("/api/orders", {
        items: cartItems,
      });
      await stripe.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="w-full py-10">
      <Wrapper>
        {/* Cart Header */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>
        {cartItems?.length ? (
          <div className="flex flex-col lg:flex-row gap-12 py-10">
            {/* Cart Items */}
            <div className="flex-[2]">
              <div className="text-lg font-bold">Cart Items</div>
              <div className="mt-5">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            {/* Cart Summary */}
            <div className="flex-[1]">
              <div className="text-lg font-bold">Summary</div>
              <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                <div className="flex justify-between">
                  <div className="uppercase text-md md:text-lg font-medium text-black">
                    Subtotal
                  </div>
                  <div className="text-md md:text-lg font-medium text-black">
                    INR {total}
                  </div>
                </div>
                <div className="text-sm md:text-md py-5 border-t mt-5">
                  The subtotal reflects the total price of your order, including
                  taxes and duties, before any applicable discounts. It does not
                  include shipping costs and international transaction fees.
                </div>
              </div>
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex gap-1 justify-center"
                onClick={handlePayment}
              >
                Checkout {loading && <img src="/spinner.svg" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore our products.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
