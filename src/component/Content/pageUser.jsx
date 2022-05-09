import React from "react";
import clsx from "clsx";
import styles from "./Content.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PageUser = () => {
  const inforUser = useSelector((state) => state.Login);
  var checkBlogUp = false;

  const BoxProfileNull = () => {
    return (
      <div>
        <div className="d-flex flex-column justify-content-center align-content-center">
          <i className={clsx("fa","fa-gratipay",styles.justifyText)}></i>
          <div className=" mx-auto">
            <p className={clsx(styles.textBoxNull)}>Người bán này chauw có tin đăng bán cá nhân nào đang bán</p>
          </div>
        </div>
      </div>
    );
  };

  const BoxProfileNotNull = ()=> {
      return (
          <>
          </>
      )
  }

  return (
    <>
      <div className={clsx(styles.home, styles.profile_BoxRadius)}>
        <div className={clsx(styles.wrapInforUser, "d-flex",styles.profile_BoxRadius)}>
          <div className={clsx(styles.profile_box, "col-md-5",styles.profile_BoxRadius, "bg-light")}>
            <div>
              <div className={clsx( styles.rowBox1)}>
                <i
                  className={clsx(
                    "fa",
                    "fa-user-circle",
                    styles.prodfile_avatarUser
                  )}
                ></i>
                <p className={clsx(styles.profile_NameUser)}>
                  {inforUser.username}
                </p>
              </div>
              <div className="d-flex">
                <div className={clsx( styles.rowBox1)}>
                  <p className={clsx(styles.profile_numberFollow)}>
                    {inforUser.followersCount + "  "}{" "}
                  </p>
                  <p>Người theo dõi</p>
                </div>
                <div className={clsx( styles.rowBox1)}>
                  <p className={clsx(styles.profile_numberFollow)} f>
                    2
                  </p>
                  <p>Đang theo dõi</p>
                </div>
              </div>
              <div>
                <button className={clsx( styles.rowBox1,styles.h36,"btn", "btn-warning","mb-4",styles.flowUser)}>
                  <i className="fa fa-plus mt-1 me-2"></i>
                  <p>Theo dõi</p>
                </button>
              </div>
            </div>
          </div>
          <div className={clsx(styles.profile_box, "col-md-7",styles.profile_BoxRadius, "bg-light")}>
            <div className="mx-4">
              <div className={clsx(styles.profile_row)}>
                <div className={clsx(styles.profile_textDesc)}>
                  <i
                    className={clsx(
                      "fa",
                      "fa-star-o",
                      "me-2",
                      styles.profile_icon
                    )}
                  ></i>
                  <p>Danh gia:</p>
                </div>
                <p></p>
              </div>
              <div className={clsx(styles.profile_row)}>
                <div className={clsx(styles.profile_textDesc)}>
                  <i
                    className={clsx(
                      "fa",
                      "fa-calendar",
                      "me-2",
                      styles.profile_icon
                    )}
                  ></i>
                  <p>Ngay tham gia:</p>
                </div>
                <p>{inforUser.createdAt}</p>
              </div>
              <div className={clsx(styles.profile_row)}>
                <div className={clsx(styles.profile_textDesc)}>
                  <i
                    className={clsx(
                      "fa",
                      "fa-map-marker",
                      "me-2",
                      styles.profile_icon
                    )}
                  ></i>
                  <p> Dia chi:</p>
                </div>
                <p>{inforUser.address}</p>
              </div>
              <div className={clsx(styles.profile_row)}>
                <div className={clsx(styles.profile_textDesc)}>
                  <i
                    className={clsx(
                      "fa",
                      "fa-whatsapp",
                      "me-2",
                      styles.profile_icon
                    )}
                  ></i>
                  <p>Phan hoi chat</p>
                </div>
                <p></p>
              </div>
              <div className={clsx(styles.profile_row)}>
                <div className={clsx(styles.profile_textDesc)}>
                  <i
                    className={clsx(
                      "fa",
                      "fa-check-circle-o",
                      "me-2",
                      styles.profile_icon
                    )}
                  ></i>
                  <p>SDT: </p>
                </div>
                <p>{inforUser.sdt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(styles.home, "bg-light", "mt-4", styles.profile_box, styles.heightBox, styles.profile_BoxRadius)}
      >
        <div className={clsx(styles.inforUser_blogUp)}>
          <div className={clsx(styles.textBoxBlog)}>
            <p>Tin đã đăng</p>
          </div>
          <hr/>
          <div className={clsx(styles.profile_boxBlogUp)}>
            {checkBlogUp?<BoxProfileNotNull/>:<BoxProfileNull/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageUser;
