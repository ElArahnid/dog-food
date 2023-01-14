import React from "react";

import s from "./style.module.css";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function Modal({ active, setActive, children }) {
  return (
    <div
      className={cn(s.modal, { [s.active]: active })}
      onClick={() => setActive(false)}
    >
      <div
        className={cn(s.modal_content, { [s.active]: active })}
        onClick={(e) => e.stopPropagation()}
      >
        <FontAwesomeIcon
          style={{ float: "right", cursor: "pointer" }}
          icon={faXmark}
          onClick={() => setActive(false)}
        />
        {children}
      </div>
    </div>
  );
}
