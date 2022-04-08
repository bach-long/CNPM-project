import React from "react";
import clsx from "clsx";
import styles from "./Heading.module.css";
import { Link } from "react-router-dom";

const Modal = () => {
  return (
    <>
    <div className={styles.wrap}>
      <div className={styles.modal}>
        <div className={styles.modal__overlay}>
          <img src="/assets/Bg/login_background.png" alt="Back_ground" className={clsx(styles.authForm_bg)}/>
        </div>
        <div className={styles.modal__body}>
          <div className={styles.modal__inner}>
            <div className={styles.authForm}>
              <div
                className={clsx(
                  styles.authForm_wrapHeading,
                  "d-flex",
                  "justify-content-between"
                )}
              >
                <div className={clsx(styles.authForm_header)}>
                  <h3 className={styles.authForm_heading}>Đăng ký</h3>
                  <span className={styles.authForm_switchBtn}>
                    Tạo tài khoản Chợ Tốt ngay
                  </span>
                </div>
                <div className="">
                  <img
                    src="/assets/Item/logo_register.png"
                    alt="Logo_register"
                    className={styles.authForm_logo}
                  />
                </div>
              </div>

              <div className={clsx(styles.authForm_form, "mt-3")}>
                <div className={styles.authForm_Group}>
                  <input
                    type="text"
                    className={styles.authForm_input}
                    placeholder="Email cua ban"
                  />
                </div>
                <div className={clsx(styles.authForm_Group)}>
                  <input
                    type="password"
                    className={styles.authForm_input}
                    placeholder="Mat Khau cua ban"
                  />
                </div>
                <div className={styles.authForm_Group}>
                  <input
                    type="password"
                    className={styles.authForm_input}
                    placeholder="Nhap lai mat khau cua ban"
                  />
                </div>
                <div className={styles.authForm_Group}>
                  <button
                    className={clsx(
                      "btn",
                      "btn-secondary",
                      styles.btnRe,
                      styles.authForm_input
                    )}
                  >
                    Dang ky
                  </button>
                </div>
              </div>
              <div className={clsx(styles.authForm_aside)}>
                <p className={styles.authForm_policyText}>
                  Bằng việc đăng kí, bạn đã đồng ý với Chợ tốt về
                  <a href="" className={styles.authForm_policyLink}>
                    Điều khoản dịch vụ
                  </a>{" "}
                  va
                  <a href="" className={styles.authForm_policyLink}>
                    {" "}
                    Chính sách bảo mật
                  </a>
                </p>
              </div>

              <div className={clsx(styles.authForm_aside)}>
                <p className={styles.authForm_policyText}>
                  Bạn đã có tài khoản chợ tốt
                  <Link to="/sigin" className={styles.authForm_policyLink}>
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Modal;
