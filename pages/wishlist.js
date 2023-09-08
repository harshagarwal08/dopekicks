import React from "react";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

const Wishlist = () => {
  const { wishlistedItems } = useSelector((state) => state.wishlist);
  return (
    <div className="w-full py-10">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Your Wishlist
          </div>
        </div>
        {wishlistedItems?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {wishlistedItems?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
        ) : (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your wishlist is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your wishlist.
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

export default Wishlist;
