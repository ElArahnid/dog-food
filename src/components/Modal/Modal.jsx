import React, { useContext, useEffect, useState } from "react";

import s from "./style.module.css";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export function Modal({ active, setActive, children }) {

  // const [active, setActive] = useState(false);

  // console.log(active, ' <= active');
  
  const navigate = useNavigate();

  useEffect(() => {
    setActive(true)
  }, []);


  function onCloseModal() {
    setActive(false);
    navigate(-1);
  }

  return (
    <div
      className={cn(s.modal, { [s.active]: active })}
      onClick={onCloseModal}
    >
      <div
        className={cn(s.modal_content, { [s.active]: active })}
        onClick={(e) => e.stopPropagation()}
      >
        <FontAwesomeIcon
          style={{ float: "right", cursor: "pointer", alignSelf: 'end', }}
          icon={faXmark}
          onClick={onCloseModal}
        />
        {children}
      </div>
    </div>
  );
}
