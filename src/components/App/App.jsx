import { StrictMode, useCallback, useEffect, useState } from "react";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
// import data from '../../assets/data.json';
import "./styles.css";
import SeachInfo from "../SearchInfo/SearchInfo";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { ThemeContext, themes } from "../../context/themeContext";
import api from "../../Utilites/Api";
import useDebounce from "../../hooks/useDebounce";
import { isLiked } from "../../Utilites/product";
// import Spinner from "../Spinner";
import { CatalogPage } from "../../pages/CatalogPage/catalog-page";
import ProductPage from "../../pages/ProductPage/product-page";
import { NotFoundPage } from "../../pages/NotFoundPage/not-found";
import { FaqPage } from "../../pages/FAQPage/faq-page";
import { FavorPage } from "../../pages/FavorPage/favor-page";
import { FormLogin } from "../Form/FormLogin";
import RegistrationForm from "../Form/RegistrationForm";
import { Modal } from "../Modal/Modal";
import { FormModal } from "../FormModal/FormModal";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { ResetPassword } from "../ResetPassword/ResetPassword";
import ScrollToTop from "react-scroll-to-top";

// function ContactList({contacts}) {
//   // console.log(contacts);
//   return (
//     <div>
//       {contacts.map((contact) => (
//         <div key={contact.phoneNumber}>
//           <p>{contact.name}</p>
//           <p>{contact.lastName}</p>
//           <p>{contact.phoneNumber}</p>
//         </div>
//         ))}
//     </div>
//     )
// }

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(themes.light);
  const [favor, setFavor] = useState([]);
  const [checkedSearchInFavor, setCheckedSearchInFavor] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [isOpenModalForm, setIsOpenModalForm] = useState(false);

  const location = useLocation();

  const backLocation = location.state?.backLocation;
  const firstPath = location.state?.firstPath;
  // console.log(firstPath, " <= firstPath");

  const debounceSearchQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api
      .search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [debounceSearchQuery]);

  const handleFormSubmit = (inputText) => {
    setIsLoading(true);
    navigate("/");
    setSearchQuery(inputText);
    handleRequest();
    // console.log(inputText);
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  }

  useEffect(() => {
    setIsLoading(true);
    // Метод Promise.all(iterable) возвращает промис, который выполнится тогда, когда будут выполнены все промисы, переданные в виде перечисляемого аргумента, или отклонено любое из переданных промисов.
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        // устанавливаем состояние пользователя
        setCurrentUser(userData);
        // устанавливаем состояние карточек
        setCards(productsData.products);
        // console.log(productsData, productsData.products);
        const favorProduct = (productsData?.products).filter((item) =>
          isLiked(item.likes, userData._id)
        );
        // console.log(favorProduct, userData);
        setFavor((previousState) => favorProduct);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    // тут то же самое, но в другом варианте
    //   api.getProductList()
    //     .then((cardsData) => {
    //       // console.log(cardsData);
    //       // устанавливаем состояние карточек
    //       setCards(cardsData.products)
    //     })
    //   api.getUserInfo()
    //     .then((userData) => {
    //       console.log(userData);
    //       // устанавливаем состяоние пользовтателя
    //       setCurrentUser(userData)
    //     })
  }, []);

  useEffect(() => {
    !location.pathname.includes('/product/') && handleRequest();
  }, [debounceSearchQuery, handleRequest]);

  const handleProductLike = useCallback(
    async (product) => {
      const liked = isLiked(product.likes, currentUser._id);
      // Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
      // Возвращаемое значение
      // true, если функция проверки возвращает truthy значение !хотя бы для одного! элемента массива. Иначе, false.
      // const isLiked = product.likes.some(id => id === currentUser._id)
      const updateCard = await api.changeLikeProduct(product._id, liked);
      const newProducts = cards.map((cardState) => {
        return cardState._id === updateCard._id ? updateCard : cardState;
      });

      if (!liked) {
        setFavor((prevState) => [...prevState, updateCard]);
      } else {
        setFavor((prevState) =>
          prevState.filter((card) => card._id !== updateCard._id)
        );
      }

      setCards(newProducts);
      return updateCard;
    },
    [cards, currentUser]
  );

  const toggleTheme = () => {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  };

  const addContact = useCallback(
    (formData) => {
      setContacts([...contacts, formData]);
    },
    [contacts]
  );

  document.querySelector("#root").className = theme.class;
  document.querySelector("body").addEventListener("keyup", (e) => {
    if (e.key === "Escape" || e.key === " ") setIsOpenModalForm(false);
  });

  return (
    <ThemeContext.Provider value={{ theme: themes.light, toggleTheme }}>
      <UserContext.Provider value={{ user: currentUser, isLoading }}>
        <CardContext.Provider
          value={{
            cards,
            favor,
            searchQuery,
            checkedSearchInFavor,
            location,
            setSearchQuery,
            handleLike: handleProductLike,
          }}
        >
          {/* <Modal active={isOpenModalForm} setActive={setIsOpenModalForm}>
              <RegistrationForm />
            </Modal> */}
          {/* <Header user={currentUser} onUpdateUser={handleUpdateUser}> */}
          {/* <Modal active={isOpenModalForm} setActive={setIsOpenModalForm}>
            <FormModal />
          </Modal> */}
          <Header
            themeStatus={theme.status}
            favor={favor}
            setSearchQuery={setSearchQuery}
            isOpenModalForm={isOpenModalForm}
            setIsOpenModalForm={setIsOpenModalForm}
          >
            <Logo className="logo logo_place_holder" href="/" onClick={() => setSearchQuery('')} />
            <Search
              onSubmit={handleFormSubmit}
              onInput={handleInputChange}
              setCheckedSearchInFavor={setCheckedSearchInFavor}
            />
          </Header>
          {/* <FormLogin serializeCallBack={addContact} /> */}
          {/* <ContactList contacts={contacts} /> */}
          <main className="content container">
            <SeachInfo searchText={searchQuery} />
            <Routes
              location={
                (backLocation && { ...backLocation, pathname: firstPath }) ||
                location
              }
            >
              <Route index element={<CatalogPage /> } />
              <Route
                path="/product/:idProduct"
                element={<ProductPage isLoading={isLoading} /> }
              />
              <Route path="/faq" element={<FaqPage /> } />
              <Route path="/favorites" element={<FavorPage /> } />
              <Route path="/form" element={<FormLogin /> } />
              <Route path="/search=:searchWord"  element={<CatalogPage /> } />
              <Route path="*" element={<NotFoundPage /> } />
              <Route path="/login" element={ <Login /> } />
              <Route path="/register" element={ <Register /> } />
              <Route path="/reset-password" element={ <ResetPassword /> } />
            </Routes>

            {backLocation && (
              <Routes>
                <Route path="/login" element={
                    <Modal active={isOpenModalForm} setActive={setIsOpenModalForm} >
                      <Login />
                    </Modal>
                  }
                />
                <Route path="/register" element={
                    <Modal active={isOpenModalForm} setActive={setIsOpenModalForm} >
                      <Register />
                    </Modal>
                  }
                />
                <Route path="/reset-password" element={
                    <Modal active={isOpenModalForm} setActive={setIsOpenModalForm} >
                      <ResetPassword />
                    </Modal>
                  }
                />
              </Routes>
            )}
          </main>
          <Footer />
          <ScrollToTop smooth />
        </CardContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
