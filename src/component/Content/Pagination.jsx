import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Content.module.css";
import { Link } from "react-router-dom";
import { actionSetCurPage } from "../../redux/action";
import { useDispatch} from "react-redux";


const Pagination = (props) => {
  const [numberPage, setNumberPage] = useState(props.page);
  const [truncate, setTruncate] = useState(true);
  const paginationBox = useRef(null);
  const btnPrevPg = useRef(null);
  const btnNextPg = useRef(null);
  const btnFirstPg = useRef(null);
  const btnLastPg = useRef(null);
  const dispatch = useDispatch();
  var r = [];
  var valuePage = {
    truncate: true,
    curPage: 1,
    numLinksTwoSide: 1,
    totalPages: props.pageCounts,
  };

  function pagination() {
    const { totalPages, numLinksTwoSide: delta } = valuePage;

    const range = delta + 4; // use for handle visible number of links left side
    let render = [];
    let renderTwoSide = [];
    let dot = (
      <li className="page-item">
        <a className="page-link"  action="javascript: false"
              href="javascript: false">
          ...
        </a>
      </li>
    );
    let countTruncate = 0; // use for ellipsis - truncate left side or right side

    // use for truncate two side
    const numberTruncateLeft = numberPage - delta;
    const numberTruncateRight = numberPage + delta;

    let active = "";
    for (let pos = 1; pos <= totalPages; pos++) {
      active = pos === numberPage ? "active" : "";

      // truncate
      if (totalPages >= 2 * range - 1 && truncate) {
        if (
          numberTruncateLeft > 3 &&
          numberTruncateRight < totalPages - 3 + 1
        ) {
          // truncate 2 side
          if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
            renderTwoSide = [...renderTwoSide, renderPage(pos, active)];
          }
        } else {
          // truncate left side or right side
          if (
            (numberPage < range && pos <= range) ||
            (numberPage > totalPages - range &&
              pos >= totalPages - range + 1) ||
            pos === totalPages ||
            pos === 1
          ) {
            render = [...render, renderPage(pos, active)];
          } else {
            countTruncate++;
            if (countTruncate === 1) render = [...render, dot];
          }
        }
      } else {
        render = [...render, renderPage(pos, active)];
      }
    }

    if (renderTwoSide.length > 1) {
      r = [renderPage(1), dot, ...renderTwoSide, dot, renderPage(totalPages)];
    } else {
      r = [...render];
    }
  }


  function renderPage(index, active = "") {
    return (
      <li className={`page-item ${active}`} key={index}>
        <a className="page-link" action="javascript: false"
              href="javascript: false"  value={index}>
          {index}
        </a>
      </li>
    );
  }

  const selectNumberContainer = (e) => {
    const ele = e.target;
    if (ele.getAttribute("value")) {
      setNumberPage(parseInt(ele.getAttribute("value")));
      props.getData(parseInt(ele.getAttribute("value")))
    }
  };

  const nextPage = () => {
    if (numberPage < valuePage.totalPages) {
      setNumberPage(numberPage + 1);
      props.getData(numberPage + 1)
    }
  };

  const prevPage = () => {
    if (numberPage > 1) {
      setNumberPage(numberPage - 1);
      props.getData(numberPage - 1)
    }
  };

  const firstPage = () => {
    setNumberPage(1);
    props.getData(1)
  };

  const lastPage = () => {
    setNumberPage(valuePage.totalPages);
    props.getData(valuePage.totalPages)
  };
  pagination();

  useEffect(() => {
    pagination();
  }, [numberPage]);

  return (
    <div className={clsx(styles.paginationBox)}>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" ref={btnFirstPg} onClick={firstPage}>
            <a
              className="page-link"
              action="javascript: false"
              href="javascript: false"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item" ref={btnPrevPg}>
            <a
              className="page-link"
              action="javascript: false"
              href="javascript: false"
              aria-label="Previous"
              onClick={prevPage}
            >
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </a>
          </li>
          <div
            className={clsx(styles.pagination_listButton)}
            ref={paginationBox} 
            onClick={e=>selectNumberContainer(e)}
          >
            {r}
          </div>
          <li className="page-item" ref={btnNextPg} onClick={nextPage}>
            <a
              className="page-link"
              action="javascript: false"
              href="javascript: false"
              aria-label="Next"
            >
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li className="page-item" ref={btnLastPg} onClick={lastPage}>
            <a
              className="page-link"
              action="javascript: false"
              href="javascript: false"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
