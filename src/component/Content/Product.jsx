import { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addCart } from "../../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import clsx from "clsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Content.module.css";
import Comment from "./Comment";
import { user } from "../../redux/action";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [statusLogin, setStatusLogin] = useState(false);
  const inforUser = useSelector((state)=> state.Login);  
  const token = localStorage.getItem('token');
  
  const addProduct = (product) => {
    dispatch(addCart(product));
  };


  const boxScroll = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:5000/api/goods/${id}`);
      const response2 = await fetch("http://127.0.0.1:5000/api/goods");
      const p = await response.clone().json();
      const object = await response2.clone().json();
      const products = object.goods;
      const response4 = await fetch(`http://127.0.0.1:5000/api/users/${p.userId}`)
      setProduct(p);
      setFilter(
        products.filter((pf) => pf.tagId === p.tagId && pf.goodId !== p.goodId)
      );
      const userRes = await response4.clone().json()
      setUser(userRes);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  

  useEffect(()=>{

  })

  useEffect(()=> {
    setStatusLogin(inforUser.username)
  })

  useEffect(()=> {
    const token = localStorage.getItem('token')
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
  },[]);

  /**scrollbar */

  const scrollLeft = () => {
    boxScroll.current.scrollLeft -= 400;
  };

  const scrollRight = () => {
    boxScroll.current.scrollLeft += 400;
  };

  const chat = (username2) => {
    if (username2 !== inforUser.username) {
      console.log(username2)
      var ojData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      fetch("http://127.0.0.1:5000/api/chat/chatList", ojData)
        .then((res) => res.json())
        .then(function (res) {
           const check = true;
            res.forEach(function (cvs) {
              if (
                cvs.username1 === username2 ||
                cvs.username2 === username2
              ) {
                navigate('/chat', {state:{username2: username2}})
                check = false;
              }
            });
  
            if (check) {
              var data = { username1: inforUser.username, username2:username2};
              //  var data = { username2: username2};
              console.log(data)
              var ojData = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                credentials: "follow",
                body: JSON.stringify(data)
              };
              fetch(
                `http://127.0.0.1:5000/api/chat/newChat`,
                ojData
              )
                .then((res) => res.json())
                .then(function (res) {
                  navigate('/chat',{state:{username2:username2}})
                })
                .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    }
  }

  /**Loaing */
  const Loading = () => {
    return (
      <>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  /**Loading OfferProduct */

  const LoadingOffer = () => {
    return (
      <div className={clsx(styles.boxProductOffer)}>
        <div className={clsx(styles.scroll_bn)}>
          <i className="fa fa-chevron-left"></i>
        </div>
        <div className={clsx(styles.wrapProductOffer)}>
          <Skeleton height={200} width={150} className="mx-3"></Skeleton>
          <Skeleton height={200} width={150} className="mx-3"></Skeleton>
          <Skeleton height={200} width={150} className="mx-3"></Skeleton>
          <Skeleton height={200} width={150} className="mx-3"></Skeleton>
          <Skeleton height={200} width={150} className="mx-3 mb-4"></Skeleton>
        </div>
        <div className={clsx(styles.scroll_bn)}>
          <i className="fa fa-chevron-right"></i>
        </div>
      </div>
    );
  };

  /**Show productOffer */

  const ShowProductOffer = () => {
    return (
      <div className={clsx(styles.boxProductOffer)}>
        <div className={clsx(styles.scroll_bn)} onClick={scrollLeft}>
          <i className="fa fa-chevron-left"></i>
        </div>
        <div className={clsx(styles.wrapProductOffer)} ref={boxScroll}>
          {filter.map((p) => {
            const img = p.images;
            const img0 = img[0]?img[0].link:null;
            return (
              <div
                className={clsx(styles.cardOffer, styles.cardProduct)}
                onClick={() => navigate(`/products/${p.goodId}`)}
              >
                <div className={clsx(styles.card_box_image)}>
                  <img
                    src={`http://localhost:5000/${img0}`}
                    className={clsx(styles.card_image)}
                    alt={p.name}
                  />
                </div>
                <div className={clsx(styles.textNoLink, "card-body")}>
                  <p className={clsx(styles.productOffer_title, "card-text")}>
                    {p.description.slice(0,60)}
                  </p>
                  <p className={clsx("card-text", styles.colorText_Red )}>{"Gia: " + p.price + "$"}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={clsx(styles.scroll_bn)} onClick={scrollRight}>
          <i className="fa fa-chevron-right"></i>
        </div>
      </div>
    );
  };

  /**Product */
  const ShowProduct = () => {
    return (
      <>
        <div className={clsx("col-md-8")}>
          <div className={clsx(styles.shadow, "mt-3")}>
            <div
              id="carouselExampleIndicators"
              className="carousel slide bgSmoker"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {product.images?product.images.map((image, index)=> {
                  return (
                    <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index}
                    className="active"
                    aria-current="true"
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                  )
                }):''}
              </div>
              <div className="carousel-inner backgroundColor2">
              {product.images?product.images.map((image,index)=> {
                  return (
                    <div className={`carousel-item ${index===0?"active":''}`}>
                      <div className="d-flex justify-content-center">
                      <img
                          src={`http://localhost:5000/${image.link}`}
                          className={clsx(styles.productImage)}
                         alt={product.name}
                        />
                      </div>
                    </div>
                  )
                }):''}
              </div>
                
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="description mt-4">
            <h4 className="text-uppercase text-black-35">{product.name}</h4>
            <p className="text-black-26 fw-bold">{product.name}</p>
            <h3 className="display-6 fw-bold my-4">${product.price}</h3>
            <p className="lead">{product.description}</p>

            <div className="d-flex">
              <div className="col-md-6 d-flex flex-column">
                <p>
                  <i className="fa fa-tag mx-1"></i>Hang: {product.brand?product.brand:'Hien chua co thong tin'}
                </p>
                <p>
                  <i className="fa fa-check-square-o mx-1"></i>Tinh trang: {product.state?product.state:'Hien chua co thong tin'}
                </p>
                <p>
                  <i className="fa fa-spinner mx-1"></i>Mau sac: {product.color?product.color:'Hien chua co thong tin'}
                </p>
              </div>
              <div className="col-md-6 d-flex flex-column mx-1">
                <p>
                  <i className="fa fa-table mx-1"></i>Loai: {product.type?product.type:'Hien chua co thong tin'}
                </p>
                <p>
                  <i className="fa fa-shield mx-1"></i>Bao Hanh: {product.maintenance?product.maintenance:'Hien chua co thong tin'}
                </p>
                <p>
                  <i className="fa fa-building mx-1"></i>Thong So: {product.details?product.details:'Hien chua co thong tin'}
                </p>
              </div>
            </div>

            <hr />

            <div className="">
              <i className="fa fa-map-marker"></i>Dia chi nguoi ban: {user.address?user.address:'Hien chua co thong tin'}
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex flex-column">
          <hr />
          <div className={clsx("d-flex", "justify-content-between", "my-2")}>
            <div className="d-flex">
              <div className={clsx(styles.hw50)}>
                <img
                  src="/assets/Item/avatar.png"
                  alt=""
                  className={clsx(styles.hw50)}
                />
              </div>
              <div className="mx-1">
                <div className=" text-uppercase">{user.username}</div>
                <div>Hoat Dong</div>
              </div>
            </div>
            <div>
              <button className="btn btn-outline-warning" onClick={()=>navigate('/userInfor', {state:{userId:user.userId}})}>Xem Trang</button>
            </div>
          </div>
          <div className="d-flex mb-4">
            <div className="col-md-4">
              <div className="text-center fw-bold">Bán Chuyên</div>
              <div className=" text-center">
                <i className="fa fa-briefcase"></i>
              </div>
            </div>
            |
            <div className="col-md-4">
              <div className="text-center fw-bold">Đánh giá</div>
              <div className="lead fw-bolder text-center">
                {product.rating && product.rating.rate}
                <i className="fa fa-star"></i>
              </div>
            </div>
            |
            <div className="col-md-4">
              <div className=" text-center fw-bold">Phản hồi</div>
              <div className=" text-center fw-bold">83%</div>
            </div>
          </div>
          <button className="btn btn-outline-dark mx-1 mt-2">
            Số điện thoại liên hệ
          </button>
          <button className="btn btn-outline-dark mx-1 mt-2" onClick={()=>chat(user.username)}>
            Chat voi nguoi ban
          </button>
          <div className="buttons d-flex flex-column">
            <button
              className="btn btn-outline-dark mx-1 mt-2"
              // onClick={() => addProduct(product)}
              onClick={() => !statusLogin?navigate('/sigin'):addProduct(product)}
            >
              <i className="fa fa-cart-plus"></i>
              Thêm vào giỏ hàng
            </button>
            <Link
              to={statusLogin?"/cart":"/sigin"}
              className={clsx(styles.greenBtn, "btn", "mx-1", "mt-2")}
            >
              Mua ngay
            </Link>
          </div>
          <div className="d-flex mx-0 mt-2">
            <div className="mt-3">
              <img
                src="/assets/Item/6_mobile.png"
                width={100}
                height={"auto"}
                alt=""
              />
            </div>
            <div>
              <p
                className={clsx(
                  styles.textJustify,
                  "fst-italic",
                  "fw-light",
                  "m-lg-2"
                )}
              >
                Lựa chọn hình thức giao hàng an toàn-uy tín-hiệu quả, khi nhận
                hàng hãy kiểm tra cẩn thận chất lượng sản phẩm sau đó mới trả
                tiền.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={clsx(styles.home, "bg-light")}>
        <div className="container">
          <div className="row py-5">
            {loading ? <Loading /> : <ShowProduct />}
          </div>
        </div>
      </div>

      <div className={clsx(styles.home, "bg-light", "mt-2")}>
        <div className="mx-4 pt-2">
          <h2>San pham tuong tu</h2>
        </div>
        <hr />
        {loading?<LoadingOffer/>:<ShowProductOffer/>}
      </div>

        <Comment id={id}/>
    </>
  );
};

export default Product;