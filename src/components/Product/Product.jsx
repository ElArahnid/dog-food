import React, { UserContext } from "../../context/userContext";
import { useContext, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

import s from "./index.module.css";
import '../../../src/dark.css'
import cn from "classnames";

import api from "../../Utilites/Api";
import { REVIEWSPERPAGE } from "../../Utilites/constants";

import { ReactComponent as Save } from "./img/save.svg";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg";

import { calcDiscountPrice, isLiked } from "../../Utilites/product";
import { ContentHeader } from "../ContentHeader/ContentHeader";
import { Rate } from "../Rate/Rate";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ProductDisplayNameWhoLiked } from "./ProductDisplayNameWhoLiked";
import { ReviewsPagination } from "../ReviewsPagination/ReviewsPagination";
import { ThemeContext } from "../../context/themeContext";

export const Product = ({
  onProductLike,
  description,
  discount,
  likes = [],
  name,
  pictures,
  price,
  reviews,
  tags,
  _id,
  setProduct,
}) => {

  const { user: currentUser } = useContext(UserContext);
  const {themeStatus} = useContext(ThemeContext);
  const [pagesReview, setPagesReview] = useState({start: 0, end: REVIEWSPERPAGE});
  const reviewsStart = useRef(null);

  const scrollToReviewsStart = () => reviewsStart.current.scrollIntoView();

  const middleRaitingCalc = useMemo(
    () =>
      Math.round(
        reviews?.reduce((acc, arg) => {
          return (acc += arg.rating);
        }, 0) / reviews?.length
      ),
    [reviews]
  );

  // const [rating, setRating] = useState(null);

  const discount_price = calcDiscountPrice(price, discount);
  const isLike = isLiked(likes, currentUser?._id);

  const deleteReview = (_id, reviewId) => {
    api.deleteReviewById(_id, reviewId)
    .then(newReview => setProduct && setProduct(newReview))
    .catch(error => error)
  }

  const createMarkup = (textToHtml) => {
    return { __html: textToHtml };
  };

  const descriptionHtml = createMarkup(description);

  return (
    <>
      <ContentHeader title={name} />
      <div className={s.leftInfo}>
        <span>Артикул: 1234567890</span>
        <span>
          <Rate rating={middleRaitingCalc} />
        </span>
        <span
          className={s.linkToReviews}
          onClick={() => scrollToReviewsStart()}
        >
          {reviews?.length} отзыв
        </span>
      </div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img src={pictures} alt={`Изображение ${name}`} />
        </div>
        <div className={cn(s.desc, {'productDescDark': !themeStatus})}>
          <span className={discount ? s.oldPrice : s.price}>
            {price}&nbsp;₽
          </span>
          {discount !== 0 ? (
            <span className={cn(s.price, "card__price_type_discount")}>
              {discount_price}&nbsp;₽
            </span>
          ) : null}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <button className={s.null}>0</button>
              <button className={s.plus}>+</button>
            </div>
            <a href="/#" className={cn("btn", "btn-type-primary", s.cart)}>
              В корзину
            </a>
          </div>
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isLike })}
            onClick={onProductLike}
          >
            <Save />
            <span className={cn({'spanFavText': !themeStatus})}>{isLike ? "В избранном" : "В избранное"}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером —
                <span className={s.bold}> от 399&nbsp;₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером —
                <span className={s.bold}> от 399&nbsp;₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={cn(s.box, {'productDescDark': !themeStatus})}>
        <h2 className={s.title}>Описание</h2>
        <p className={s.subtitle} dangerouslySetInnerHTML={descriptionHtml}></p>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
      <div className={cn(s.reviewForm, {'productDescDark': !themeStatus})} ref={reviewsStart}>
        <ReviewForm
          reviewTitle={`Отзыв о товаре ${name}`}
          productName={name}
          productId={_id}
          setProduct={setProduct}
          scrollToReviewsStart={scrollToReviewsStart}
        />
      </div>
      <div className={s.reviewsArea}>
        {reviews
          ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(pagesReview.start, pagesReview.end)
          ?.map((element) => (
            <div key={element._id} className={cn(s.reviewsReview, {'productReviewDark': !themeStatus})}>
              <div className={s.headerReview}>
                <div className={s.reviewsReviewAuthor}>
                  <ProductDisplayNameWhoLiked whoIsThis={element.author} />
                  {element.author === "636a510659b98b038f779cee" && (
                    <span>
                      <FontAwesomeIcon
                        className={s.TrashCan}
                        icon={faTrashCan}
                        onClick = {() => deleteReview(_id, element._id)}
                      />
                    </span>
                  )}
                </div>
                <div className={s.reviewsReviewRating}>
                  <Rate rating={element.rating} />
                </div>
              </div>
              <div className={cn(s.reviewsReviewText, {'productReviewText': !themeStatus})}>{element.text}</div>
              <div className={s.reviewsReviewCreated}>
                <span>Создано: {dayjs(element?.created_at).locale('ru').format('DD MMMM YYYY, H:m:s') }</span>
              </div>
            </div>
          ))}
          <ReviewsPagination reviews={reviews} productId={_id} setPagesReview={setPagesReview} scrollToReviewsStart={scrollToReviewsStart} />
      </div>

    </>
  );
};

export default Product;
