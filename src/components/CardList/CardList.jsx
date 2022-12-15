import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Card from "../Card/Card";
import { NotFound } from "../NotFound/NotFound";
import "./styles.css";

const CardList = ({ cards }) => {

  const { isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      {
      !cards.length && !isLoading &&
        <NotFound title="Пусто. Ничего." buttonAction={() => navigate(-1)} />
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
