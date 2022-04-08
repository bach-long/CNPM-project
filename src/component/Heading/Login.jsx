import React from "react";
import clsx from "clsx";
import {Link} from 'react-router-dom'
import styles from "./Heading.module.css";

const Login = () => {
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
                  <h3 className={styles.authForm_heading}>Đăng nhập</h3>
                  <span className={styles.authForm_switchBtn}>
                    Chào bạn quay trở lại
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
                    placeholder="Nhập SĐT của bạn"
                  />
                </div>
                <div className={clsx(styles.authForm_Group)}>
                  <input
                    type="password"
                    className={styles.authForm_input}
                    placeholder="Nhập mật khẩu của bạn"
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
                    Đăng Nhập
                  </button>
                </div>
              </div>
              <div className={clsx(styles.authForm_aside)}>
                <p className={styles.authForm_policyText}>
                  <a href="" className={styles.authForm_forgetPass}>
                    Bạn quên mật khẩu?
                  </a>
                </p>
              </div>

              <div className={clsx(styles.authForm_aside)}>
                <p className={styles.authForm_policyText}>
                  Bạn chưa có tài khoản chợ tốt
                  <Link to="/login" className={styles.authForm_policyLink}>
                    Đăng Ký
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

export default Login;
