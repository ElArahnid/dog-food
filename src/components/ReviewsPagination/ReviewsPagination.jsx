import s from "./style.module.css";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import { REVIEWSPERPAGE } from "../../Utilites/constants";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

export const ReviewsPagination = ({
  reviews,
  productId,
  setPagesReview,
  scrollToReviewsStart,
}) => {
  const {themeStatus} = useContext(ThemeContext);

  const sumPages = Math.round(reviews?.length / REVIEWSPERPAGE) || 1;
  let numberPage = 1;
  const pages = new Array(sumPages).fill(<></>);

  const {reviewPage} = useParams();

  return (
    <div className={cn(s.numberPageArea, {'paginationArea': !themeStatus})}>
      <span className={s.numberPage} >Страницы:</span>{" "}
      {pages.map((page, i) => (
        <span key={i} className={cn(s.numberPage, {[s.numberPageSelected]: ( +reviewPage === i )})}>
           <Link
           className={cn({'paginationAreaHref': !themeStatus})}
            to={`/product/${productId}/review-page/${i}`}
            onClick={() => {
              setPagesReview({
                start: REVIEWSPERPAGE * i - REVIEWSPERPAGE < 0 ? 0 : REVIEWSPERPAGE * i,
                end: i === 0 ? REVIEWSPERPAGE : REVIEWSPERPAGE * (i + 1),
              });
              scrollToReviewsStart();
            }}
          >
            {numberPage + i}
            {/* {console.log(reviewPage !== i, reviewPage, i)} */}
          </Link>
        </span>
      ))}
    </div>
  );
};
