import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";
import styles from "./Content.module.css";



const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const boxScroll = useRef(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`http://fakestoreapi.com/products/${id}`);
      const response2 = await fetch("http://fakestoreapi.com/products");
      var p = await response.json();
      var products = await response2.json();
      setProduct(p);
      setFilter(
        products.filter((pf) => pf.category === p.category && pf.id !== p.id)
      );
      setLoading(false);
    };
    getProduct();
  }, []);

  /**scrollbar */

  const scrollLeft = ()=>{
    boxScroll.current.scrollLeft -= 400;
  }

  const scrollRight = ()=>{
    boxScroll.current.scrollLeft += 400;
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
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner backgroundColor2">
                <div className="carousel-item active d-flex justify-content-center">
                  <img
                    src={product.image}
                    className={clsx(styles.productImage)}
                    alt={product.title}
                  />
                </div>
                <div className="carousel-item d-flex justify-content-center">
                  <img
                    src={product.image}
                    className={clsx(styles.productImage)}
                    alt={product.title}
                  />
                </div>
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
            <h4 className="text-uppercase text-black-35">{product.category}</h4>
            <p className="text-black-26 fw-bold">{product.title}</p>
            <h3 className="display-6 fw-bold my-4">${product.price}</h3>
            <p className="lead">{product.description}</p>

            <div className="d-flex">
              <div className="col-md-6 d-flex flex-column">
                <p>
                  <i className="fa fa-tag mx-1"></i>Hang
                </p>
                <p>
                  <i className="fa fa-check-square-o mx-1"></i>Tinh trang
                </p>
                <p>
                  <i className="fa fa-spinner mx-1"></i>Mau sac
                </p>
              </div>
              <div className="col-md-6 d-flex flex-column mx-1">
                <p>
                  <i className="fa fa-table mx-1"></i>Loai
                </p>
                <p>
                  <i className="fa fa-shield mx-1"></i>Bao Hanh
                </p>
                <p>
                  <i className="fa fa-building mx-1"></i>Thong So
                </p>
              </div>
            </div>

            <hr />

            <div className="">
              <i className="fa fa-map-marker"></i>Dia chi nguoi ban
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
                <div>Ten Nguoi ban</div>
                <div>Hoat Dong</div>
              </div>
            </div>
            <div>
              <button className="btn btn-outline-warning">Xem Trang</button>
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
          <button className="btn btn-outline-dark mx-1 mt-2">
            Chat voi nguoi ban
          </button>
          <div className="buttons d-flex flex-column">
            <button
              className="btn btn-outline-dark mx-1 mt-2"
              onClick={() => addProduct(product)}
            >
              <i className="fa fa-cart-plus"></i>
              Thêm vào giỏ hàng
            </button>
            <Link
              to="/cart"
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
        <div className="mx-4">
          <h2>San pham tuong tu</h2>
        </div>
        <hr />
        <div className={clsx(styles.boxProductOffer)}>
          <div className={clsx(styles.scroll_bn)} onClick={scrollLeft}>
            <i className="fa fa-chevron-left"></i>
          </div>
          <div className={clsx(styles.wrapProductOffer)} ref={boxScroll}>
            {filter.map((p) => {
              return (
                <div className={clsx(styles.cardOffer,styles.cardProduct)}>
                  <div className={clsx(styles.card_box_image)}>
                    <img
                      src={p.image}
                      className={clsx(styles.card_image)}
                      alt={p.category}
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-text">{p.title}</p>
                    <p className="card-text">{"Gia: " + p.price + "$"}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={clsx(styles.scroll_bn)} onClick={scrollRight}>
            <i className="fa fa-chevron-right" ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
