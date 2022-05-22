import React from "react";
import { useEffect, useState, useRef } from "react";

import { useSelector } from "react-redux";
import styles from "./Heading.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

function Search() {
  const state = useSelector((state) => state.handleCart);
  const [statusLogin, setStatusLogin] = useState(false); 
  const inforUser = useSelector((state)=> state.Login);  
  console.log(inforUser)

  useEffect(()=> {
    setStatusLogin(inforUser.username)
    // if (statusLogin) {
    //   const getUserGoods = async () => {
    //     const response = await fetch(`http://fakestoreapi.com/products/${id}`);
    //     const response2 = await fetch("http://fakestoreapi.com/products");
    //     var p = await response.json();
    //     var products = await response2.json();
    //   };
    // }
  })

  
  function countCart() {
    var c = 0;
    state.forEach((p) => {
      if (p.qty > 0) {
        c += p.qty;
      }
    });
    return c;
  }

  return (
    <div className={clsx(styles.search,"bgColorMain")}>
      <nav className="navbar navbar-light ">
        <div
          className={clsx(
            styles.wrapNav,
            "justify-content-between",
            "container"
          )}
        >
          <div className={clsx(styles.searchWrap)}>
            <div className={clsx("d-flex", styles.boxSearch)}>
              <div className={clsx(styles.wrapInput)}>
                <input
                  className={clsx(styles.inputSearch)}
                  name="search"
                  type="search"
                  placeholder="Tìm kiếm sản phẩm trên SUPERMARKET"
                  aria-label="Search"
                />

              </div>
              <button className="btn btn-outline-success" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>

          <div className={clsx("buttons", "d-flex", styles.search_buttons)}>
            <Link to={statusLogin?'/userInfor':'/sigin'} state={{ username: inforUser.username }}  className="btn btn-outline-dark me-2 d-flex">
              <i className={statusLogin?"fa fa-user-circle-o mt-1":"fa fa-sign-in mt-1"}></i>
              <p className="mx-2">{statusLogin?inforUser.username:''}</p>
            </Link>
            <Link
              to={statusLogin?"/cart":"/sigin"}
              className="btn btn-outline-dark me-2 position-relative"
            >
              <i className="fa fa-shopping-cart me-2"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {countCart()}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
            <Link to={statusLogin?"/blog":"/sigin"} className="btn btn-outline-dark me-2">
              <i className="fa fa-pencil-square-o"></i>
            </Link>
            
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Search;
