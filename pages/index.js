import HeroBanner from "@/components/HeroBanner";
import Wrapper from "@/components/Wrapper";

export default function Home() {
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
      </Wrapper>
    </main>
  )
}
