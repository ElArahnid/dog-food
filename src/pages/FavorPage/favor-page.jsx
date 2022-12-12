import { useContext } from "react";
import CardList from "../../components/CardList/CardList";
import Sort from "../../components/Sort/Sort";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";

export const FavorPage = ({ isLoading }) => {
  const { favor } = useContext(CardContext);
  return (
    <>
      <Sort />
      <div className="content__cards">
        {isLoading ? 
            <Spinner /> : 
            <CardList cards={favor} />
        }
      </div>
    </>
  );
};
