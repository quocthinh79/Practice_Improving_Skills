import classNames from "classnames/bind";
import styles from "./Lab1Animation.module.scss";
import stylesCSS from "./Lab1Animation.scss";
import avatar from "~/assets/ImageLab1Animation/avatar.jpg";
import image1 from "~/assets/ImageLab1Animation/1.png";
import image2 from "~/assets/ImageLab1Animation/2.png";
import image3 from "~/assets/ImageLab1Animation/3.png";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCaretDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faKeyboard,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);
const cxCSS = classNames.bind(stylesCSS);

function Lab1Animation() {
  const imageArray = [
    image1,
    image2,
    image3,
    image1,
    image2,
    image3,
    image1,
    image2,
    image2,
    image2,
  ];

  const element = [];
  const table = [];
  let conditionLoop1 =
    imageArray.length % 3 === 0 ? imageArray.length : imageArray.length + 1;
  let countIdItem = 0;
  let countTableIdItem = 0;

  const refsGroupItems = {};
  const refsTable = {};

  for (let i = 0; i < conditionLoop1; i += 3) {
    refsGroupItems[countIdItem] = React.createRef(null);
    refsTable[countTableIdItem] = React.createRef(null);
    element.push(
      <div
        ref={refsGroupItems[countIdItem]}
        key={countIdItem++}
        className={cx("group")}
        id={cx("group_item_" + countIdItem)}
      >
        {imageArray[i] && (
          <div className={cxCSS("item")}>
            <img src={imageArray[i]} />
          </div>
        )}
        {imageArray[i + 1] && (
          <div className={cxCSS("item")}>
            <img src={imageArray[i + 1]} />
          </div>
        )}
        {imageArray[i + 2] && (
          <div className={cxCSS("item")}>
            <img src={imageArray[i + 2]} />
          </div>
        )}
      </div>
    );
    table.push(
      <table
        ref={refsTable[countTableIdItem]}
        key={countTableIdItem++}
        id={cx("table_" + countTableIdItem)}
      >
        <tr>
          <td>
            <small>Product</small>
          </td>
          <td></td>
          <td></td>
          <td>
            <small>0</small>
          </td>
        </tr>
        {imageArray[i] && (
          <tr>
            <td>
              <b>Product 1</b>
            </td>
            <td>
              <small>200.000 vnd</small>
            </td>
            <td>
              <small>
                <img src={imageArray[i]} />
              </small>
            </td>
            <td>
              <b>
                <FontAwesomeIcon icon={faPlus} />
              </b>
            </td>
          </tr>
        )}
        {imageArray[i + 1] && (
          <tr>
            <td>
              <b>Product 1</b>
            </td>
            <td>
              <small>200.000 vnd</small>
            </td>
            <td>
              <small>
                <img src={imageArray[i + 1]} />
              </small>
            </td>
            <td>
              <b>
                <FontAwesomeIcon icon={faPlus} />
              </b>
            </td>
          </tr>
        )}
        {imageArray[i + 2] && (
          <tr>
            <td>
              <b>Product 1</b>
            </td>
            <td>
              <small>200.000 vnd</small>
            </td>
            <td>
              <small>
                <img src={imageArray[i + 2]} />
              </small>
            </td>
            <td>
              <b>
                <FontAwesomeIcon icon={faPlus} />
              </b>
            </td>
          </tr>
        )}
      </table>
    );
  }

  const bgRotate = useRef(null);

  useEffect(() => {
    var countGroup = countIdItem;
    var deg_bg = 0;
    var active = 0;
    var list_color = ["#40BCBB", "#B58CD4", "#E5CA63"];

    refsGroupItems[0].current.classList.add("active");
    function changeActive() {
      refsGroupItems[
        active - 2 === -1
          ? countGroup - 1
          : active - 2 === -2
          ? countGroup - 2
          : active - 2
      ].current.classList.remove("active");
      refsGroupItems[active].current.classList.add("active");

      refsTable[active].current.style.left = "0";
      refsTable[active].current.style.opacity = "1";
      refsTable[
        active - 1 < 0 ? countGroup - 1 : active - 1
      ].current.style.left = "-100%";
      refsTable[
        active - 1 < 0 ? countGroup - 1 : active - 1
      ].current.style.opacity = "0";
      refsTable[
        active - 2 == -1
          ? countGroup - 1
          : active - 2 == -2
          ? countGroup - 2
          : active - 2
      ].current.style.left = "100%";

      deg_bg = deg_bg + 190;
      active = active >= countGroup - 1 ? 0 : active + 1;
      bgRotate.current.style.transform = `rotate(${deg_bg}deg)`;
      bgRotate.current.style.backgroundColor = list_color[active];
    }
    changeActive();
    setInterval(changeActive, 2500);
  }, []);

  return (
    <div className={cx("container")}>
      <img src={avatar} className={cx("logo")} />
      <div className={cx("left")}>
        <div className={cx("background-rotate")}>
          <div ref={bgRotate} className={cx("bg-rotate")}></div>
        </div>
        <div className={cx("list-left")}>{element.map((item) => item)}</div>
      </div>
      <div className={cx("right")}>
        <h1>
          If Back-end Dev <br />
          make Frond-end task
        </h1>
        {table.map((item) => item)}
      </div>
      <div className={cx("menu")}>
        <ul>
          <li>
            <FontAwesomeIcon icon={faKeyboard} />
          </li>
          <li>
            <FontAwesomeIcon icon={faPenToSquare} />
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faCaretDown} />
          </li>
          <li>
            <FontAwesomeIcon icon={faArrowRight} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Lab1Animation;
