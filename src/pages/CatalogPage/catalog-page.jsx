import { useContext, useState } from "react";
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

  const {cards} = useContext(CardContext);
  console.log('cards ', cards);
  const [sortedCard, setSortedCard] = useState([]);
  console.log('sortedCard ', sortedCard);
  
  const selectTypeSort = (sortArg) => {
	switch(sortArg) {
	case 'cheap': setSortedCard(cards.sort((a, b) => b['price'] - a['price']));
	break;
	case 'low': setSortedCard(cards.sort((a, b) => a['price'] - b['price']));
	break;
	case 'sale': setSortedCard(cards.sort((a, b) => b['discount'] - a['discount']));
	break;
	default: setSortedCard(cards);
	}
	console.log(cards);
}


  return (
    <>
      <Sort tabs={tabs} defaultSort={tabs[2].id} selectTypeSort={selectTypeSort} />
      <div className="content__cards">
        <CardList cards={sortedCard} />
      </div>
    </>
  );
};
