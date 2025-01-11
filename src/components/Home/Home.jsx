import Carousel from "../Carousel/Carousel";
import Menu from "../Menu/Menu";
import SpecialOffers from "../SpecialOffers/SpecialOffers";
import TopSellingFoods from "../TopSellingFoods/TopSellingFoods";
import Lottie from "lottie-react";
import story from "../../assets/images/story.json";
import values from "../../assets/images/values.json";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <TopSellingFoods></TopSellingFoods>
      <Menu></Menu>
      <SpecialOffers></SpecialOffers>
      <section className="py-10 px-8 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8">Our Story</h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-center">
            {/* Animation Section */}
            <div className="flex justify-center lg:col-span-1">
              <Lottie
                animationData={story}
                loop={true}
                className="w-80 h-80 md:w-96 md:h-96"
              />
            </div>
            {/* Text Section */}
            <div className="lg:col-span-2 text-left">
              <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                Founded in 2024, BistroBoard was built on a passion for crafting
                delicious food and creating memorable dining experiences. From
                humble beginnings, we’ve grown into a space where family,
                friends, and food lovers come together to enjoy exceptional
                dishes made with the freshest ingredients.
              </p>
              <p className="text-lg mt-4 leading-relaxed max-w-3xl mx-auto">
                Our commitment to quality, service, and hospitality has been the
                heart of our journey, and we look forward to serving you for
                many years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 px-8">
        <h2 className="text-4xl font-bold text-center ">Our Values</h2>

        <div className="flex flex-col items-center">
          <Lottie
            animationData={values}
            loop={true}
            className="w-80 h-80 md:w-96 md:h-96"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Quality</h3>
            <p className="">
              We prioritize using fresh, locally sourced ingredients to craft
              meals that delight your palate.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Hospitality</h3>
            <p className="">
              Your satisfaction is our top priority. We strive to create a
              welcoming atmosphere for everyone.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Sustainability</h3>
            <p className="">
              We are committed to eco-friendly practices, from reducing waste to
              supporting local communities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
