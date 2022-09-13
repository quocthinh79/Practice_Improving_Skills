import classNames from "classnames/bind";
import { PropTypes } from "prop-types";
import styles from "./HobbyList.module.scss";

HobbyList.propTypes = {
  hobbyList: PropTypes.array,
  activeId: PropTypes.number,
  onHobbyClick: PropTypes.func,
};

HobbyList.defaultProps = {
  hobbyList: [],
  activeId: null,
  onHobbyClick: null,
};

const cx = classNames.bind(styles);

function HobbyList(props) {
  const { hobbyList, activeId, onHobbyClick } = props;

  const onClickHobbyItem = (hobby) => {
    if (onHobbyClick) {
      onHobbyClick(hobby);
      console.log(hobby.id);
    }
  };

  return (
    <ul>
      {hobbyList.map((hobby) => (
        <li
          className={hobby.id === activeId ? cx("actived") : cx("")}
          key={hobby.id}
          onClick={() => onClickHobbyItem(hobby)}
        >
          {hobby.title}
        </li>
      ))}
    </ul>
  );
}

export default HobbyList;
