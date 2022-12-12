import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import Card from "../Card/Card";
import { NotFound } from "../NotFound/NotFound";
import "./styles.css";

const CardList = ({ cards }) => {
  // const {cards} = useContext(CardContext)
  const navigate = useNavigate();
  return (
    <>
      {!cards.length && (
        <NotFound
          title="Пусто. Ничего нет."
          buttonAction={() => navigate(-1)}
        />
      )}
      <div className="cards">
        {cards.map((item) => (
          <Card key={item._id} {...item} />
        ))}
      </div>
    </>
  );
};

export default CardList;
