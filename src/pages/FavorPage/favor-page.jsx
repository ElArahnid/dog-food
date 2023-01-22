import { useContext } from "react";
import CardList from "../../components/CardList/CardList";
import { ContentHeader } from "../../components/ContentHeader/ContentHeader";
import Sort from "../../components/Sort/Sort";
import { CardContext } from "../../context/cardContext";

export const FavorPage = () => {
  const { favor, checkedSearchInFavor } = useContext(CardContext);
  // console.log(checkedSearchInFavor);
  return (
    <div className="container">
    <ContentHeader title={checkedSearchInFavor ? 'Ваше избранное' : 'Весь каталог'} />
      <Sort />
      <div className="content__cards">
        <CardList cards={favor} />
      </div>
    </div>
  );
};
