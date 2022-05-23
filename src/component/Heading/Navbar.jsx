import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Heading.module.css";
import { useSelector, useDispatch } from "react-redux";
import { user } from "../../redux/action";

function Navbar() {
  const dispatch = useDispatch();
  const logout = () => {
    const token = localStorage.getItem('token')
    dispatch(user({}));
    localStorage.removeItem('token');
    var status;
    var ojData = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return fetch("http://127.0.0.1:5000/api/auth/logout", ojData)
      .then(function (response) {
        status = response.status;
        return response.json();
      })
      .then(function (res) {
        if (status === 200) {
          console.log(res)
      }
    });
  }

  return (
    <div className={ clsx(styles.navHeading,"bgColorMain")}>
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
              <li className={clsx("nav-item","me-3","position-relative",styles.hasNotify)}>
                <Link className="nav-link" to="#">
                  <i className="fa fa-bell-o me-2"></i>Thông báo
                </Link>
                <div className={clsx(styles.notify, "bg-light")}>
                  <div className={styles.notify_header}>
                    <p>Thong tin moi nhan</p>
                  </div>
                  <ul className="list-unstyled bg-light">
                    <li
                      className={clsx("d-flex", "border-1", styles.boxNotify)}
                    >
                      <img
                        src="/assets/animal.png"
                        alt="notify"
                        className={styles.notify_image}
                      />
                      <div className={styles.notify_boxText}>
                        <div>
                          <p className={clsx("mb-0",styles.notify_headerText)}>Tiết kiệm với mã voucher 0 đồng với SUPERMARKET ngay!!</p>
                        </div>
                        <div>
                          <p className={clsx("mb-0",styles.notify_contentText)}>Nhanh tay săn mã ngày 4/3</p>
                        </div>
                      </div>
                    </li>
                    <li
                      className={clsx("d-flex", "border-1", styles.boxNotify)}
                    >
                      <img
                        src="/assets/animal.png"
                        alt="notify"
                        className={styles.notify_image}
                      />
                      <div className={styles.notify_boxText}>
                        <div>
                        <p className={clsx("mb-0",styles.notify_headerText)}>Tiết kiệm với mã voucher</p>
                        </div>
                        <div>
                          <p className={clsx("mb-0",styles.notify_contentText)}>Nhanh tay săn mã ngày 4/3</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <footer className={clsx(styles.notify_footer)}>
                      <a href="" className={styles.notify_footerBtn}>Xem tat ca</a>
                  </footer>
                </div>
              </li>
              
              <li className="nav-item me-3">
                <Link className="nav-link" to="/chat">
                  <i className="fa fa-commenting-o me-2"></i>Chat
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="#">
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
                    <Link className="dropdown-item" to="#">
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/sigin" onClick={logout}>
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