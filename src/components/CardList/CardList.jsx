import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import Card from "../Card/Card";
import "./styles.css";


const CardList = () => {
const {cards} = useContext(CardContext)
  // console.log(goods);
return (
<div className="cards">
  {
    cards.map((item, index) => 
      // console.log({...item});
      // return (
    <Card 
        key = {item._id} {...item} 
      // name = {item.name} 
      // price = {item.price} 
      // discount = {item.discount} 
      // description = {item.description} 
      // picture = {item.picture} 
    />
      // )
    )
  }
</div>
  );
};

export default CardList;
