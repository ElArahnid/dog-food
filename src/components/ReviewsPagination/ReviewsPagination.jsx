import { useState } from "react";
import { REVIEWSPERPAGE } from "../../Utilites/constants";

export const ReviewsPagination = ({ reviews }) => {
  const sumPages = Math.round(reviews?.length / REVIEWSPERPAGE);
//   const [pages, setPages] = useState(new Array(sumPages).fill(<></>));

//   console.log(sumPages, pages);

  return (
    null
    )

}