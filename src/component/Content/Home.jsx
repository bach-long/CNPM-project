import React, {useEffect}from "react";
import Products from "./Products";
import Banner from "./Banner";
import clsx from "clsx";
import styles from "./Content.module.css";
import { useDispatch } from "react-redux";
import { user } from "../../redux/action";
const Home = () => {
  const dispatch = useDispatch();
  const reloadLogin = ()=> {
    const token = localStorage.getItem('token')
    var status;
    var ojData = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return fetch("http://127.0.0.1:5000/api/auth/me", ojData)
      .then(function (response) {
        status = response.status;
        return response.json();
      })
      .then(function (res) {
        if (status === 200) {
          dispatch(user(res));
      }
      });
  }
  useEffect(
    
    reloadLogin,[])

  
  
  
  return (
    <div className={clsx(styles.home, "justify-content-center")}>
      <Banner></Banner>
      <Products />
      <div className="descriptionWrapper bg-light">
        <div className="descriptionMarket py-2">
          <h3 className="m-3">
            Chợ Tốt - Chợ Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt
          </h3>
          <div className={clsx(styles.textContent, "mx-4")}>
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
      </div>
    </div>
  );
};

export default Home;

