import { useContext } from "react";
import CardList from "../../components/CardList/CardList";
import { ContentHeader } from "../../components/ContentHeader/ContentHeader";
import Sort from "../../components/Sort/Sort";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";

export const FavorPage = () => {
  const { favor } = useContext(CardContext);
  return (
    <>
    <ContentHeader title="Избранное" />
      <Sort />
      <div className="content__cards">
        <CardList cards={favor} />
      </div>
    </>
  );
};
