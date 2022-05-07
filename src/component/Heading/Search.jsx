import React from "react";
import { useSelector } from "react-redux";
import styles from "./Heading.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

function Search() {
  const state = useSelector((state) => state.handleCart);
  function countCart() {
    var c = 0;
    state.forEach(p => {
      if(p.qty > 0) {
        c += p.qty;
      }
    });
    return c
  }
  return (
    <div className={styles.search}>
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
                  type="search"
                  placeholder="Tìm kiếm sản phẩm trên SUPERMARKET"
                  aria-label="Search"
                />

                <div className={clsx(styles.searchHistory)} id="history">
                  <div>
                    <p
                      className={clsx("fw-lighter", styles.headerSearchHistory)}
                    >
                      Lịch sử tìm kiếm
                    </p>
                  </div>
                  <div>
                    <p className={clsx(styles.textSearchHistory)}>IphoneX</p>
                    <p className={clsx(styles.textSearchHistory)}>Wave alpha</p>
                    <p className={clsx(styles.textSearchHistory)}>Áo T-shirt</p>
                  </div>
                  <div>
                    <p
                      className={clsx(
                        styles.footerSearchHistory,
                        "px-3",
                        "py-2"
                      )}
                    >
                      Xóa lịch sử tìm kiếm
                    </p>
                  </div>
                </div>
              </div>
              <button className="btn btn-outline-success" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>

          <div className="buttons">
            <Link to="/blog" className="btn btn-outline-dark me-2">
              <i className="fa fa-pencil-square-o"></i>
            </Link>
            <Link
              to="/cart"
              className="btn btn-outline-dark me-2 position-relative"
            >
              <i className="fa fa-shopping-cart me-2"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {countCart()}
                <span class="visually-hidden">unread messages</span>
              </span>
            </Link>
            <Link to="/sigin" className="btn btn-outline-dark me-2">
              <i className="fa fa-sign-in me-2"></i>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Search;