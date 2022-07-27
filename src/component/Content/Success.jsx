import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Content.module.css";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Success = () => {
  return (
    <div className={clsx(styles.home, "bg-light")} style={{ height: "500px" }}>
      <div className="d-flex justify-content-center">
        <div style={{ marginTop: "100px" }}>
          <h2 className=" fst-italic">Thao tác thành công</h2>
          <div className="text-center">
            <i
              className="fa fa-check-circle"
              style={{ fontSize: "100px", color: "green" }}
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
