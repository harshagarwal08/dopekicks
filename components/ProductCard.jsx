import { getDiscountedPercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ data: { attributes: p, id } }) => {
  return (
    <Link
      href={`/products/${p?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <Image
        width={300}
        height={300}
        src={p?.thumbnail?.data?.attributes?.url}
        alt={p?.name}
        className="w-full max-h-[300px] object-cover"
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{p?.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">&#8377;{p?.price}</p>
          {p?.original_price && (
            <>
              <p className="line-through text-sm font-medium">
              &#8377;{p?.original_price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPercentage(p?.original_price, p?.price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
