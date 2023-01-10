import React, { useCallback } from "react";

import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";

import { useApi } from "../../hooks/useApi";

import api from "../../Utilites/Api";
// import Spinner from "../../components/Spinner";
import Product from "../../components/Product/Product";
import { CardContext } from "../../context/cardContext";
import { NotFoundPage } from "../NotFoundPage/not-found";
import { Skeleton } from "../../components/Spinner/ContentLoader";

const ProductPage = () => {

  const { idProduct } = useParams();
  const { handleLike } = useContext(CardContext);
  const { isLoading } = useContext(UserContext);

  const handleGetProduct = useCallback( 
      () => api.getProductById(idProduct), [idProduct]
    );

  const {
    data: product, 
    setData: setProduct, 
    error: catchError 
  } = useApi( handleGetProduct );

  const handleProductLike = useCallback(() => {
      handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });
  }, [handleLike, product, setProduct]);

  return (
    <>
      <div className="content__cards">
        {catchError ? (
          <NotFoundPage />
        ) : isLoading ? (
          // <Spinner />
          <Skeleton />
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
