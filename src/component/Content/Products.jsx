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
      name: "Bat dong san",
      src: `${pathshort}free.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}dichvudulich.png`,
      category: "women's clothing",
    },
    { name: "Bat dong san", src: `${pathshort}doan.png`, category: "jewelery" },
    {
      name: "Bat dong san",
      src: `${pathshort}dodientu.png`,
      category: "electronics",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}dodungvanphong.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}dogiadung.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}giaitri.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}maygiat.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}mevabe.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}nhacua.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}thoitrang.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}thucung.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}vieclam.png`,
      category: "men's clothing",
    },
    {
      name: "Bat dong san",
      src: `${pathshort}xeco.png`,
      category: "men's clothing",
    },
  ];

  function getCurPage(page) {
    setPage(page);
    console.log(page)
  }

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://fakestoreapi.com/products");

      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
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
    const updatedList = data.filter((x) => x.category === cat);
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
              >
                <div>
                  <img
                    src={productLine.src}
                    alt=""
                    style={{ height: "84px", weight: "84px" }}
                  />
                  <div>{productLine.name}</div>
                </div>
              </button>
            );
          })}
          </div>
        </div>
        <h1>San pham</h1>
        <hr />

        {filter.map((product,index) => {
          return (
              <div
              key={index}
                className={`col-md-3 mb-4 ${styles.cardProduct}`}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className="card h-100 text-center" key={product.id}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.title.substring(0, 12)}
                    </h5>
                    <p className="card-text">${product.price}</p>
                    <Link
                      to={`/products/${product.id}`}
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
