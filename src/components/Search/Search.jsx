import { useContext, useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/images/ic-search.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/ic-close-input.svg";
import s from "./styles.module.css";
import cn from "classnames";
import { Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { CardContext } from "../../context/cardContext";

function Search({ onSubmit: propsOnSubmit, onInput, setCheckedSearchInFavor }) {
  // onSubmit: propsOnSubmit - так можно сразу при деструктуризации переименовывать
  const [inputText, setInputText] = useState("");
  const { checkedSearchInFavor } = useContext(CardContext);
  // console.log(checkedSearchInFavor);

  const handleInput = (e) => {
    // console.log(e);
    setInputText(e.target.value);
    onInput && onInput(e.target.value);
  };

  const inputDemoRef = useRef(null);

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

  // const [booleanTumbler, setBooleanTumbler] = useState(true)

  return (
    <>
      <form className={s.search} onSubmit={handleFormOnSubmit}>
        <Routes>
          <Route
            path="/favorites"
            element={
              <label className={s.search__label_favor}>
                <FontAwesomeIcon className={cn(s.heartFavor, {[s.heartFavorSelected]: checkedSearchInFavor})} icon={faHeart} />
                <FontAwesomeIcon className={cn(s.searchFavor, {[s.searchFavorSelected]: checkedSearchInFavor})} icon={faSearch} />
                <input checked={checkedSearchInFavor}
                  style={{visibility: "hidden"}}
                  type="checkbox"
                  name="search-favor"
                  className="search__favor"
                  ref={inputDemoRef}
                  onChange={
                    () => {
                      setCheckedSearchInFavor(inputDemoRef.current.checked);
                      // booleanTumbler ? setBooleanTumbler(false) : setBooleanTumbler(true);
                      // console.log(booleanTumbler);
                    }
                    }
                />
              </label>
            }
          />
        </Routes>
        <input
          type="text"
          className={s.search__input}
          placeholder="Поиск.."
          onInput={handleInput}
          value={inputText}
        />
        <button className={s.search__btn} type="button">
          {inputText && (
            <CloseIcon
              onClick={handlInputText}
              className="search__icon-clear"
            />
          )}
          {inputText && (
            <SearchIcon onClick={handleFormOnSubmit} className={s.search__icon} />
          )}
        </button>
      </form>
    </>
  );
}

export default Search;
