import React from "react";
import clsx from "clsx";
import styles from "./Content.module.css";

const Banner = () => {
  return (
    <div className={clsx(styles.wrapBanner)}>
      <div
        id="carouselExampleIndicators"
        className={clsx("carousel", "slide", styles.imageContent)}
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active mt-3">
            <img
              src="\assets\background_run1.png"
              className="d-block w-100"
              alt="backGround"
            />
          </div>
          <div className="carousel-item mt-3">
            <img
              src="\assets\background_run2.png"
              className="d-block w-100"
              alt="backGround"
            />
          </div>
          <div className="carousel-item mt-3">
            <img
              src="\assets\background_run3.png"
              className="d-block w-100"
              alt="backGround"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
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
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className={clsx(styles.containerBanner)}>
        <div className={styles.boxItem}>
          <img
            src="/assets/Item/sale.png"
            className={clsx(styles.cardBanner, "justify-content-center")}
            alt="..."
          />
          <div className={styles.textItem}>
            <p className="">Đại hạ giá</p>
          </div>
        </div>
        <div className={styles.boxItem}>
          <img
            src="/assets/Item/vi.png"
            className={clsx(styles.cardBanner)}
            alt="..."
          />
          <div className={styles.textItem}>
            <p className="card-text">Ví bán hàng</p>
          </div>
        </div>
        <div className={styles.boxItem}>
          <img
            src="/assets/Item/gift.png"
            className={clsx(styles.cardBanner)}
            alt="..."
          />
          <div className={styles.textItem}>
            <p className="card-text">Đăng tin cho tặng</p>
          </div>
        </div>
        <div className={styles.boxItem}>
          <img
            src="/assets/Item/oto.png"
            className={clsx(styles.cardBanner)}
            alt="..."
          />
          <div className={styles.textItem}>
            <p className="card-text">Định giá bán xe</p>
          </div>
        </div>
        <div className={styles.boxItem}>
          <img
            src="/assets/Item/card.png"
            className={clsx(styles.cardBanner)}
            alt="..."
          />
          <div className={styles.textItem}>
            <p className="card-text">Tin da luu</p>
          </div>
        </div>
        <div className={styles.boxItem}>
          <img
            src="/assets/Item/sale.png"
            className={clsx(styles.cardBanner)}
            alt="..."
          />
          <div className={styles.textItem}>
            <p className="card-text">Vòng quay may mắn</p>
          </div>
        </div>
        <div className={styles.boxItem}>
          <img
            src="/assets/Item/sale.png"
            className={clsx(styles.cardBanner)}
            alt="..."
          />
          <div className={styles.textItem}>
            <p className="card-text">Nạp đồng tốt</p>
          </div>
        </div>
        <div className={styles.boxItem}>
          <img
            src="/assets/Item/uudai.png"
            className={clsx(styles.cardBanner)}
            alt="..."
          />
          <div className={styles.textItem}>
            <p className="card-text">Chợ tốt ưu đãi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
