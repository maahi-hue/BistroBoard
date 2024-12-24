import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image1 from "../../assets/images/image1.jpg";
import Image2 from "../../assets/images/image2.jpg";
import Image3 from "../../assets/images/image3.jpg";
import Image4 from "../../assets/images/image4.jpg";
import Image5 from "../../assets/images/image5.jpg";
import Image6 from "../../assets/images/image6.jpg";
import Image7 from "../../assets/images/image7.jpg";
import Image8 from "../../assets/images/image8.jpg";
import Image9 from "../../assets/images/image9.jpg";
import Image10 from "../../assets/images/image10.jpg";
import { useState } from "react";

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: Image1 },
    { src: Image2 },
    { src: Image3 },
    { src: Image4 },
    { src: Image5 },
    { src: Image6 },
    { src: Image7 },
    { src: Image8 },
    { src: Image9 },
    { src: Image10 },
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="gallery-page">
      <div className="title-container w-3/4 mx-auto text-center py-12">
        <h1 className="text-4xl font-bold">Gallery Page</h1>
        <p className="mt-3  ">
          Dive into our handpicked gallery of images, thoughtfully organized for
          your enjoyment. Click on any image to view it in a larger, detailed
          format using our interactive lightbox feature.
        </p>
      </div>

      <div className="gallery-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-md hover:opacity-80"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images}
        index={currentImageIndex}
        carousel={{ finite: true }}
      />
    </div>
  );
};

export default Gallery;
