import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Heading.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user } from "../../redux/action";


const Modal = () => {
  const [message,setmessageError] = useState('');
  var status = 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const phone = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);
  const username = useRef(null);

  const sendData = ()=> {
    var data = {
      email: email.current.value,
      username: username.current.value,
      password: password1.current.value,
      passwordConfirm: password2.current.value,
      sdt: phone.current.value,
    }
    username.current.value = '';
    password1.current.value = '';
    password2.current.value = '';
    phone.current.value = '';
    email.current.value = '';
    setmessageError('')
    postData(data);
  }

  const postData = (data) => {
    var ojData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }
    fetch("http://127.0.0.1:5000/api/auth/register", ojData)
      .then(function(response) {
        status = response.status;
          return response.json();
      })
        
      .then(function(res) {
        console.log(status)
        console.log(res.user)
        console.log(res.errors)
        if (status === 201) {
          dispatch(user(res))
          navigate('/userInfor', {state:{username:res.username}})
        } else {
          if (res.errors.email) {
            setmessageError(res.errors.email);
          } else if (res.errors.sdt) {
            console.log('sdt')
            setmessageError(res.errors.sdt);
          } else if (res.errors.username) {
            console.log('username')
            setmessageError(res.errors.username);
          } else if (res.errors.password) {
            console.log('password')
            setmessageError(res.errors.password);
          } else {
            setmessageError("Đăng ký không thành công")
          }
        }
      })
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.modal}>
          <div className={styles.modal__overlay}>
            <img
              src="/assets/Bg/login_background.png"
              alt="Back_ground"
              className={clsx(styles.authForm_bg)}
            />
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
                      placeholder="Email của bạn"
                      ref={email}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={styles.authForm_Group}>
                    <input
                      type="text"
                      className={styles.authForm_input}
                      placeholder="Số điện thoại cua ban"
                      ref={phone}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={styles.authForm_Group}>
                    <input
                      type="text"
                      className={styles.authForm_input}
                      placeholder="Tên đăng nhập của bạn"
                      ref={username}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={clsx(styles.authForm_Group)}>
                    <input
                      type="password"
                      className={styles.authForm_input}
                      placeholder="Mật khẩu của bạn"
                      ref={password1}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={styles.authForm_Group}>
                    <input
                      type="password"
                      className={styles.authForm_input}
                      placeholder="Nhập lại mật khẩu của bạn"
                      ref={password2}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={styles.error}>{message}</div>
                  <div className={styles.authForm_Group}>
                    <button
                      className={clsx(
                        "btn",
                        "btn-secondary",
                        styles.btnRe,
                        styles.authForm_input
                      )}
                      onClick={sendData}
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
                  <p className={styles.authForm_textLogin}>
                    Bạn đã có tài khoản chợ tốt?
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
