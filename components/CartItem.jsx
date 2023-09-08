import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "@/store/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const updateCartItem = (e, key) => {
    let payload = {
      key,
      value: key === "quantity" ? parseInt(e?.target?.value) : e?.target?.value,
      id: item?.id,
      selectedSize: item?.selectedSize,
    };
    dispatch(updateCart(payload));
  };
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <Link href={`/product/${item?.attributes?.slug}`}>
        <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
          <Image
            src={item?.attributes?.thumbnail?.data?.attributes.url}
            alt=""
            width={120}
            height={120}
          />
        </div>
      </Link>
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex justify-between items-center">
            <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
              {item?.attributes?.name}
            </div>
            <RiDeleteBin6Line
              className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] block md:hidden"
              onClick={() => {
                dispatch(
                  removeFromCart({
                    id: item?.id,
                    selectedSize: item?.selectedSize,
                  })
                );
              }}
            />
          </div>
          <div className="text-sm font-medium text-black/[0.5] block md:hidden">
            {item?.attributes?.subtitle}
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            INR {item?.price}
          </div>
        </div>
        <div className="text-sm font-medium text-black/[0.5] hidden md:block">
          {item?.attributes?.subtitle}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size: </div>
              <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e, "selectedSize")}
              >
                {item?.attributes?.size?.data
                  ?.filter(({ enabled }) => enabled)
                  .map((size, index) => {
                    return (
                      <option
                        key={index}
                        value={size?.size}
                        selected={item?.selectedSize === size?.size}
                      >
                        {size?.size}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity: </div>
              <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e, "quantity")}
              >
                {Array.from({ length: 6 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={i} value={q} selected={item?.quantity === q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            className="cursor-pointer text-black/[0.5] hover:text-black hidden md:block text-[20px]"
            onClick={() => {
              dispatch(
                removeFromCart({
                  id: item?.id,
                  selectedSize: item?.selectedSize,
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
