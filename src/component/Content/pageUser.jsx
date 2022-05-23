import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Content.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { user } from "../../redux/action";
import Skeleton from "react-loading-skeleton";


const PageUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
  }, []);

  const [blogGoods, setBlogGoods] = useState([]);
  const [inforUser, setInforUser] = useState({});
  const username = useLocation().state.username;
  const [loading, setLoading] = useState(true);
  var checkBlogUp = true;

  useEffect(() => {
    const getUserGoods = async () => {
      const response = await fetch(
        `http://127.0.0.1:5000/api/users/${username}/goods`
      );
      const response2 = await fetch(
        `http://127.0.0.1:5000/api/users/${username}/`
      );
      setBlogGoods(await response.clone().json());
      setInforUser(await response2.clone().json());
      setLoading(false)
    };
    getUserGoods();
  }, []);

  const BoxProfileGoodsLoading = () => {
    return (
      <div className={clsx(styles.boxProductOffer)}>
        <div className={clsx(styles.wrapProductOffer)}>
          <Skeleton height={200} width={150} className="mx-3"></Skeleton>
          <Skeleton height={200} width={150} className="mx-3"></Skeleton>
          <Skeleton height={200} width={150} className="mx-3"></Skeleton>
          <Skeleton height={200} width={150} className="mx-3"></Skeleton>
          <Skeleton height={200} width={150} className="mx-3 mb-4"></Skeleton>
        </div>
      </div>
    );
  };

  const BoxProfileNull = () => {
    return (
      <div>
        <div className="d-flex flex-column justify-content-center align-content-center">
          <i className={clsx("fa", "fa-gratipay", styles.justifyText)}></i>
          <div className=" mx-auto">
            <p className={clsx(styles.textBoxNull)}>
              Người bán này chauw có tin đăng bán cá nhân nào đang bán
            </p>
          </div>
        </div>
      </div>
    );
  };

  const BoxProfileNotNull = () => {
    return (
      <div className="row m-3">
        {blogGoods.map((good) => {
          const img = good.images;
          const img0 = img[0]?img[0].link:null;
          console.log(img0)
          return (
            <>
              <div
                className={`col-md-3 mb-4 ${styles.cardProduct}`}
                // onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="card h-100 text-center" key={good.id}>
                  <img
                    src={`http://localhost:5000/${img0}`}
                    className="card-img-top"
                    alt={good.name}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{good.name.substring(0, 12)}</h5>
                    <p className="card-text">${good.price}</p>
                    <Link to={`/`} className="btn btn-primary">
                      BUY TICKETS
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    );
  };

  const Box1Profile = () => {
    return (
      <div
        className={clsx(
          styles.profile_box,
          "col-md-5",
          styles.profile_BoxRadius,
          "bg-light"
        )}
      >
        <div>
          <div className={clsx(styles.rowBox1)}>
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
            <div className={clsx(styles.rowBox1)}>
              <p className={clsx(styles.profile_numberFollow)}>
                {inforUser.followersCount + "  "}{" "}
              </p>
              <p>Người theo dõi</p>
            </div>
            <div className={clsx(styles.rowBox1)}>
              <p className={clsx(styles.profile_numberFollow)} f>
                2
              </p>
              <p>Đang theo dõi</p>
            </div>
          </div>
          <div>
            <button
              className={clsx(
                styles.rowBox1,
                styles.h36,
                "btn",
                "btn-warning",
                "mb-4",
                styles.flowUser
              )}
            >
              <i className="fa fa-plus mt-1 me-2"></i>
              <div>Theo dõi</div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Box2Profile = () => {
    return (
      <div
        className={clsx(
          styles.profile_box,
          "col-md-7",
          styles.profile_BoxRadius,
          "bg-light"
        )}
      >
        <div className="mx-4">
          <div className={clsx(styles.profile_row)}>
            <div className={clsx(styles.profile_textDesc)}>
              <i
                className={clsx("fa", "fa-star-o", "me-2", styles.profile_icon)}
              ></i>
              <p>Danh gia:</p>
            </div>
            <p className="mx-1"></p>
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
            <p className="mx-1">{inforUser.createdAt}</p>
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
            <p className="mx-1">
              {inforUser.address
                ? inforUser.address
                : "Nguoi dung chua cap nhat dia chi"}
            </p>
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
              <p>Phan hoi chat:</p>
            </div>
            <p className="mx-1"></p>
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
            <p className="mx-1">
              {inforUser.sdt ? inforUser.sdt : "nguoi dung chua cap nhat sdt"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={clsx(styles.home, styles.profile_BoxRadius)}>
        <div
          className={clsx(
            styles.wrapInforUser,
            "d-flex",
            styles.profile_BoxRadius
          )}
        >
          <Box1Profile></Box1Profile>
          <Box2Profile></Box2Profile>
        </div>
      </div>

      <div
        className={clsx(
          styles.home,
          "bg-light",
          "mt-4",
          styles.profile_box,
          styles.heightBox,
          styles.profile_BoxRadius
        )}
      >
        <div className={clsx(styles.inforUser_blogUp)}>
          <div className={clsx(styles.inforUser_textBoxBlog)}>
            <p>Tin đã đăng</p>
          </div>
          <hr />
          <div className={clsx(styles.profile_boxBlogUp)}>
            {loading?<BoxProfileGoodsLoading/>:checkBlogUp ? <BoxProfileNotNull /> : <BoxProfileNull />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageUser;
