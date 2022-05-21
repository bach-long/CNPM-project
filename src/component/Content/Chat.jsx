import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Content.module.css";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

const Chat = () => {
  const array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const [checkBoxChatNull, setCheckBoxChat] = useState(false);
  const BoxChatNull = () => {
    return (
      <div className={clsx(styles.boxChat, "col-md-8")}>
        <div
          className="bg-light mx-4 d-flex justify-content-center flex-column my-5"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <div className="mx-auto" style={{ fontSize: "80px" }}>
            <i className="fa fa-address-book" aria-hidden="true"></i>
          </div>
          <div className="mx-auto fw-bold">CÔNG NGHỆ PHẦN MỀM</div>
          <div className="mx-auto fw-bolder ">
            HÃY BẮT ĐẦU CHAT VỚI GREEN MARKET VỚI NGƯỜI BÁN
          </div>
          <div className="mx-auto fw-bold text-center pb-5 mx-5 my-3">
            THÊM CUỘC TRÒ CHUYỆN BẰNG CÁCH TÌM SẢN PHẨM PHÙ HỢP VÀ CHAT VỚI
            NGƯỜI BÁN
          </div>
        </div>
      </div>
    );
  };

  const BoxChatNotNull = () => {
    return (
      <div className={clsx(styles.boxChat, "col-md-8", "d-flex")}>
        <div className="h-100 w-100">
          <div className="d-flex my-2 mx-2">
            <div>
              <img
                src="/assets/Item/avatar.png"
                alt=""
                style={{ height: "36px", width: "36px" }}
              />
            </div>
            <div>
              <div className="d-flex">
                <p className="m-0 p-0 mx-1 text-black-50 fw-bold">Ten User</p>
              </div>
            </div>
          </div>
          <hr className="mt-0" />
          <div className="d-flex my-2 mx-2">
            <div>
              <img
                src="/assets/Item/avatar.png"
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
            </div>
            <div>
              <div className="d-flex flex-column">
                <p className="m-0 p-0 mx-1 text-black-50 fw-bold">
                  Ten San Pham
                </p>
                <p className="m-0 p-0 mx-1 text-black-50 fw-bold">Gia</p>
              </div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="bg-light" style={{ height: "435px" }}></div>
          <div className="d-flex mt-1">
            <input
              type="text"
              className="w-90 px-2 mx-2"
              style={{ width: "94%", borderStyle: "none" }}
            />
            <div className="" style={{ width: "5%" }}>
              <button><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(styles.home, styles.chat, "bg-light", "d-flex")}>
      <div className={clsx(styles.userChat, "col-md-4", "m-0", "p-0")}>
        <div>
          <p className="m-0 pt-2 fw-bold text-black-50 mx-2 fs-5">Tat Ca</p>
        </div>
        <hr className="m-0 p-0" />
        <div className={clsx(styles.chat_wrapListUser)}>
          {array.map(() => {
            return (
              <div className="mt-2">
                <div
                  className={clsx(
                    styles.cardUser,
                    "d-flex",
                    "justify-content-between"
                  )}
                >
                  <div className="d-flex mx-2">
                    <div>
                      <img
                        src="/assets/Item/avatar.png"
                        alt=""
                        style={{ height: "46px", width: "46px" }}
                      />
                    </div>
                    <div>
                      <div className="d-flex">
                        <p className="m-0 p-0 mx-1 text-black-50 fw-bold">
                          Ten User
                        </p>
                        <p className="m-0 p-0 mb-1">THoi gian chat</p>
                      </div>
                      <div className="d-flex justify-content-end">
                        <p
                          className="text-dark fst-italic"
                          style={{ right: "0px" }}
                        >
                          Ten san pham
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      src="/assets/Item/avatar.png"
                      alt=""
                      style={{
                        height: "46px",
                        width: "46px",
                        marginRight: "4px",
                      }}
                    />
                  </div>
                </div>
                <hr className="m-0 p-0" />
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-center mt-2">Xoa tat ca</div>
      </div>

      {checkBoxChatNull ? <BoxChatNull /> : <BoxChatNotNull />}
    </div>
  );
};

export default Chat;
