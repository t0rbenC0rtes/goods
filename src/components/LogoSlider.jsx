import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState, useRef } from "react";

const logos = [
  {
    src: "https://cdn.prod.website-files.com/634d0b47862a67e14ab6d30d/6716f0842ffbe34b88f5f5c2_Rectangle%20491-1.png",
    text: "Fastest Growing Companies - 5 years running",
  },
  {
    src: "https://cdn.prod.website-files.com/634d0b47862a67e14ab6d30d/6716f04d2445ede71f39155c_Rectangle%20491.png",
    text: "#11 Fastest Growing Company",
  },
  {
    src: "https://cdn.prod.website-files.com/634d0b47862a67e14ab6d30d/6716f08f43b30134fead70a0_Rectangle%20491-2.png",
    text: "Award Winner",
  },
  {
    src: "https://cdn.prod.website-files.com/634d0b47862a67e14ab6d30d/6716f0a303fcef0fe1b4e147_Rectangle%20491-3.png",
    text: "Award Winner",
  },
  {
    src: "https://cdn.prod.website-files.com/634d0b47862a67e14ab6d30d/6716f0b6120ecb00422481db_Rectangle%20491-4.png",
    text: "Award Winner",
  },
  {
    src: "https://cdn.prod.website-files.com/634d0b47862a67e14ab6d30d/6716f0c7d415b2c09c60b029_Rectangle%20491-5.png",
    text: "Award Winner",
  },
  {
    src: "https://cdn.prod.website-files.com/634d0b47862a67e14ab6d30d/6716f0e12b8818b873a62bab_Rectangle%20491-6.png",
    text: "Award Winner",
  },
  {
    src: "https://cdn.prod.website-files.com/634d0b47862a67e14ab6d30d/6716f0ed81a129461160a143_Rectangle%20491-7.png",
    text: "Award Winner",
  },
];

const LogoSlider = () => {
  const [direction, setDirection] = useState("forward"); // Track direction
  const swiperRef = useRef(null);
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={80}
      slidesPerView={3}
      loop={false}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: direction === "backward",
      }}
      speed={4000}
      onReachEnd={() => setDirection("backward")}
      onReachBeginning={() => setDirection("forward")}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      {logos.map((logo, index) => (
        <SwiperSlide key={index} className="logo-slide">
          <img src={logo.src} alt={logo.text} className="logo-image" />
          <p className="logo-text">{logo.text}</p>{" "}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LogoSlider;
