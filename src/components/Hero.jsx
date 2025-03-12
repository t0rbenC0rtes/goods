import React from "react";

const Hero = ({ setVideoLoaded }) => {
  return (
    <div className="hero-wrapper">
      <video
        className="hero-video"
        src="/GoodsReel.mp4"
        autoPlay
        muted
        loop
        onLoadedData={() => {
          setVideoLoaded(true);
        }}
      />
    </div>
  );
};

export default Hero;
