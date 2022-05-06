import React from "react";
import clsx from "clsx";
import styles from "./Content.module.css";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className={clsx(styles.blog, styles.home)}>
      <div className="mx-3 my-4 d-flex w-100">
        <div className="col-md-5">
          <div>
            <label for="formFile" class="form-label">
              Chọn ảnh
            </label>
            <input class="form-control w-75" type="file" id="formFile" />
          </div>
          <div>
          <label for="formFile" class="form-label">
              Chọn Video
            </label>
            <input class="form-control w-75" type="file" id="formFile" />
          </div>
        </div>

        <div className="col-md-5">
          <h3>Mô tả sản phẩm</h3>
          <div className=" d-flex flex-column">
            <input className="my-2" type="text" placeholder="Tên" />
            <input className="my-2" type="text" placeholder="Giá" />
            <input className="my-2" type="text" placeholder="Mô tả chi tiết" />
          </div>
          <h3>Thông tin chi tiết</h3>
          <div className=" d-flex">
            <div className="col-md-6">
              <input className="mt-2" type="text" placeholder="Hãng" />
              <input className="mt-2" type="text" placeholder="Loại" />
              <input className="mt-2" type="text" placeholder="Tình trạng" />
            </div>
            <div className="col-md-6">
              <input className="mt-2" type="text" placeholder="Bảo hành" />
              <input className="mt-2" type="text" placeholder="Thông số" />
              <input className="mt-2" type="text" placeholder="Màu sắc" />
            </div>
          </div>
          <h3>Người bán</h3>
          <p>Cá nhân/bán chuyên</p>
          <div>
            <button>Cá nhân</button>
            <button>Bán Chuyên</button>
          </div>
          <div className="mb-4 d-flex flex-column">
            <input
              className="mt-2"
              type="text"
              placeholder="Địa chỉ người bán"
            />
            <button className="btn btn-warning mt-5">Đăng tin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
