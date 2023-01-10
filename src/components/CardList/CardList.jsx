import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import Card from "../Card/Card";
// import { NotFound } from "../NotFound/NotFound";
import Spinner from "../Spinner";
import "./styles.css";

const CardList = () => {

  const { cards } = useContext(CardContext);
  const { isLoading } = useContext(UserContext);
  // const navigate = useNavigate();
  
  return (
    <>
      {
      !cards.length && !isLoading &&
        // <NotFound title="Пусто. Ничего." buttonAction={() => navigate(-1)} />
        <Spinner />
      }
      <div className="cards">
      {
        cards.map((item) => 
          <Card key={item._id} {...item} />
        )
      }
      </div>
    </>
  );
};

export default CardList;
