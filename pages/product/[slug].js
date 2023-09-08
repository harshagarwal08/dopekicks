import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import Wrapper from "@/components/Wrapper";
import React, { useState, useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchData } from "@/utils/api";
import { getDiscountedPercentage } from "@/utils/helper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ relatedProducts, product }) => {
  const [showError, setShowError] = useState(false);
  const [selectedSize, setSelectedSize] = useState();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const p = product?.data?.[0].attributes;
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (wishlist?.wishlistedItems?.length) {
      const item = wishlist?.wishlistedItems?.find(
        (item) => item.id === product?.data?.[0].id
      );
      if (item) {
        setIsWishlisted(true);
      }
    }
  }, []);

  const handleWishlistClick = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product?.data?.[0]));
      setIsWishlisted(false);
      notifySuccess("Removed from wishlist!", "💔");
    } else {
      dispatch(addToWishlist(product?.data?.[0]));
      setIsWishlisted(true);
      notifySuccess("Added to wishlist!", "❤️");
    }
  };

  const notifySuccess = (message, icon = "🎉") =>
    toast.success(message, {
      icon,
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <div className="w-full md:py-20 py-10">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[40px] lg:gap-[100px]">
          {/* Left Column Start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full">
            <ProductDetailsCarousel images={p?.image?.data} />
          </div>
          {/* Left Column End */}
          {/* Right Column Start */}
          <div className="flex-[1] py-3">
            {/* Product Title */}
            <div className="text-[30px] font-semibold mb-2 leading-tight">
              {p?.name}
            </div>
            {/* Product Subtitle*/}
            <div className="text-lg font-semibold mb-5">{p?.subtitle}</div>
            {/* Product Price */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">&#8377;{p?.price}</p>
              {p?.original_price && (
                <>
                  <p className="text-base  font-medium line-through">
                    &#8377;{p?.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPercentage(p?.original_price, p?.price)}% off
                  </p>
                </>
              )}
            </div>
            <div className="text-md font-semibold text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium mb-20 text-black/[0.5]">{`(Also includes all applicable duties)`}</div>

            {/* Product Size Range Start*/}
            <div className="mb-10">
              {/* Product Size Range Title Start*/}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-semibold text-black/[0.5] cursor-pointer">
                  Size Guide
                </div>
              </div>
              {/* Product Size Range Title End*/}
              {/* Product Size Selection Start*/}
              <div className="grid grid-cols-3 gap-2" id="sizesGrid">
                {p?.size?.data?.map((item, id) => (
                  <div
                    key={id}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item?.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black-/[0.1] opacity-50"
                    } ${selectedSize === item?.size && "border-black"}`}
                    onClick={() => {
                      if (!item?.enabled) return;
                      setSelectedSize(item?.size);
                      setShowError(false);
                    }}
                  >
                    {item?.size}
                  </div>
                ))}
              </div>
              {/* Product Size Selection End*/}
            </div>
            {/* Product Size Range End*/}
            {/* Product Buttons Start*/}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (selectedSize) {
                  setShowError(false);
                  if (
                    cart?.cartItems?.find(
                      (item) =>
                        item.id === product?.data?.[0].id &&
                        item.selectedSize === selectedSize &&
                        item.quantity === 6
                    )
                  ) {
                    notifyError("You can't add more than 6 items!");
                    return;
                  }
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      selectedSize,
                      price: p?.price,
                    })
                  );
                  notifySuccess("Added to cart!");
                } else {
                  setShowError(true);
                  notifyError("Please select a size!");
                  document.getElementById("sizesGrid").scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            >
              Add to Cart
            </button>
            <button
              className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-2"
              onClick={handleWishlistClick}
            >
              {isWishlisted ? "Remove from" : "Add to"} Wishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* Product Buttons End */}
            {/* Product Description Start */}
            <div className="mt-10">
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md font-medium mb-5">
                <ReactMarkdown>{p?.description}</ReactMarkdown>
              </div>
            </div>
            {/* Product Description End */}
          </div>
          {/* Right Column End */}
        </div>
        <RelatedProducts products={relatedProducts} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const { data } = await fetchData("/api/products?populate=*");
  const paths = data?.map((product) => ({
    params: { slug: product?.attributes?.slug },
  }));
  return { paths, fallback: false };
}
export async function getStaticProps({ params: { slug } }) {
  const product = await fetchData(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const relatedProducts = await fetchData(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );
  return { props: { relatedProducts, product } };
}
