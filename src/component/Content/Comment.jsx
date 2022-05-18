import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import clsx from "clsx";
import Pagination from "./Pagination";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Content.module.css";

const Comment = () => {
  function rateStar() {
    return (
      <div style={{ color: "#fbd21e", marginRight: "3px" }}>
        <i className="fa fa-star" aria-hidden="true"></i>
      </div>
    );
  }

  const renderStar = (n) => {
    var rStar = [];
    for (var i = 0; i < n; i++) {
      rStar = [...rStar, rateStar()];
    }
    return rStar;
  };

  const FeedBackSell = () => {
    return (
      <div className={styles.boxFeedBack}>
        <div className="mx-2">
          <div
            style={{ color: "#865203", paddingTop: "8px", fontWeight: "500" }}
          >
            Phản hồi của người bán
          </div>
          <div
            className="mt-2 pb-4"
            style={{ fontSize: "14px", fontWeight: "revert" }}
          >
            FeedBack nguoi ban
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(styles.home, "bg-light", "mt-2")}>
      <div className="mx-4 pt-2">
        <h2>Đánh giá sản phẩm</h2>
      </div>
      <hr className="mb-0" />
      <div className={clsx(styles.boxComments,"mt-4")}>
        <div className={clsx(styles.wrapComment,"pt-2")}>
          <div className={clsx(styles.boxUsers)}>
            <img
              src="/assets/Item/avatar.png"
              alt=""
              className={clsx(styles.h36)}
              style={{ width: "36px" }}
            />
            <p className="mx-2 mt-1 mb-0" style={{fontSize:'14px', fontStyle:'italic'}}>Ten User</p>
          </div>
          <div className={clsx(styles.boxRate)}>
            <div className="d-flex">{renderStar(5)}</div>
            <div className={clsx(styles.comment)}>Comment</div>
            <div
              style={{ fontSize: "11px", fontStyle: "italic" }}
              className="mt-1"
            >
              23-09-2022
            </div>
            <FeedBackSell></FeedBackSell>
          </div>
        </div>
        <hr className="mt-1"/>
        <Pagination/>
      </div>
    </div>
  );
};

export default Comment;
