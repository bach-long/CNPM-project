import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Content.module.css";
import { useSelector, useDispatch } from "react-redux";

const GoodBuys = () => {
  const [statusLogin, setStatusLogin] = useState(false);
  const inforUser = useSelector((state) => state.Login);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [goodBuys, setGoodBuys] = useState([]);
  const [goodObs, setGoodObs] = useState([]);
  const goodOb = useRef(goodObs);
  const navigate = useNavigate();

  useEffect(() => {
    setStatusLogin(inforUser.username);
  }, [inforUser]);

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

  // useEffect(() => {
  //   var requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //     redirect: "follow",
  //   };
  //   const getGoodBight = async () => {
  //     let res = await fetch(
  //       "http://127.0.0.1:5000/api/goods/getGoodBuys",
  //       requestOptions
  //     );
  //     let arrTagGood = (await res.json()).results;

  //     arrTagGood = arrTagGood.map(async (tag) => {
  //       let requestOptions = {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //         redirect: "follow",
  //       };

  //       let res2 = await fetch(
  //         `http://127.0.0.1:5000/api/goods/${tag.goodId}`,
  //         requestOptions
  //       );

  //       let good = await res2.json();
  //       return good;
  //     });

  //     console.log(arrTagGood);
  //   };

  //   getGoodBight();
  // }, []);

  return (
    <div className={clsx(styles.home, "bg-light")}>
      <div className="mx-4">
        <h1>Sản phẩm đã mua</h1>
      </div>
      <hr className="mb-0" />
      <div className={clsx(styles.boxGoods)} style={{ marginLeft: "40px" }}>
        {goodOb.current.map((good) => {
          const img = good.images;
          const img0 = img[0] ? img[0].link : null;
          return (
            <div className={clsx(styles.boxCart)}>
              <div
                className={clsx(
                  "d-flex",
                  "justify-content-between",
                  styles.wrapCart
                )}
              >
                <div
                  className={clsx(styles.cart_product_boxImg)}
                  onClick={() => navigate(`/products/${good.goodId}`)}
                >
                  <img
                    src={`http://localhost:5000/${img0}`}
                    className={clsx(styles.cart_product_img, "mx-2")}
                    alt=""
                  />
                </div>
                <div className={clsx(styles.cart_product_description)}>
                  <div>
                    <p>{good.name}</p>
                    <p>Miễn phí trả hàng trong 7 ngày</p>
                    <p>Ngày mua {good.updatedAt}</p>
                  </div>
                </div>
                <div className={clsx(styles.cart_product_price)}>
                  <div>
                    <p>Gía sản phẩm {Math.round(good.price * 100) / 100}$</p>
                  </div>
                </div>
              </div>
              <hr className="m-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoodBuys;
