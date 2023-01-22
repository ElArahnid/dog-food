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
import { NavLink, useLocation } from "react-router-dom";

function Header({
  children,
  themeStatus,
  favor,
  isOpenModalForm,
  setIsOpenModalForm
}) {
  // console.log(children);
  // console.log(user.email, user.name);
  // const handleClickButtonEdit = (e) => {
  //   e.preventDefault();
  //   onUpdateUser({name: "Эдуард Владимирович Богданов", about: "ученик учил уроки, у него в чернилах щеки"})

  const { toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
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
              className={isOpenModalForm ? s.btnThemeActive : s.btnTheme}
              to="/login"
              state={{ backLocation: location, firstPath: location.pathname, }}
            >
              <FontAwesomeIcon
                icon={faUserLock}
                onClick={ () => setIsOpenModalForm(true) }
              />
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
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive ? s.btnThemeActive : s.btnTheme
              }
            >
              <FontAwesomeIcon icon={faFileCircleQuestion} />
            </NavLink>
            <button className={s.btnTheme} onClick={toggleTheme}>
              {themeStatus && <FontAwesomeIcon icon={faMoon} />}
              {!themeStatus && <FontAwesomeIcon icon={faSun} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
