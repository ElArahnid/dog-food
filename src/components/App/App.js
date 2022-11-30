import { useEffect, useState } from 'react';
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

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const handleRequest = () => {
    // const filterCards = cards.filter(
    //   item => (item.name).toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setCards(filterCards);
    // console.log(searchQuery.length);
  
    api.search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch( err => console.log(err))}


  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
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

        // устанавливаем состяоние пользовтателя
        setCurrentUser(userData)

        // устанавливаем состояние карточек
        setCards(productsData.products)
        
      }).catch( err => console.log(err))
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
    }, [debounceSearchQuery])

    function handleProductLike(product) {
      const liked = isLiked(product.likes, currentUser._id);
      // Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции. 
      // Возвращаемое значение
      // true, если функция проверки возвращает truthy значение хотя бы для одного элемента массива. Иначе, false.
      // const isLiked = product.likes.some(id => id === currentUser._id)
      api.changeLikeProduct(product._id, liked)
        .then((newCard) => {
          const newProducts = cards.map(cardState => {
            // console.log('Карточка из стейта', cardState);
            // console.log('Карточка с сервера', newCard);
            return cardState._id === newCard._id ? newCard : cardState
          })
          setCards(newProducts)
        })
    }

    return (
      <>
        {/* <Header user={currentUser} onUdateUser={handleUpdateUser}> */}
        <Header>
            <Logo className="logo logo_place_holder" />
            <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </ Header>
        <main className="content container">
          <SeachInfo searchCount={cards.length} searchText={searchQuery} />
          <Sort />
          <div className="content__cards">
            { 
            isLoading 
            ? <Spinner />
            : <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
            }
          </div>
        </main>
        <Footer />
      </>
    );
  }

export default App;
