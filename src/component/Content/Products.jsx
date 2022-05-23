import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Content.module.css";
import Pagination from "./Pagination";


const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [page,setPage] = useState(1);
  let componentMounted = true;
  const navigate = useNavigate();
  const pathshort = "/assets/iconKhamPha/";
  const doc = useRef(null);

  
  const listProductLine = [
    {
      name: "Cho tặng miễn phí",
      src: `${pathshort}free.png`,
      category: "men's clothing",
    },
    {
      name: "Dịch vụ du lịch",
      src: `${pathshort}dichvudulich.png`,
      category: 13,
    },
    { name: "Đồ ăn", 
      src: `${pathshort}doan.png`, 
      category: 6 },
    {
      name: "Đồ điện tử",
      src: `${pathshort}dodientu.png`,
      category: 3,
    },
    {
      name: "Đồ dùng văn phòng",
      src: `${pathshort}dodungvanphong.png`,
      category: 12,
    },
    {
      name: "Đồ gia dụng",
      src: `${pathshort}dogiadung.png`,
      category: 8,
    },
    {
      name: "Giải trí",
      src: `${pathshort}giaitri.png`,
      category: 11,
    },
    {
      name: "Máy giặt tủ lạnh",
      src: `${pathshort}maygiat.png`,
      category: 7,
    },
    {
      name: "Mẹ và bé",
      src: `${pathshort}mevabe.png`,
      category: 9,
    },
    {
      name: "Bất động sản",
      src: `${pathshort}nhacua.png`,
      category: 1,
    },
    {
      name: "Thời trang",
      src: `${pathshort}thoitrang.png`,
      category: 10,
    },
    {
      name: "Thú cưng",
      src: `${pathshort}thucung.png`,
      category: 5,
    },
    {
      name: "Việc làm",
      src: `${pathshort}vieclam.png`,
      category: 4,
    },
    {
      name: "Xe cộ",
      src: `${pathshort}xeco.png`,
      category: 2,
    },
  ];

  function getCurPage(page) {
    setPage(page);
    console.log(page)
  }

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/goods");

      if (componentMounted) {
        const object = await response.clone().json();
        setData(object.goods);
        console.log(object.goods)
        setFilter(object.goods);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
      
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3 mb-4">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.tagId == cat);
    setFilter(updatedList);
  };


  const ShowProducts = () => {
    return (
      <>
        <div className="buttons mb-4 pb-4">
        <button
            className="btn btn-outline-dark me-2 mb-2"
            onClick={() => setFilter(data)}
        >
            All
        </button>
        <div className="grid">
          {listProductLine.map((productLine,index) => {
            return (
              <button
                key={index}
                className="btn btn-outline-dark me-2 mb-1"
                onClick={() => filterProduct(productLine.category)}
                style={{height:'135px', width:'120px'}}
              >
                <div>
                  <img
                    src={productLine.src}
                    alt=""
                    style={{ height: "84px", weight: "84px" }}
                  />
                  <div style={{fontSize:'14px'}}>{productLine.name}</div>
                </div>
              </button>
            );
          })}
          </div>
        </div>
        <h1>San pham</h1>
        <hr />

        {filter.map((product,index) => {
          const img = product.images;
          const img0 = img[0]?img[0].link:null;
          return (
              <div
              key={index}
                className={`col-md-3 mb-4 ${styles.cardProduct}`}
                onClick={() => navigate(`/products/${product.goodId}`)}
              >
                <div className="card h-100 text-center" key={product.goodId}>
                  <img
                    src={`http://localhost:5000/${img0}`}
                    className="card-img-top"
                    alt={product.name}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.description.substring(0, 12)}
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
              </div>
          );
        })}
        <Pagination getData={getCurPage} page={page}/>
      </>
    );
  };


  return (
    <div>
      <div className="my-5 bg-light" ref={doc}>
        <div className="row">
          <div className="col-12 mb-5 pt-3">
            <h1
              className="display-6 fw-bolder
                        text-center"
            >
              Khám phá danh mục
            </h1>
            <hr></hr>
          </div>
        </div>
        <div className="row justify-content-center m-3">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
