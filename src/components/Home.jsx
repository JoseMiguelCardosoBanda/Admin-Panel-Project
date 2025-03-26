import React from "react";
import { ThemeHand } from "../context/ThemeContext";

function Home() {
  const { theme, setTheme } = ThemeHand();

  return (
    <>
      <div className="d-flex justify-content-center">
        <h1 className="py-3">Welcome To The Admin Panel</h1>
      </div>
      <div
        id="carouselFade"
        className={
          theme
            ? "carousel slide carousel-fade p-3"
            : "carousel slide carousel-dark carousel-fade p-3"
        }
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-flex justify-content-center">
              <img
                src="https://www.coresecurity.com/sites/default/files/2020-10/cs-privileged-access-management-lock-700x350.png"
                className="d-block rounded"
                style={{ height: 700, width: 1400 }}
                alt=""
              />
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center">
              <img
                src="https://media.licdn.com/dms/image/v2/C4E0DAQEim3tks13lzg/learning-public-crop_288_512/learning-public-crop_288_512/0/1643138266959?e=2147483647&v=beta&t=tnFE5-TGE9pNpMJMIgOVTBNEOlhR2PfEGspq-4rIQv4"
                alt=""
                className="d-block rounded"
                style={{ height: 700, width: 1400 }}
              />
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center">
              <img
                src="https://www.link-labs.com/hs-fs/hubfs/Shutterstock_2088007684.webp?width=1000&height=395&name=Shutterstock_2088007684.webp"
                alt=""
                className="d-block rounded"
                style={{ height: 700, width: 1400 }}
              />
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Home;
