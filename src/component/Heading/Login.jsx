import React, { useRef,useEffect, useState } from "react";
import clsx from "clsx";
import { Link, useNavigate  } from "react-router-dom";
import styles from "./Heading.module.css";
import { useDispatch } from "react-redux";
import { user } from "../../redux/action";



const Login = () => {
  const navigate = useNavigate();
  const [messageError, setmessageError] = useState('');
  var status = 0;
  const token = localStorage.getItem('token');

  const username = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  

  const postData = (data) => {
    var ojData = {
      method: 'POST',
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
               },
               'Authorization': `Bearer ${token}`,
      body: JSON.stringify(data)
    }
    fetch("http://127.0.0.1:5000/api/auth/login", ojData)
      .then(function(response) {
        status = response.status;
          return response.json();
      })
        
      .then(function(res) {
        if (status === 200) {
          localStorage.setItem("token", res.token)
          dispatch(user(res.user))
          navigate('/')
          setmessageError('Dang nhap thanh cong')
        } else if (status === 400) {
          setmessageError('Email va mat khau k duoc de trong');
        } else if (status === 404 ) {
          setmessageError(res.errors.username)
        } else if (status === 401) {
          setmessageError(res.errors.password)
        } else {
          setmessageError('dang nhap k thanh cong')
        }
      })
  }

  const sendData = ()=> {
    var data = {
      username: username.current.value,
      password: password.current.value
    }
    username.current.value = '';
    password.current.value = '';
    setmessageError('')
   postData(data);
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
                        name="username"
                        className={clsx(styles.authForm_input)}
                        placeholder="Nhập tên đăng nhập của bạn"
                        required
                        ref={username}
                      />
                    </div>
                    <div className={clsx(styles.authForm_Group)}>
                      <input
                        type="password"
                        className={clsx(styles.authForm_input)}
                        placeholder="Nhập mật khẩu của bạn"
                        required
                        ref={password}
                      />
                    </div>
                    <div className={clsx(styles.error)}>{messageError}</div>
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
