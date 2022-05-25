import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import clsx from "clsx";
import Pagination from "./Pagination";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Content.module.css";
import { user } from "../../redux/action";

const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(5);
  const inputComment = useRef(null);
  const token = localStorage.getItem('token')
  const getUserComment = (userId) => {
    return fetch(`http://127.0.0.1:5000/api/users/${userId}/`)
      .then((response) => response.json())
      .then((res) => {
        test = res;
      })
      .catch(console.log("error"));
  };

  const getRate = (e)=>{
    setRate(e.target.getAttribute("value"))
  }

  const boxRate = useRef(null);

  const postComment = () => {
    var raw = JSON.stringify({
      "userId": 1,
      "content": "zo zo zo zo zo"
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:5000/api/goods/1/comments", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response3 = await fetch(
        `http://127.0.0.1:5000/api/goods/${props.id}/comments`
      );
      var commentsSv = await response3.clone().json();
      
      setComments(commentsSv);
      setLoading(false);
    };
    getProduct();
  }, [props.id]);

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
        <p>
          {comments.length > 0
            ? `Hien co ${comments.length} binh luan`
            : "Hien chua co danh gia nao"}
        </p>
      </div>
      <hr className="mb-0" />
      <div className="mx-4 pt-2 d-flex flex-column">
        <h4>Đánh giá của bạn</h4>
        <div>
        <div className={clsx(styles.rate, "mx-3")} useRef={boxRate}>
          <input type="radio" className="d-none" id="star5" name="rate"  />
          <label for="star5" title="text" onClick={e=>getRate(e)} value="5"></label>
          <input type="radio" className="d-none" id="star4" name="rate"  />
          <label for="star4" title="text" onClick={e=>getRate(e)} value="4"></label>
          <input type="radio" className="d-none" id="star3" name="rate"  />
          <label for="star3" title="text" onClick={e=>getRate(e)} value="3"></label>
          <input type="radio" className="d-none" id="star2" name="rate" />
          <label for="star2" title="text" onClick={e=>getRate(e)}  value="2"></label>
          <input type="radio" className="d-none " id="star1" name="rate" />
          <label for="star1" title="text"  onClick={e=>getRate(e)} value="1" ></label>
          
        </div>
        </div>   
        <div className="bg-light d-flex" style={{ borderRadius: "8px" }}>
          <input type="text" className="mx-4 px-2" style={{ width: "80%",height:'40px' }} />
          <button>submit</button>
        </div>
      </div>
      <hr className="mb-0" />
      <div className={clsx(styles.boxComments, "mt-4")}>
        {comments.map((comment) => {
          return (
            <div className={clsx(styles.wrapComment, "pt-2")}>
              <div className={clsx(styles.boxUsers)}>
                <img
                  src="/assets/Item/avatar.png"
                  alt=""
                  className={clsx(styles.h36)}
                  style={{ width: "36px" }}
                />
                <p
                  className="mx-2 mt-1 mb-0"
                  style={{ fontSize: "14px", fontStyle: "italic" }}
                >
                  {"user " + comment.userId}
                </p>
              </div>
              <div className={clsx(styles.boxRate)}>
                <div className="d-flex">{renderStar(5)}</div>
                <div className={clsx(styles.comment)}>{comment.content}</div>
                <div
                  style={{ fontSize: "11px", fontStyle: "italic" }}
                  className="mt-1"
                >
                  {comment.createdAt}
                </div>
                <FeedBackSell></FeedBackSell>
              </div>
            </div>
          );
        })}
        <hr className="mt-1" />
        <Pagination page={1} pageCounts={3} />
      </div>
    </div>
  );
};

export default Comment;
