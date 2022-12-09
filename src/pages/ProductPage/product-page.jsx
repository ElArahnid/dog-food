import React, { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/Product/Product";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import api from "../../Utilites/Api";
import { NotFoundPage } from "../NotFoundPage/not-found";

const ProductPage = ({ isLoading }) => {
  // const [searchQuery, setSearchQuery] = useState("");

  // const [currentUser, setCurrentUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const [catchError, setCatchError] = useState(false);
  const [product, setProduct] = useState(null);
  const { idProduct } = useParams();

  const { handleLike } = useContext(CardContext);
  // console.log(UserContext);

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
    handleLike(product).then((updateProduct) => {
      // console.log(updateProduct, product);
      setProduct(updateProduct);
    });
  }, [handleLike, product]);

  useEffect(() => {
    // setIsLoading(true);
    api
      .getProductById(idProduct)
      .then((productsData) => {
        // setCurrentUser(userData);
        setProduct(productsData);
      })
      .catch((err) => {
        setCatchError(true);
        // console.log(err);
      });

    // .finally(() => setIsLoading(false));
  }, [catchError, idProduct]);
  // console.log(catchError);
  // console.log(handleLike);
  return (
    <>
      <div className="content__cards">
        {catchError ? (
          <NotFoundPage />
        ) : isLoading ? (
          <Spinner />
        ) : (
          <Product
            {...product}
            setProduct={setProduct}
            onProductLike={handleProductLike}
          />
        )}
      </div>
    </>
  );
};

export default ProductPage;
