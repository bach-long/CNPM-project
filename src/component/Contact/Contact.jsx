import React from "react";
import clsx from "clsx";
import styles from './Contact.module.css'

const Contact = () => {
  return (
    <div className={clsx(styles.contact,"bg-light")}>
        <hr />
      <div className= {clsx(styles.wrapContact,"d-flex","justify-content-between")}>
        <div className="blockContact fw-bold ">
          HỖ TRỢ KHÁCH HÀNG
          <ulc className="list-unstyled">
            <li>Trung tâm trợ giúp</li>
            <li>An toàn mua bán</li>
            <li>Quy định cần biết</li>
            <li>Quy chế quyền riêng tư</li>
            <li>Liên hệ hỗ trợ</li>
          </ulc>
        </div>
        <div className="blockContact fw-bold">
          VỀ CHỢ TỐT
          <ul className="list-unstyled">
            <li>Giới thiệu</li>
            <li>Tuyển dụng</li>
            <li>Truyền thông</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="blockContact fw-bold">
          LIÊN KÊT
          <div className="facebook justify-content-center">
              <a href="/" className="me-2">Facebook</a>
              <a href="/" className="me-2">Youtube</a>
              <a href="/" className="me-2">Twitter</a>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer text-center">
          <p>CÔNG TY TNHH CHỢ TỐT - Địa chỉ: Phòng 1808, Tầng 18, Mê Linh Point Tower, 02 Ngô Đức Kế, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh</p>
          <p>Giấy chứng nhận đăng ký doanh nghiệp số 0312120782 do Sở Kế Hoạch và Đầu Tư TPHCM cấp ngày 11/01/2013</p>
          <p>Email: trogiup@chotot.vn - Tổng đài CSKH: 19003003 (1.000đ/phút)</p>
      </div>
    </div>
  );
};

export default Contact;
