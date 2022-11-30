import "./styles.css";
import { ReactComponent as SearchIcon } from "../../assets/images/ic-search.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/ic-close-input.svg";
import { useState } from "react";

function Search({ onSubmit: propsOnSubmit, onInput }) {
  // onSubmit: propsOnSubmit - так можно сразу при деструктуризации переименовывать
  const [inputText, setInputText] = useState("");
  const handleInput = (e) => {
    // console.log(e);
    setInputText(e.target.value);
    onInput && onInput(e.target.value);
  };

  const handleFormOnSubmit = (e) => {
    e.preventDefault();
    propsOnSubmit(inputText);
    setInputText("");
  };

  const handlInputText = (e) => {
    e.stopPropagation();
    setInputText("");
    onInput && onInput("");
  };

  return (
    <>
      <form className="search" onSubmit={handleFormOnSubmit}>
        <input
          type="text"
          className="search__input"
          placeholder="Поиск.."
          onInput={handleInput}
          value={inputText}
        />
        <button className="search__btn" type="button">
          {inputText && <CloseIcon onClick={handlInputText} className="search__icon-clear" />}
          {inputText && <SearchIcon onClick={handleFormOnSubmit} className="search__icon" />}
        </button>
      </form>
    </>
  );
}

export default Search;
