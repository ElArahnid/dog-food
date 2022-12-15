import React from "react";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import cn from "classnames";

import "./styles.css";
import { ReactComponent as Save } from "../../assets/images/save.svg";
import { calcDiscountPrice, isLiked } from "../../Utilites/product";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";

const Card = ({
  name,
  price,
  _id,
  likes,
  discount,
  wight,
  description,
  pictures,
  tags,
}) => {
  const { user: currentUser, isLoading } = useContext(UserContext);
  const { handleLike: onProductLike } = useContext(CardContext);
  // console.log(currentUser);
  const discount_price = calcDiscountPrice(price, discount);
  const liked = isLiked(likes, currentUser?._id);

  function handleLikeClick() {
    onProductLike({ _id, likes });
  }
// console.log(isLoading);
  return (
    <>
    {
    isLoading 
    ? 
    <ContentLoader 
    speed={2}
    viewBox="0 0 260 500"
    backgroundColor="#f5f5f5"
    foregroundColor="#fbf8e0"
  >
    <rect x="0" y="0" rx="0" ry="0" width="NaN" height="NaN" /> 
    <rect x="463" y="550" rx="3" ry="3" width="140" height="11" /> 
    <rect x="514" y="598" rx="3" ry="3" width="53" height="11" /> 
    <rect x="574" y="598" rx="3" ry="3" width="72" height="11" /> 
    <rect x="405" y="598" rx="3" ry="3" width="100" height="11" /> 
    <rect x="387" y="621" rx="3" ry="3" width="37" height="11" /> 
    <rect x="405" y="573" rx="3" ry="3" width="140" height="11" /> 
    <rect x="553" y="573" rx="3" ry="3" width="173" height="11" /> 
    <rect x="7" y="362" rx="10" ry="10" width="237" height="49" /> 
    <rect x="7" y="327" rx="10" ry="10" width="85" height="27" /> 
    <rect x="7" y="288" rx="10" ry="10" width="85" height="27" /> 
    <rect x="511" y="477" rx="0" ry="0" width="194" height="248" /> 
    <rect x="572" y="565" rx="0" ry="0" width="37" height="36" /> 
    <circle cx="595" cy="612" r="112" /> 
    <circle cx="587" cy="571" r="20" /> 
    <rect x="7" y="424" rx="10" ry="10" width="162" height="63" /> 
    <rect x="7" y="44" rx="10" ry="10" width="201" height="210" /> 
    <circle cx="223" cy="28" r="23" />
  </ContentLoader>
    :
      <div className="card">
        <div className="card__sticky card__sticky_type_top-left">
          {discount !== 0 && (
            <span className="card__discount">-{discount}%</span>
          )}
          {tags &&
            tags.map((tag) => (
              <span
                key={tag}
                className={cn("tag", { [`tag_type_${tag}`]: true })}
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="card__sticky card__sticky_type_top-right">
          <button
            className={cn("card__favorite", {
              "card__favorite_is-active": liked,
            })}
            onClick={handleLikeClick}
          >
            <Save className="card__favorite-icon" />
          </button>
        </div>
        <Link to={`/product/${_id}`} className="card__link">
          <img src={pictures} alt={description} className="card__image" />
          <div className="card__desc">
            <span
              className={discount !== 0 ? "card__old-price" : "card__price"}
            >
              {price}&nbsp;₽
            </span>
            {discount !== 0 && (
              <span className="card__price card__price_type_discount">
                {discount_price}&nbsp;₽
              </span>
            )}
            <span className="card__wight">{wight}</span>
            <p className="card__name">{name}</p>
          </div>
        </Link>
        <Link to="#" className="card__cart btn btn_type_primary">
          в корзину
        </Link>
      </div>
      }
    </>
  );
};

export default Card;
