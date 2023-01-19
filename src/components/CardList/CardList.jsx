import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import Card from "../Card/Card";
import Spinner from "../Spinner"
import { NotFound } from "../NotFound/NotFound";
import "./styles.css";

const CardList = () => {
  const { cards, favor, searchWord,  searchQuery = '', checkedSearchInFavor, location } = useContext(CardContext);
  const { isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  
  let selectedCards;

    if(location.pathname === "/favorites" && checkedSearchInFavor)
     (selectedCards = favor.filter((element) => {
      return (element.name).toLowerCase().includes(searchQuery.toLowerCase())
    }))
    else if (searchWord) {
      selectedCards = cards.filter((element) => {
        return (element.name).toLowerCase().includes(searchWord.toLowerCase())
      })
    }
    else (selectedCards = cards);
    

    // console.log(checkedSearchInFavor, ' <== checkedSearchInFavor');
  return (
    <>
      { isLoading && <Spinner /> }
      { !selectedCards?.length && <NotFound title="...пока что ничего не найдено" buttonAction={() => navigate(-1)} /> }
      <div className="cards">
        {selectedCards.map((item) => (
          <Card key={item._id} {...item} />
        ))}
      </div>
    </>
  );
};

export default CardList;
