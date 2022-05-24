import React, { useState, useEffect } from "react";
import Products from "./Products";
import { Link, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import styles from "./Content.module.css";
import Pagination from "./Pagination";

const PageSearch = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState([]);
  const [pageCount, setPageCout] = useState(1);
  const [page, setPage] = useState(1);
  const query = useLocation().state.query;

  function getCurPage(page) {
    setPage(page);
  }

  useEffect(() => {
    console.log(encodeURIComponent(query));
    var objData = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch(
      `http://127.0.0.1:5000/api/goods?query=${encodeURIComponent(query)}`,
      objData
    )
      .then((response) => response.json())
      .then(function (res) {
        setFilter(res.goods);
        setPageCout(res.totalPageCount);
      })
      .catch((error) => console.log("error", error));
  }, [query]);


  

  return (
    <div className={clsx(styles.home, "justify-content-center")}>
      <div className="row grid">
        <h1 >San pham ban tim kiem</h1>
        <hr />
        {filter.map((product, index) => {
          const img = product.images;
          const img0 = img[0] ? img[0].link : null;
          return (
            <div key={index} className={`col-md-3 mb-4 ${styles.cardProduct}`}>
              <div
                className="card h-100 text-center"
                key={product.goodId}
                onClick={() => navigate(`/products/${product.goodId}`)}
              >
                <img
                  src={`http://localhost:5000/${img0}`}
                  className="card-img-top"
                  alt={product.name}
                  height="250px"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.name.substring(0, 12)}
                  </h5>
                  <p className="card-text">${product.price}</p>
                  <Link
                    to={`/products/${product.goodId}`}
                    className="btn btn-primary"
                  >
                    BUY TICKETS
                  </Link>
                </div>
              </div>
              <div className={clsx(styles.cardProduct_delete)}>
                <div
                  className="nav-link "
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to={"/"}>
                      Thông tin tài khoản
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination getData={getCurPage} page={page} pageCounts={pageCount} />
    </div>
  );
};

export default PageSearch;
