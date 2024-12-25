import Carousel from "../Carousel/Carousel";
import Menu from "../Menu/Menu";
import SpecialOffers from "../SpecialOffers/SpecialOffers";
import TopSellingFoods from "../TopSellingFoods/TopSellingFoods";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <TopSellingFoods></TopSellingFoods>
      <Menu></Menu>
      <SpecialOffers></SpecialOffers>
    </div>
  );
};

export default Home;
