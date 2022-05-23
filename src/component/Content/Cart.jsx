import React, {useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Content.module.css";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import { delCart } from "../../redux/action";
import { setCountZero } from "../../redux/action";
import { user } from "../../redux/action";


const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageCart = useRef(null);
  var listCheckBox;

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const delProduct = (product) => {
    dispatch(delCart(product));
  };

  const delZero = (product) => {
    dispatch(setCountZero(product));
  };


  useEffect(() => {
    listCheckBox = pageCart.current.querySelectorAll("input");

  }, [state]);

  useEffect(()=>{
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
  },[])



  const  checkAll = (e) => {
    const check = e.target.checked;
    if (check) {
      listCheckBox.forEach(function(checkbox) {
        checkbox.checked = true;
      })
    } else {
      listCheckBox.forEach(function(checkbox) {
        checkbox.checked = false;
      })
    }
  }

  function countCart() {
    var c = 0;
    state.forEach((p) => {
      if (p.qty > 0) {
        c += p.qty;
      }
    });
    return c;
  }


  

  const CardProductNull = () => {
    return (
      <div className={clsx(styles.cardProductNull)}>
        <div className="d-flex flex-column justify-content-center align-content-center">
          <i className={clsx("fa", "fa-gratipay", styles.justifyText)}></i>
          <div className=" mx-auto">
            <p className={clsx(styles.textBoxNull)}>
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
          </div>
        </div>
      </div>
    );
  };

  const ShowCardProduct = () => {
    return (
      <div className={clsx(styles.cart_cardProduct)}>
        {state.map((product) => {
          return (
            <div className={clsx(styles.boxCart)}>
              <div
                className={clsx(
                  "d-flex",
                  "justify-content-between",
                  styles.wrapCart
                )}
              >
                <div className={clsx(styles.cart_product_checkbox)}>
                  <input type="checkbox" name={product.goodId}
                  />
                </div>
                <div
                  className={clsx(styles.cart_product_boxImg)}
                  onClick={() => navigate(`/products/${product.goodId}`)}
                >
                  <img
                    src={product.image}
                    className={clsx(styles.cart_product_img)}
                    alt=""
                  />
                </div>
                <div className={clsx(styles.cart_product_description)}>
                  <div>
                    <p>{product.name}</p>
                    <p>Miễn phí trả hàng trong 7 ngày</p>
                  </div>
                </div>
                <div className={clsx(styles.cart_product_amount)}>
                  <div>
                    <button
                      className={clsx(styles.amountButton)}
                      onClick={() => addProduct(product)}
                    >
                      +
                    </button>
                    <button className={clsx(styles.amountButton)}>
                      {product.qty}
                    </button>
                    <button
                      className={clsx(styles.amountButton)}
                      onClick={() => delProduct(product)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className={clsx(styles.cart_product_price)}>
                  <div>
                    <p>
                      {Math.round(product.price * product.qty * 100) / 100}$
                    </p>
                  </div>
                </div>
                <div className={clsx(styles.cart_product_delete)}>
                  <div
                    className={clsx(styles.cart_productDeleteBtn)}
                    onClick={() => delZero(product)}
                  >
                    <p className="mt-2">X</p>
                  </div>
                </div>
              </div>
              <hr className="m-0" />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        className={clsx(styles.home, "bg-light", styles.cart, "font-monospace")}
        ref={pageCart}
      >
        <h3 className="mx-3 mb-0">GIO HANG</h3>
        <hr />
        <div className="d-flex">
          <div className="mt-2 mx-3">
            <input type="checkbox" name="selectAll"
            onClick={checkAll}
            />
          </div>
          <div className="font-monospace mx-2 mb-1 fs-5">Chon tat ca</div>
        </div>
        <hr className="m-0" />
        {countCart() === 0 ? <CardProductNull /> : <ShowCardProduct />}
        <hr className="m-0" />
        <div className="mb-2 d-flex">
          <div className={clsx(styles.cart_boxButtonBuy, )}>
            <button className={clsx(styles.cart_buttonBuy)}>Mua</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
