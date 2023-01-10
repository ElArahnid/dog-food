import { useCallback, useContext, useEffect, useState } from "react";
import CardList from "../../components/CardList/CardList";
import Sort from "../../components/Sort/Sort";
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

	const { cards } = useContext(CardContext);
	const [sortedCard, setSortedCard] = useState(cards);
	useEffect(() => {
	setSortedCard();
	}, [cards, sortedCard])

	//   console.log('sortedCard ', sortedCard);

	const selectTypeSort = useCallback( (sortArg) => {
    if (sortArg === "cheap") {
      setSortedCard(cards?.sort((a, b) => a["price"] - b["price"]));
	//   console.log("cheaped");
    } else if (sortArg === "low") {
      setSortedCard(cards?.sort((a, b) => b["price"] - a["price"]));
	//   console.log("lowed");
    } else if (sortArg === "sale") {
      setSortedCard(cards?.sort((a, b) => b["discount"] - a["discount"]));
	//   console.log("saled");
    } 
    // console.log(sortArg + ' <-- sortArg');
	
  }, [cards])



  return (
    <>
      <Sort
        tabs={tabs}
        selectTypeSort={selectTypeSort}
      />
      <div className="content__cards">
        <CardList cards={sortedCard} />
      </div>
    </>
  );
};
