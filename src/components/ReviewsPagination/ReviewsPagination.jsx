import s from "./style.module.css";
import cn from "classnames";
import { Link, useParams } from "react-router-dom";
import { REVIEWSPERPAGE } from "../../Utilites/constants";

export const ReviewsPagination = ({
  reviews,
  productId,
  setPagesReview,
  scrollToReviewsStart,
}) => {
  const sumPages = Math.round(reviews?.length / REVIEWSPERPAGE) || 1;
  let numberPage = 1;
  const pages = new Array(sumPages).fill(<></>);

  const {reviewPage} = useParams();

  return (
    <div className={s.numberPageArea}>
      <span className={s.numberPage}>Страницы:</span>{" "}
      {pages.map((page, i) => (
        <span className={cn(s.numberPage, {[s.numberPageSelected]: (+reviewPage === i)})}>
           <Link
            to={`/product/${productId}/review-page/${i}`}
            key={i}
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
