import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import styles from "./Content.module.css";
import { useSelector, useDispatch } from "react-redux";
import { user } from "../../redux/action";
import { Selector } from "react-redux";
import socket from "./socket";

//socket.emit('online', inforUser);
const Chat = () => {
  const inforUser = useSelector((state) => state.Login);
  const [checkBoxChatNull, setCheckBoxChat] = useState(true);
  const [listChats, setListChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState({});
  const token = localStorage.getItem("token");
  const [newMessage, setNewMessage] = useState(true);
  const [user2, setUser2] = useState("");
  const boxMess = useRef(null);
  const username2Default = useLocation().state.username2;

  const msg = useRef("");
  socket.on("getMessage", function (data) {
    setNewMessage(!newMessage);
  });
  window.addEventListener("beforeunload", function (e) {
    socket.emit("offline", inforUser);
  });

  const dispatch = useDispatch();

  const reloadLogin = () => {
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
  };
  useEffect(reloadLogin, []);

  useEffect(() => {
    var ojData = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:5000/api/chat/chatList", ojData)
      .then((res) => res.json())
      .then(function (res) {
        setListChats(res);
        var check = true;
          res.forEach(function (cvs) {
            if (
              cvs.username1 === username2Default ||
              cvs.username2 === username2Default
            ) {
              setUser2(username2Default);
              setConversation(cvs);
              console.log(cvs)
              console.log("set username default");
              check = false;
            }
          });
          if (check && res[0]) {
            const cvs = res[0];
            console.log("set magn");
            setConversation(res[0]);
            setUser2(
              cvs.username2 !== inforUser.username
                ? cvs.username2
                : cvs.username1
            );
          }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (listChats.length > 0) {
      setCheckBoxChat(false);
    }
  }, [listChats]);

  const getMessageFetch = () => {
    console.log('setMessags')
    function fetchMess() {
      var ojData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(
        `http://127.0.0.1:5000/api/chat/messages/${conversation.conversationId}`,
        ojData
      )
        .then((res) => res.json())
        .then(function (res) {
          setMessages(res);
          boxMess.current.scrollTop = boxMess.current.scrollHeight;
        })
        .catch((error) => console.log(error));
    }
    if (conversation !== undefined) {
      fetchMess();
    }
  };

  useEffect(getMessageFetch, [conversation]);
  useEffect(getMessageFetch, [newMessage]);

  function clickCardChat(chat) {
    var user2 =
      chat.username2 !== inforUser.username ? chat.username2 : chat.username1;
    setUser2(user2);
    setConversation(chat);
  }

  const clickSendMessage = (e) => {
    socket.emit("sendMessage", {
      username1: inforUser.username,
      username2:
        inforUser.username == conversation.username1
          ? conversation.username2
          : conversation.username1,
      context: msg.current.value,
    });
    setNewMessage(!newMessage);
  };

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
                <p className="m-0 p-0 mx-1 fw-bold" style={{ color: "red" }}>
                  Gia
                </p>
              </div>
            </div>
          </div>
          <hr className="my-0" />
          <div
            className={clsx("bg-light", styles.boxChatMessage)}
            style={{ height: "435px" }}
            ref={boxMess}
          >
            <div className="text-center fst-italic">
              <p>Bạn và người bán đã được kết nối hãy chat với nhau nào</p>
            </div>
            {messages.map((message) => {
              var css = message.username === user2;
              return (
                <div
                  className={css ? styles.messageBlue : styles.messageOrange}
                >
                  <p className={clsx(styles.messageContent)}>
                    {message.context}
                  </p>
                  <div
                    className={clsx(
                      css ? styles.messageTimestampLeft : "",
                      "text-right"
                    )}
                  >
                    <p className="m-0">{message.createdAt}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex mt-1">
            <input
              type="text"
              ref={msg}
              className="w-90 px-2 mx-2"
              style={{ width: "94%", borderStyle: "none" }}
            />
            <div className="" style={{ width: "5%" }}>
              <button onClick={(e) => clickSendMessage(e)}>
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
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
          {listChats.map((chat) => {
            return (
              <div
                className={`${styles.boxCardChat} "pt-2" ${chat.conversationId===conversation.conversationId?"bg-black-50":''}`}
                onClick={(e) => clickCardChat(chat)}
              >
                <div
                  className={clsx(
                    styles.cardUser,
                    "d-flex",
                    "justify-content-between "
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
                          {chat.username2 !== inforUser.username
                            ? chat.username2
                            : chat.username1}
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
      </div>

      {checkBoxChatNull ? <BoxChatNull /> : <BoxChatNotNull />}
    </div>
  );
};

export default Chat;
