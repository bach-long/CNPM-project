import React from "react";
import { useSelector } from "react-redux";
import styles from "./Content.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import { delCart } from "../../redux/action";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const delProduct = (product) => {
    dispatch(delCart(product));
  };

  return (
    <>
      <div className={clsx(styles.home, "bg-light",styles.cart)}>
          <div>GIO HANG</div>
        <div>
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
                    <input type="checkbox" />
                  </div>
                  <div className={clsx(styles.cart_product_boxImg)}>
                    <img
                      src={product.image}
                      className={clsx(styles.cart_product_img)}
                      alt=""
                    />
                  </div>
                  <div className={clsx(styles.cart_product_description)}>
                    <div>
                      <p>{product.title}</p>
                      <p>Miễn phí trả hàng trong 7 ngày</p>
                    </div>
                  </div>
                  <div className={clsx(styles.cart_product_amount)}>
                    <div>
                      <button className={clsx(styles.amountButton)} onClick={() => addProduct(product)}>+</button>
                      <button className={clsx(styles.amountButton)}>{product.qty}</button>
                      <button className={clsx(styles.amountButton)}
                      onClick={() => delProduct(product)}>-</button>
                    </div>
                  </div>
                  <div className={clsx(styles.cart_product_price)}>
                    <div>
                      <p>{product.price * product.qty}$</p>
                    </div>
                  </div>
                  <div className={clsx(styles.cart_product_delete)}>
                    <div>
                      <p>X</p>
                    </div>
                  </div>
                </div>
                <hr className="m-0" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Cart;
