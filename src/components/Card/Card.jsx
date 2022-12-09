import cn from "classnames";

import "./styles.css";
import { ReactComponent as Save } from "../../assets/images/save.svg";
import { calcDiscountPrice, isLiked } from "../../Utilites/product";
import { Link } from "react-router-dom";
import { useContext } from "react";
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

  const {user: currentUser} = useContext(UserContext);
  const { handleLike: onProductLike } = useContext(CardContext);
  // console.log(currentUser);
  const discount_price = calcDiscountPrice(price, discount);
  const liked = isLiked(likes, currentUser?._id);

  function handleLikeClick() {
    onProductLike({ _id, likes });
  }

  return (
    <>
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
    </>
  );
};

export default Card;
