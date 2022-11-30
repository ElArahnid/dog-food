import './styles.css';

function Header({children, user, onUdateUser}) {
  // console.log(children);
  // console.log(user.email, user.name);
  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    onUdateUser({name: "Эдуард Владимирович Богданов", about: "ученик учил уроки, у него в чернилах щеки"})
  }
  return (
    <header className='header'>
        <div className="container">
          {/* {user?.email && <span>{user?.email}</span>}
          {user?.name && <span>{user?.name}</span>}
          {user?.about && <span>{user?.about}</span>}
          <button className='btn' onClick={handleClickButtonEdit}>Изменить</button> */}
            <div className="header__wrapper">
              {children}
            </div>
        </div>
    </header>
  );
}

export default Header;
