import React from "react";
import { useSelector } from "react-redux";
import styles from "./Heading.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

function Search() {
  const state = useSelector((state) => state.handleCart);
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
          <form className={clsx("d-flex", styles.searchWrapper)}>
            <input
              className={clsx(styles.searchBox)}
              type="search"
              placeholder="Tìm kiếm sản phẩm trên SUPERMARKET"
              aria-label="Search"
            />
            <button className="btn btn-outline-success " type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <div className="buttons">
            <a href="" className="btn btn-outline-dark me-2 position-relative">
              <i className="fa fa-shopping-cart me-2"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {state.length}
                <span class="visually-hidden">unread messages</span>
              </span>
            </a>
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
