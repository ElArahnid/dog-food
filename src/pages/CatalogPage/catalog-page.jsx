import { useCallback, useContext, useEffect, useState } from "react";
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
	
  const [sortedCard, setSortedCard] = useState(cards);

//   console.log('sortedCard ', sortedCard);
  
  const selectTypeSort = useCallback((sortArg) => {
	if (sortArg === 'cheap') {setSortedCard(cards.sort((a, b) => a['price'] - b['price']))}
	else if (sortArg === 'low') {setSortedCard(cards.sort((a, b) => b['price'] - a['price']))}
	else if (sortArg === 'sale') {setSortedCard(cards.sort((a, b) => b['discount'] - a['discount']))}
	else {setSortedCard([...cards])};
	// console.log(sortArg, selectTypeSort);
	})

useEffect(() => {selectTypeSort()}, [selectTypeSort])

  return (
    <>
      <Sort tabs={tabs} defaultSort={tabs[2].id} selectTypeSort={selectTypeSort} />
      <div className="content__cards">
        <CardList cards={sortedCard} />
      </div>
    </>
  );
};
