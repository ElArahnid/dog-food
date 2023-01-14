import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import Card from "../Card/Card";
import Spinner from "../Spinner"
import { NotFound } from "../NotFound/NotFound";
import "./styles.css";

const CardList = () => {
  const { cards, favor,  searchQuery = '', checkedSearchInFavor, location } = useContext(CardContext);
  const { isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  
  let selectedCards;

    location.pathname === "/favorites" && checkedSearchInFavor
    ? (selectedCards = favor.filter((element) => {
      return (element.name).toLowerCase().includes(searchQuery.toLowerCase())
    }))
    : (selectedCards = cards);


    // console.log(checkedSearchInFavor, ' <== checkedSearchInFavor');
  return (
    <>
      {
        isLoading && !selectedCards?.length && 
          <NotFound title="...ничего" buttonAction={() => navigate(-1)} />
        // <Spinner />
      }
      <div className="cards">
        {selectedCards.map((item) => (
          <Card key={item._id} {...item} />
        ))}
      </div>
    </>
  );
};

export default CardList;
