import React from "react";
import { Link } from "react-router-dom";
import Products from "./Products";
import clsx from "clsx";
import styles from "./Content.module.css";
const Home = () => {
  return (
    <div className={clsx(styles.home, "justify-content-center")}>
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
                src="\assets\background_run.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="\assets\background_run.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="\assets\background_run.png"
                className="d-block w-100"
                alt="..."
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
            <img src="/assets/Item/sale.png" class={clsx(styles.cardBanner,"justify-content-center")} alt="..." />
            <div className={styles.textItem}>
              <p className="">Đại hạ giá</p>
            </div>
          </div>
          <div className={styles.boxItem}>
            <img src="/assets/Item/vi.png" class={clsx(styles.cardBanner)} alt="..." />
            <div className={styles.textItem}>
              <p className="card-text">Ví bán hàng</p>
            </div>
          </div>
          <div className={styles.boxItem}>
            <img src="/assets/Item/gift.png" class={clsx(styles.cardBanner)} alt="..." />
            <div className={styles.textItem}>
              <p className="card-text">Đăng tin cho tặng</p>
            </div>
          </div>
          <div className={styles.boxItem}>
            <img src="/assets/Item/oto.png" class={clsx(styles.cardBanner)} alt="..." />
            <div className={styles.textItem}>
              <p className="card-text">Định giá bán xe</p>
            </div>
          </div>
          <div className={styles.boxItem}>
            <img src="/assets/Item/card.png" class={clsx(styles.cardBanner)} alt="..." />
            <div className={styles.textItem}>
              <p className="card-text">Tin da luu</p>
            </div>
          </div>
          <div className={styles.boxItem}>
            <img src="/assets/Item/sale.png" class={clsx(styles.cardBanner)} alt="..." />
            <div className={styles.textItem}>
              <p className="card-text">Vòng quay may mắn</p>
            </div>
          </div>
          <div className={styles.boxItem}>
            <img src="/assets/Item/sale.png" class={clsx(styles.cardBanner)} alt="..." />
            <div className={styles.textItem}>
              <p className="card-text">Nạp đồng tốt</p>
            </div>
          </div>
          <div className={styles.boxItem}>
            <img src="/assets/Item/uudai.png" class={clsx(styles.cardBanner)} alt="..." />
            <div className={styles.textItem}>
              <p className="card-text">Chợ tốt ưu đãi</p>
            </div>
          </div>
        </div>
      </div>
      <Products />
      <div className="descriptionWrapper bg-light">
        <div className="descriptionMarket">
          <h3 className="m-3">
            Chợ Tốt - Chợ Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt
          </h3>
          <div className={clsx(styles.textContent)}>
            <p>
              Chợ Tốt chính thức gia nhập thị trường Việt Nam vào đầu năm 2012,
              với mục đích tạo ra cho bạn một kênh rao vặt trung gian, kết nối
              người mua với người bán lại với nhau bằng những giao dịch cực kỳ
              đơn giản, tiện lợi, nhanh chóng, an toàn, mang đến hiệu quả bất
              ngờ.
            </p>
            <p>
              Đến nay, Chợ Tốt tự hào là Website rao vặt được ưa chuộng hàng đầu
              Việt Nam. Hàng ngàn món hời từ Bất động sản, Nhà cửa, Xe cộ, Đồ
              điện tử, Thú cưng, Vật dụng cá nhân... đến tìm việc làm, thông tin
              tuyển dụng, các dịch vụ - du lịch được đăng tin, rao bán trên Chợ
              Tốt.
            </p>
            <p>
              Với Chợ Tốt, bạn có thể dễ dàng mua bán, trao đổi bất cứ một loại
              mặt hàng nào, dù đó là đồ cũ hay đồ mới với nhiều lĩnh vực:
            </p>
            <p>
              Bất động sản: Cho thuê, Mua bán nhà đất, căn hộ chung cư, văn
              phòng mặt bằng kinh doanh, phòng trọ đa dạng về diện tích, vị trí
            </p>
            <p>
              Phương tiện đi lại: xe ô tô, xe máy có độ bền cao, giá cả hợp lý,
              giấy tờ đầy đủ.
            </p>
            <p>
              Đồ dùng cá nhân: quần áo, giày dép, túi xách, đồng hồ... đa phong
              cách, hợp thời trang.
            </p>
            <p>
              Đồ điện tử: điện thoại di động, máy tính bảng, laptop, tivi, loa,
              amply...; đồ điện gia dụng: máy giặt, tủ lạnh, máy lạnh điều
              hòa... với rất nhiều nhãn hiệu, kích thước khác nhau.
            </p>
            <p>
              Vật nuôi, thú cưng đa chủng loại: gà, chó (chó phốc sóc, chó pug,
              chó poodle...), chim, mèo (mèo anh lông ngắn, mèo munchkin...),
              cá, hamster giá cực tốt.
            </p>
            <p>
              Tuyển dụng, việc làm với hàng triệu công việc hấp dẫn, phù hợp tại
              Việc Làm Tốt - Kênh tuyển dụng hiệu quả, uy tín được phát triển
              bởi Chợ Tốt.
            </p>
            <p>
              Dịch vụ, du lịch: khách sạn, vé máy bay, vé tàu, vé xe, tour du
              lịch và các voucher du lịch... uy tín, chất lượng.
            </p>
            <p>
              Đồ ăn, thực phẩm: các món ăn được chế biến thơm ngon, hấp dẫn,
              thực phẩm tươi sống, an toàn va giá cả hợp lý.
            </p>
            <p>
              Và còn rất nhiều mặt hàng khác nữa đã và đang được rao bán tại Chợ
              Tốt.
            </p>
          </div>
        </div>

        <ul className="fw-bold">
          Các từ khóa liên quan phổ biến
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
