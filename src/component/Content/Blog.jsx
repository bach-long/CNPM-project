import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Content.module.css";
import { Link } from "react-router-dom";

const Blog = () => {
  const inputFile = useRef();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log(typeof files);
    console.log(files);
  }, [files]);

  const ImageUpload = () => {
    return (
      <>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {files.map((file, index) => {
              return (
                <div
                  className={`carousel-item ${styles.blog_boxChooseImg} ${
                    index === 0 ? "active" : ""
                  }`}
                >
                  <div className={clsx(styles.blog_wrapImg)}>
                    <img
                      src={URL.createObjectURL(file)}
                      className={clsx(styles.blog_img)}
                      alt="..."
                    />
                    <div className={clsx("carousel-caption", "d-none", "d-md-block", styles.blog_boxDescripImg)}>
                      <p style={{color: 'black', fontWeight: "bold"}}>
                        {(index+1) + " / " + files.length}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className={clsx(
              "carousel-control-prev",
              "bg-black",
              styles.blog_chooseFileBtnNext
            )}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next bg-black"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </>
    );
  };

  const IconUpload = () => {
    return (
      <label className="d-flex flex-column" for="formFile">
        <i className="fa fa-upload mx-auto fs-1" aria-hidden="true"></i>
        <p className="mx-auto">Vui lòng chọn ảnh</p>
      </label>
    );
  };
  return (
    <div className={clsx(styles.blog, styles.home)}>
      <div className="mx-3 my-4 d-flex w-100">
        <div className="col-md-6">
          <div className="d-flex flex-column">
            <input
              className={clsx(styles.blog_chooseFile)}
              type="file"
              id="formFile"
              multiple="multiple"
              accept="image/png, image/gif, image/jpeg"
              ref={inputFile}
              onChange={() => setFiles([...inputFile.current.files])}
            />
            <label
              for="formFile"
              className={clsx("form-label", styles.blog_chooseFileLabel)}
            >
              <i className="fa fa-upload mx-1 fs-6" aria-hidden="true" />
              Chọn Ảnh
            </label>
            <div className={clsx(styles.blog_boxImgPicked, "form-label")}>
              {files.length > 0 ? <ImageUpload /> : <IconUpload />}
            </div>
          </div>
          <div></div>
        </div>

        <div className="col-md-5">
          <h3>Mô tả sản phẩm</h3>
          <div className=" d-flex flex-column">
            <input
              className={clsx(styles.blog_lineInput)}
              type="text"
              name="inputName"
              placeholder="Tên"
            />
            <select
              className={clsx(styles.blog_lineInput, "form-select")}
              aria-label="Default select example"
            >
              <option selected>Chọn loại sản phẩm</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <input
              className={clsx(styles.blog_lineInput)}
              type="text"
              placeholder="Mô tả chi tiết"
            />
          </div>
          <h3>Thông tin chi tiết</h3>
          <div className=" d-flex">
            <div className="col-md-6">
              <input
                className={clsx(styles.blog_lineInput)}
                type="text"
                placeholder="Hãng"
              />
              <input
                className={clsx(styles.blog_lineInput)}
                placeholder="Giá"
              />
              <input
                className={clsx(styles.blog_lineInput)}
                placeholder="Tình trạng"
              />
            </div>
            <div className="col-md-6">
              <input
                className={clsx(styles.blog_lineInput)}
                type="text"
                placeholder="Bảo hành"
              />
              <input
                className={clsx(styles.blog_lineInput)}
                type="text"
                placeholder="Thông số"
              />
              <input
                className={clsx(styles.blog_lineInput)}
                type="text"
                placeholder="Màu sắc"
              />
            </div>
          </div>
          <h3>Người bán</h3>
          <p>Cá nhân/bán chuyên</p>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autocomplete="off"
              checked
            />
            <label className="btn btn-outline-primary" for="btnradio1">
              Cá nhân
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio3"
              autocomplete="off"
            />
            <label className="btn btn-outline-primary" for="btnradio3">
              Bán chuyên
            </label>
          </div>
          <div className="mb-4 d-flex flex-column">
            <input
              className={clsx(styles.blog_lineInput)}
              type="text"
              placeholder="Địa chỉ người bán"
            />
            <button className="btn btn-warning mt-3">Đăng tin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
