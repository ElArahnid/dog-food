import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { ThemeContext, themes } from '../../context/themeContext';
import s from './index.module.css';

function Header({children, user, onUpdateUser, themeStatus}) {
  // console.log(children);
  // console.log(user.email, user.name);
  // const handleClickButtonEdit = (e) => {
  //   e.preventDefault();
  //   onUpdateUser({name: "Эдуард Владимирович Богданов", about: "ученик учил уроки, у него в чернилах щеки"})
  // }
  const {toggleTheme} = useContext(ThemeContext);
  
  return (
    <header className={s.header}>
        <div className="container">
          {/* {user?.email && <span>{user?.email}</span>}
          {user?.name && <span>{user?.name}</span>}
          {user?.about && <span>{user?.about}</span>}*/}
            <div className={s.header__wrapper}>
              {children}
              <button className={s.btnTheme} onClick={toggleTheme}>
              { themeStatus && <FontAwesomeIcon icon={faMoon} /> }
              { !themeStatus && <FontAwesomeIcon icon={faSun} /> }
              </button> 
            </div>
        </div>
    </header>
  );
}

export default Header;
