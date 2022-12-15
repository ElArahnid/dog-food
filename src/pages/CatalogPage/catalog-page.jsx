import { useContext } from "react";
import CardList from "../../components/CardList/CardList";
import Sort from "../../components/Sort/Sort";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

const tabs = [
	{
	  id: "cheap",
	  title: "Сначала дешёвые",
	},
	{
	  id: "low",
	  title: "Сначала дорогие",
	},
	{
	  id: "sale",
	  title: "По скидке",
	},
  ];

export const CatalogPage = () => {
  const {cards} = useContext(CardContext)

  return (
    <>
      <Sort tabs={tabs} />
      <div className="content__cards">
        <CardList cards={cards} />
      </div>
    </>
  );
};
