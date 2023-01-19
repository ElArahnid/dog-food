import { useState } from "react";
import api from "../../Utilites/Api";

export const ProductDisplayNameWhoLiked = ({ whoIsThis }) => {
    
  const [displayName, setDisplayName] = useState("");

  api
    .getUserInfoById(whoIsThis)
    .then((data) => {
      setDisplayName(data.name);
    })
    .catch(error => console.log(error))    

  return (
    <>
    <span>Автор:</span> {displayName}
    </>
    )

};
