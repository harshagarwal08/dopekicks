import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import Wrapper from '@/components/Wrapper'
import React, { useState } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import RelatedProducts from '@/components/RelatedProducts'
import { fetchData } from '@/utils/api'
import { getDiscountedPercentage } from "@/utils/helper";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const ProductDetails = ({ relatedProducts, product }) => {
    const [showError, setShowError] = useState(false)
    const [selectedSize, setSelectedSize] = useState()
    const p = product?.data?.[0].attributes
    return (
        <div className='w-full md:py-20'>
            <Wrapper>
                <div className='flex flex-col lg:flex-row md:px-10 gap-[40px] lg:gap-[100px]'>
                    {/* Left Column Start */}
                    <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full'><ProductDetailsCarousel images={p?.image?.data} /></div>
                    {/* Left Column End */}
                    {/* Right Column Start */}
                    <div className='flex-[1] py-3'>
                        {/* Product Title */}
                        <div className='text-[30px] font-semibold mb-2 leading-tight'>{p?.name}</div>
                        {/* Product Subtitle*/}
                        <div className='text-lg font-semibold mb-5'>
                            {p?.subtitle}
                        </div>
                        {/* Product Price */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                &#8377;{p?.price}
                            </p>
                            {p?.original_price && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        &#8377;{p?.original_price}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPercentage(
                                            p?.original_price,
                                            p?.price
                                        )}
                                        % off
                                    </p>
                                </>
                            )}
                        </div>
                        <div className='text-md font-semibold text-black/[0.5]'>incl. of taxes</div>
                        <div className='text-md font-medium mb-20 text-black/[0.5]'>{`(Also includes all applicable duties)`}</div>

                        {/* Product Size Range Start*/}
                        <div className='mb-10'>
                            {/* Product Size Range Title Start*/}
                            <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">Select Size</div>
                                <div className="text-md font-semibold text-black/[0.5] cursor-pointer">Size Guide</div>
                            </div>
                            {/* Product Size Range Title End*/}
                            {/* Product Size Selection Start*/}
                            <div className="grid grid-cols-3 gap-2">
                                {p?.size?.data?.map((item, id) => (
                                    <div key={id} className={`border rounded-md text-center py-3 font-medium ${item?.enabled ? "hover:border-black cursor-pointer" : "cursor-not-allowed bg-black-/[0.1] opacity-50"} ${selectedSize === item?.size && "border-black"}`}
                                        onClick={() => {
                                            setSelectedSize(item?.size)
                                            setShowError(false)
                                        }}>
                                        {item?.size}
                                    </div>
                                ))}
                            </div>
                            {/* Product Size Selection End*/}
                            {showError && <div className="text-red-600 mt-2">Please select a size</div>}
                        </div>
                        {/* Product Size Range End*/}
                        {/* Product Buttons Start*/}
                        <button className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75' onClick={()=>{
                            if(selectedSize){
                                setShowError(false)
                            }else{
                                setShowError(true)
                            }
                        }}>Add to Cart</button>
                        <button className='w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-2'>Wishlist
                            <IoMdHeartEmpty size={20} /></button>
                        {/* Product Buttons End */}
                        {/* Product Description Start */}
                        <div className='mt-10'>
                            <div className='text-lg font-bold mb-5'>Product Details</div>
                            <div className='markdown text-md font-medium mb-5'>
                                <ReactMarkdown>
                                {p?.description}
                                </ReactMarkdown>
                            </div>
                        </div>
                        {/* Product Description End */}
                    </div>
                    {/* Right Column End */}
                </div>
                <RelatedProducts products={relatedProducts}/>
            </Wrapper>
        </div>
    )
}

export default ProductDetails

export async function getStaticPaths() {
    const { data } = await fetchData('/api/products?populate=*')
    const paths = data?.map((product) => ({
        params: { slug: product?.attributes?.slug },
    }))
    return { paths, fallback: false }
}
export async function getStaticProps({ params: { slug } }) {
    const product = await fetchData(`/api/products?populate=*&filters[slug][$eq]=${slug}`)
    const relatedProducts = await fetchData(
        `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );
    return { props: { relatedProducts, product } }
}
