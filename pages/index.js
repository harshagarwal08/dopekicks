import HeroBanner from "@/components/HeroBanner";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { fetchData } from '@/utils/api';

export default function Home({products}) {
  return (
    <main>
      <HeroBanner />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Your Ultimate Sneaker Destination
          </div>
          <div className="text-md md:text-xl">
            From Classic to Cutting-Edge: Discover the Hottest Sneaker Trends at Dopekicks and elevate your sneaker game!
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product) => (
           <ProductCard key={product?.id} data={product} />
          ))}
          
        </div>
      </Wrapper>
    </main>
  )
}

export async function getStaticProps() {
  const products = await fetchData('/api/products?populate=*');
  return {
    props: {
      products
    }
  }
}
