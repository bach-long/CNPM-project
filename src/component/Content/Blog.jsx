import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Content.module.css";
import { Link, useNavigate } from "react-router-dom";

const Blog = () => {
  const inputFile = useRef();
  const [messageError, setmessageError] = useState('test');
  const [files, setFiles] = useState([]);
  const tagID = ['Bất động sản', 'Xe cộ', 'Đồ điện tử', 'Việc làm', 'Thú cưng','Đồ ăn và thực phẩm', 'Tủ lạnh máy giặt', 'Đồ gia dụng','Mẹ và bé', 'Thời trang và đồ dùng cá nhân', 'Giải trí, thể thao', 'Đồ dùng văn phòng', 'Dịch vụ du lịch']
  const name = useRef(null);
  const price = useRef(null);
  const state = useRef(null);
  const brand = useRef(null);
  const type = useRef(null);
  const maintenance = useRef(null);
  const details = useRef(null);
  const color = useRef(null);
  const tag = useRef(null);
  const description = useRef(null);
  const address = useRef(null);
  var status;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');



  const sendData = ()=> {
    var data = {
      name: name.current.value,
      description: description.current.value,
      address: address.current.value,
      price: price.current.value,
      state: state.current.value,
      brand: brand.current.value,
      type: type.current.value.checked?'Ban Chuyen':'Ca nhan',
      maintenance: maintenance.current.value,
      details: details.current.value,
      color: color.current.value,
      tagId: tag.current.selectedOptions[0].getAttribute('value')
    }
    console.log(data)
    // name.current.value = '';
    // description.current.value = '';
    // address.current.value = '';
    // price.current.value = '';
    // state.current.value = '';
    // brand.current.value = '';
    // type.current.value = '';
    // details.current.value = '';
    // color.current.value = '';
    // brand.current.value = '';
    setmessageError('')
   postData(data);
  }



  const postData = (data) => {
    var ojData = {
      method: 'POST',
      credentials: "include",
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`,
               },
      body: JSON.stringify(data)
    }
    fetch("http://127.0.0.1:5000/api/goods/", ojData)
      .then(function(response) {
        status = response.status;
          return response.json();
      })
        
      .then(function(res) {
        if (status === 201) {
          navigate('/')
          setmessageError('Dang nhap thanh cong')
        } else {
          console.log(res)
          setmessageError(res.error)
        }
      })
  }

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
              ref={name}
            />
            <select
              className={clsx(styles.blog_lineInput, "form-select")}
              aria-label="Default select example"
              ref={tag}
            >
              <option selected>Chọn loại sản phẩm</option>
              {tagID.map((tag,index)=> {
                return (
                  <option value={index + 1}>{tag}</option>
                )
              })}
            </select>
            <textarea
              className={clsx(styles.blog_lineInput)}
              placeholder="Mô tả chi tiết"
              style={{height:'100px'}}
              ref={description}
            />
          </div>
          <h3>Thông tin chi tiết</h3>
          <div className=" d-flex">
            <div className="col-md-6">
              <input
                className={clsx(styles.blog_lineInput)}
                type="text"
                placeholder="Hãng"
                ref={brand}
              />
              <input
                className={clsx(styles.blog_lineInput)}
                placeholder="Giá"
                ref={price}
              />
              <input
                className={clsx(styles.blog_lineInput)}
                placeholder="Tình trạng"
                ref={state}
              />
            </div>
            <div className="col-md-6">
              <input
                className={clsx(styles.blog_lineInput)}
                type="text"
                placeholder="Bảo hành"
                ref={maintenance}
              />
              <input
                className={clsx(styles.blog_lineInput)}
                type="text"
                placeholder="Thông số"
                ref={details}
              />
              <input
                className={clsx(styles.blog_lineInput)}
                type="text"
                placeholder="Màu sắc"
                ref={color}
              />
            </div>
          </div>
          <h3>Người bán</h3>
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
              ref={type}
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
              ref={address}
            />
            <div style={{color:'red', fontSize:'13px'}} className="fst-italic">{messageError}</div>
            <button className="btn btn-warning mt-3" onClick={()=>sendData()}>Đăng tin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
