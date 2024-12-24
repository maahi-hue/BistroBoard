// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "../Slide/Slide";

import bgimg1 from "../../assets/images/carousel1.jpg";
import bgimg2 from "../../assets/images/carousel2.jpg";
import bgimg3 from "../../assets/images/carousel3.jpg";

export default function Carousel() {
  return (
    <div className="container px-6 py-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            header="Savor the Best"
            description="Explore our top-selling dishes, crafted with perfection and loved by everyone!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            header="Perfectly Prepared, Just for You"
            description="From appetizers to desserts, we offer a variety of mouth-watering options made to cater to every taste and preference."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            header="Order Now, Enjoy Freshness"
            description="Get your favorite dishes delivered straight to your door, hot and fresh, or enjoy a cozy meal at our restaurant."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
