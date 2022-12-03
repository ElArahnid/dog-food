import React, { useCallback, useEffect, useState } from "react";
import CardList from "../../components/CardList/CardList";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Logo from "../../components/Logo/Logo";
import Product from "../../components/Product/Product";
import Search from "../../components/Search/Search";
import SeachInfo from "../../components/SearchInfo/SearchInfo";
import Sort from "../../components/Sort/Sort";
import Spinner from "../../components/Spinner";
import api from "../../Utilites/Api";
import { isLiked } from "../../Utilites/product";

const ProductPage = ({currentUser, isLoading}) => {
  // const [searchQuery, setSearchQuery] = useState("");

  // const [currentUser, setCurrentUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState(null);

  // const handleRequest = useCallback((searchQuery) => {
  //   // const query = defaultSearchQuery || searchQuery;
  //   // const filterCards = cards.filter(
  //   //   item => (item.name).toLowerCase().includes(searchQuery.toLowerCase())
  //   // );
  //   // setCards(filterCards);
  //   // console.log(searchQuery.length);
  //   setIsLoading(true);
  //   api
  //     .search(searchQuery)
  //     .then((searchResult) => {
  //       // console.log(searchResult);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setIsLoading(false))
  // }, []);

  // const handleFormSubmit = (val) => {
  //   setSearchQuery(val)
  //   handleRequest(val);
  // };

  const handleProductLike = useCallback(() => {
    const liked = isLiked(product.likes, currentUser._id);
    // Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
    // Возвращаемое значение
    // true, если функция проверки возвращает truthy значение хотя бы для одного элемента массива. Иначе, false.
    // const isLiked = product.likes.some(id => id === currentUser._id)
    api.changeLikeProduct(product._id, liked).then((newProduct) => {
      // const newProducts = cards.map(cardState => {
      //   // console.log('Карточка из стейта', cardState);
      //   // console.log('Карточка с сервера', newCard);
      //   return cardState._id === newCard._id ? newCard : cardState
      // })
      setProduct(newProduct);
    });
  }, [product, currentUser])

  useEffect(() => {
    // setIsLoading(true);
    Promise.all([api.getProductById("622c77e877d63f6e70967d22"), api.getUserInfo()])
      .then(([productsData, userData]) => {
        // setCurrentUser(userData);
        setProduct(productsData);
        // console.log(productsData.products);
      })
      .catch((err) => console.log(err))
      // .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
        <div className="content__cards">
          {isLoading ? <Spinner /> : <Product  {...product} currentUser={currentUser} onProductLike={handleProductLike} />}
        </div>
    </>
  );
};

export default ProductPage;
