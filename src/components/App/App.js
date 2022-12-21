import { useCallback, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Sort from '../Sort/Sort';
import CardList from '../CardList/CardList';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
// import data from '../../assets/data.json';
import './styles.css';
import SeachInfo from '../SearchInfo/SearchInfo';
import api from '../../Utilites/Api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../Utilites/product';
import Spinner from '../Spinner';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page';
import ProductPage from '../../pages/ProductPage/product-page';
import { Form, Route, Routes, useNavigate } from 'react-router-dom';
import { NotFound, NotFoundPage } from '../../pages/NotFoundPage/not-found';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { ThemeContext, themes } from '../../context/themeContext';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { FavorPage } from '../../pages/FavorPage/favor-page';
import { FormLogin } from '../Form/FormLogin';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(themes.light);
  const [favor, setFavor] = useState([]);

  // console.log(cards);

  const debounceSearchQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const handleRequest = useCallback(() => {
    // const filterCards = cards.filter(
    //   item => (item.name).toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setCards(filterCards);
    // console.log(searchQuery.length);
    setIsLoading(true)
    api.search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) })
  }, [debounceSearchQuery])

  const handleFormSubmit = (inputText) => {
    setIsLoading(true)
    navigate('/');
    setSearchQuery(inputText)
    handleRequest();
    // console.log(inputText);
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }

  useEffect(() => {
    setIsLoading(true);
    // Метод Promise.all(iterable) возвращает промис, который выполнится тогда, когда будут выполнены все промисы, переданные в виде перечисляемого аргумента, или отклонено любое из переданных промисов.
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        // устанавливаем состояние пользователя
        setCurrentUser(userData)

        // устанавливаем состояние карточек
        setCards(productsData.products)

        // console.log(productsData, productsData.products);

        const favorProduct = (productsData?.products).filter(item => isLiked(item.likes, userData._id));
        // console.log(favorProduct, userData);
        setFavor(previousState => favorProduct)

      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
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
  }, [])

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery, handleRequest])

  const handleProductLike = useCallback(async (product) => {
    const liked = isLiked(product.likes, currentUser._id);
    // Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции. 
    // Возвращаемое значение
    // true, если функция проверки возвращает truthy значение !хотя бы для одного! элемента массива. Иначе, false.
    // const isLiked = product.likes.some(id => id === currentUser._id)
    const updateCard = await api.changeLikeProduct(product._id, liked);
    const newProducts = cards.map(cardState => {
      return cardState._id === updateCard._id ? updateCard : cardState;
    });

    if(!liked) {
      setFavor(prevState => [...prevState, updateCard])
    }
    else{
      setFavor(prevState => prevState.filter(card => card._id !== updateCard._id))
    }

    setCards(newProducts);
    return updateCard;
  }, [cards, currentUser])

const toggleTheme = () => {
  theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark) ;
}

const addContact = useCallback((formData) => {
  console.log(formData);
}, [] )


document.querySelector("#root").className = theme.class;

  return (
    <ThemeContext.Provider value={{theme: themes.light, toggleTheme}}>
      <UserContext.Provider value={{ user: currentUser, isLoading }}>
        <CardContext.Provider value={{ cards, favor, handleLike: handleProductLike }} >
          {/* <Header user={currentUser} onUdateUser={handleUpdateUser}> */}
          <Header themeStatus={theme.status} favor={favor}>
            <Logo className="logo logo_place_holder" href="/" />
            <Search
              onSubmit={handleFormSubmit}
            onInput={handleInputChange} 
            />
          </ Header>
            <FormLogin serializeCallBack={addContact} />
          <main className="content container">
            <SeachInfo searchText={searchQuery} />
            <Routes>
              <Route path='/' element={
                <CatalogPage />
              } />
              <Route path='/product/:idProduct' element={
                <ProductPage isLoading={isLoading} />
              } />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/favorites' element={<FavorPage />} />
              {/* <Route path='/form' element={<FormLogin />} /> */}
              <Route path='*' element={<NotFoundPage />} />
            </Routes>

          </main>
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
