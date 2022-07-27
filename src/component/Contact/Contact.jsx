import React from "react";
import clsx from "clsx";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={clsx(styles.contact, "bg-light")}>
      <hr />
      <div
        className={clsx(
          styles.wrapContact,
          "d-flex",
          "justify-content-between"
        )}
      >
        <div className="blockContact ">
          <p className=" fw-bold">HỖ TRỢ KHÁCH HÀNG</p>
          <ul className="list-unstyled text-reset">
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                Trung tâm trợ giúp
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                An toàn mua bán
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                Quy định cần biết
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                Quy chế quyền riêng tư
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                Liên hệ hỗ trợ
              </a>
            </li>
          </ul>
        </div>
        <div className="blockContact ">
          <p className="fw-bold">GREENMARKET</p>
          <ul className="list-unstyled">
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                Giới thiệu
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                Tuyển dụng
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                Truyền thông
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div className="blockContact ">
          <p className="fw-bold">THÀNH VIÊN NHÓM</p>
          <ul className="list-unstyled">
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                ĐÀO ĐỨC HIỆP
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                NGUYỄN XUÂN BÁCH
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                LÊ VĂN HÒA
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                NGUYỄN ĐỨC ANH
              </a>
            </li>
            <li className="text-muted ">
              <a
                className="text-reset text-decoration-none"
                target="_blank"
                href="/"
              >
                TRỊNH VĂN CHUNG
              </a>
            </li>
          </ul>
        </div>
        <div className="blockContact fw-bold">
          LIÊN KÊT
          <div className="facebook justify-content-center fs-2">
            <a href="/" className="me-2">
              <i className="fa fa-facebook-square" aria-hidden="true"></i>
            </a>
            <a className=" me-2" href="/" style={{ color: "red" }}>
              <i className="fa fa-youtube-play" aria-hidden="true"></i>
            </a>
            <a href="/" className="me-2">
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer text-center pb-5">
        <p>
          CÔNG TY TNHH GREEN MARKET - Địa chỉ: Phòng 1808, Tầng 18, Mê Linh
          Point Tower, 02 Ngô Đức Kế, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh
        </p>
        <p>
          Giấy chứng nhận đăng ký doanh nghiệp số 0312120782 do Sở Kế Hoạch và
          Đầu Tư TPHCM cấp ngày 11/01/2013
        </p>
        <p>
          Email: 20020370@vnu.edu.vn - Tổng đài CSKH: 0394364482 (1.000đ/phút)
        </p>
      </div>
    </div>
  );
};

export default Contact;
