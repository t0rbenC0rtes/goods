import React from "react";

const Featured = () => {
  return (
    <div className="featured-wrapper">
      <div className="line"></div>
      <div className="title">
        <h2>Featured Work</h2>
        <button>ALL WORK</button>
      </div>
      <div className="works-wrapper">
        {[
          {
            name: "Mastercard",
            desc: "Metaverse Commerce Story",
            img: "/img/Mastercard_pic.jpg",
            link: "/",
          },
          {
            name: "JPMorgan",
            desc: "Financial Innovation",
            img: "/img/JPMorgan_pic.jpg",
            link: "/",
          },
          {
            name: "Zeiss",
            desc: "Optical Technology",
            img: "/img/Zeiss_pic.jpg",
            link: "/",
          },
          {
            name: "Dickinson",
            desc: "Creative Vision",
            img: "/img/Dickinson_pic.jpg",
            link: "/",
          },
        ].map((work, index) => (
          <div className="work" key={index}>
            <div className="image-container">
              <img src={work.img} alt={`${work.name} illustration`} />
            </div>
            <h3>{work.name}</h3>
            <p>{work.desc}</p>
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-icon"
            >
              <img
                src="https://cdn.prod.website-files.com/634541a9c7f09aff364e30fa/6632744857d014c2dc90bf51_Work%20Arrow_BloodOrange.svg"
                alt=""
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
