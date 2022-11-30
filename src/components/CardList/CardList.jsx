import Card from "../Card/Card";
import "./styles.css";


const CardList = ({ goods, onProductLike, currentUser }) => {
  // console.log(goods);
return (
<div className="cards">
  {
    goods.map((item, index) => 
      // console.log({...item});
      // return (
    <Card 
        key = {item._id} {...item} onProductLike={onProductLike} currentUser={currentUser} 
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
