import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faFileCircleQuestion,
  faHeart,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import s from "./index.module.css";
import { Link, NavLink } from "react-router-dom";

function Header({ children, themeStatus, favor, activeAuthModal, setActiveAuthModal }) {
  // console.log(children);
  // console.log(user.email, user.name);
  // const handleClickButtonEdit = (e) => {
  //   e.preventDefault();
  //   onUpdateUser({name: "Эдуард Владимирович Богданов", about: "ученик учил уроки, у него в чернилах щеки"})
  // }
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className={s.header}>
      <div className="container">
        {/* {user?.email && <span>{user?.email}</span>}
          {user?.name && <span>{user?.name}</span>}
          {user?.about && <span>{user?.about}</span>}*/}
        <div className={s.header__wrapper}>
          {children}
          <div className={s.faArea}>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive ? s.btnThemeActive : s.btnTheme
              }
            >
              <FontAwesomeIcon icon={faFileCircleQuestion} />
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? s.btnThemeActive : s.btnTheme
              }
            >
              <FontAwesomeIcon icon={faHeart} />
              {favor.length > 0 ? (
                <span className={s.iconBubble}>{favor.length}</span>
              ) : null}
            </NavLink>
            <button className={s.btnTheme} onClick={toggleTheme}>
              {themeStatus && <FontAwesomeIcon icon={faMoon} />}
              {!themeStatus && <FontAwesomeIcon icon={faSun} />}
            </button>
            <NavLink
              className={ activeAuthModal ? s.btnThemeActive : s.btnTheme }
            >
              <FontAwesomeIcon icon={faUserLock} onClick={() => setActiveAuthModal(true)} />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
