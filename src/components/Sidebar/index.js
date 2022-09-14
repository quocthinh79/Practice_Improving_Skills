import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import routesConfig from "~/config/routes";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function Slidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const closeAndOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div
      className={
        openSidebar ? cx("wrap", "open-sidebar") : cx("wrap", "close-sidebar")
      }
    >
      <div className={cx("close-and-open")} onClick={closeAndOpenSidebar}>
        {openSidebar ? (
          <FontAwesomeIcon icon={faChevronLeft} />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} />
        )}
      </div>
      {routesConfig.map((route, index) => (
        <Link key={index} className={cx("siderbar-item")} to={route.path}>
          {route.name}
        </Link>
      ))}
    </div>
  );
}

export default Slidebar;
