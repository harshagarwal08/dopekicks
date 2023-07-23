import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import Wrapper from '@/components/Wrapper'
import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import RelatedProducts from '@/components/RelatedProducts'

const ProductDetails = () => {
    return (
        <div className='w-full md:py-20'>
            <Wrapper>
                <div className='flex flex-col lg:flex-row md:px-10 gap-[40px] lg:gap-[100px]'>
                    {/* Left Column Start */}
                    <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full'><ProductDetailsCarousel /></div>
                    {/* Left Column End */}
                    {/* Right Column Start */}
                    <div className='flex-[1] py-3'>
                        {/* Product Title */}
                        <div className='text-[34px] font-semibold mb-2'>Jordan Retro 6 G</div>
                        {/* Product Subtitle*/}
                        <div className='text-lg font-semibold mb-5'>
                            Men&apos;s Basketball Shoe
                        </div>
                        {/* Product Price */}
                        <div className='text-lg font-semibold'>$100</div>
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
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    UK 6.5
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    UK 7
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium cursor-not-allowed bg-black/[0.1] opacity-50 ">
                                    UK 8
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    UK 9
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium cursor-not-allowed bg-black/[0.1] opacity-50">
                                    UK 10
                                </div>
                                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                                    UK 10.5
                                </div>
                            </div>
                            {/* Product Size Selection End*/}
                            <div className="text-red-600 mt-2">Please select a size</div>
                        </div>
                        {/* Product Size Range End*/}
                        {/* Product Buttons Start*/}
                        <button className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75'>Add to Cart</button>
                        <button className='w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-2'>Wishlist
                            <IoMdHeartEmpty size={20} /></button>
                        {/* Product Buttons End */}
                        {/* Product Description Start */}
                        <div className='mt-10'>
                            <div className='text-lg font-bold mb-5'>Product Details</div>
                            <div className='text-md font-medium mb-5'>
                                The Jordan Retro 6 G is a reimagined version of the classic Air Jordan 6, designed for the course. It features responsive cushioning and an outsole made with integrated traction to help stabilize your foot during every swing.
                            </div>
                            <div className='text-md font-medium mb-5'>
                                The Jordan Retro 6 G is a reimagined version of the classic Air Jordan 6, designed for the course. It features responsive cushioning and an outsole made with integrated traction to help stabilize your foot during every swing.
                            </div>
                        </div>
                        {/* Product Description End */}
                    </div>
                    {/* Right Column End */}
                </div>
                <RelatedProducts/>
            </Wrapper>
        </div>
    )
}

export default ProductDetails