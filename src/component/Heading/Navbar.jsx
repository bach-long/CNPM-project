import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Heading.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/action/Auth";

function Navbar() {
  const [statusLogin, setStatusLogin] = useState(false);
  const infoUser = useSelector((state) => state.Login);
  const token = localStorage.getItem("token");
  const [goodBuys, setGoodBuys] = useState([]);
  const [goodObs, setGoodObs] = useState([]);
  const goodOb = useRef(goodObs);
  const dispatch = useDispatch();

  useEffect(() => {
    setStatusLogin(infoUser.username);
  }, [infoUser]);

  const logoutNavbar = () => {
    dispatch(logout());
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/api/goods/getGoodBuys", requestOptions)
      .then((response) => response.json())
      .then(function (res) {
        var resSv = [...res.results];
        setGoodBuys(resSv);
        goodOb.current = [];
        // res.reverse();
        resSv.map((goodSv) => {
          var requestOptions = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            redirect: "follow",
          };

          fetch(
            `http://127.0.0.1:5000/api/goods/${goodSv.goodId}`,
            requestOptions
          )
            .then((response) => response.json())
            .then(function (result) {
              setGoodObs((goodObs) => [...goodObs, result]);
              goodOb.current = [...goodOb.current, result];
            })
            .catch((error) => console.log("error", error));
        });
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className={clsx(styles.navHeading, "bgColorMain")}>
      <nav className="navbar navbar-expand-lg navbar-light pb-0 pt-0">
        <div
          className={clsx(
            styles.wrapNav,
            "justify-content-between",
            "container"
          )}
        >
          <Link className="navbar-brand fw-bold fs-4" to="#">
            GREENMARKET
          </Link>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item me-3">
                <Link className="nav-link active" aria-current="page" to="/">
                  <i className="fa fa-home me-2"></i>Trang chủ
                </Link>
              </li>
              <li
                className={clsx(
                  "nav-item",
                  "me-3",
                  "position-relative",
                  styles.hasNotify
                )}
              >
                <Link className="nav-link" to="#">
                  <i className="fa fa-bell-o me-2"></i>Thông báo
                </Link>
                <div className={clsx(styles.notify, "bg-light")}>
                  <div className={styles.notify_header}>
                    <p>Thong tin moi nhan</p>
                  </div>
                  <ul className="list-unstyled bg-light">
                    {goodOb.current.map((goodBuy, index) => {
                      const img = goodBuy.images;
                      const img0 = img[0] ? img[0].link : null;
                      return index < 3 ? (
                        <li
                          className={clsx(
                            "d-flex",
                            "border-1",
                            styles.boxNotify
                          )}
                          key={index}
                        >
                          <img
                            src={`http://localhost:5000/${img0}`}
                            alt="notify"
                            className={styles.notify_image}
                          />
                          <div className={styles.notify_boxText}>
                            <div>
                              <p
                                className={clsx(
                                  "mb-0",
                                  styles.notify_headerText
                                )}
                              >
                                Bạn đã mua sản phẩm {goodBuy.name}
                              </p>
                            </div>
                            <div>
                              <p
                                className={clsx(
                                  "mb-0",
                                  styles.notify_contentText
                                )}
                              >
                                Thời gian {goodBuy.createdAt}
                              </p>
                              <p
                                className={clsx(
                                  "mb-0",
                                  styles.notify_contentText
                                )}
                              >
                                Thời gian giao hàng dự kiến 5 ngày sau khi đặt
                                hàng
                              </p>
                            </div>
                          </div>
                        </li>
                      ) : (
                        <div></div>
                      );
                    })}
                  </ul>
                  <footer className={clsx(styles.notify_footer)}>
                    <Link to="/goodBuys" className={styles.notify_footerBtn}>
                      Xem tat ca
                    </Link>
                  </footer>
                </div>
              </li>

              <li className="nav-item me-3">
                <Link
                  className="nav-link"
                  to={statusLogin ? "/chat" : "/sigin"}
                  state={{ username2: "" }}
                >
                  <i className="fa fa-commenting-o me-2"></i>Chat
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link
                  className="nav-link"
                  to={statusLogin ? "/userInfor" : "/sigin"}
                  state={{ userId: infoUser.userId }}
                >
                  <i className="fa fa-server me-2"></i>Quản lý tin
                </Link>
              </li>
              <li className="nav-item dropdown me-3">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-ellipsis-h me-2"></i>Thêm
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to={statusLogin ? "/userInfor" : "/sigin"}
                    >
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/sigin"
                      onClick={logoutNavbar}
                    >
                      Đăng xuất
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
