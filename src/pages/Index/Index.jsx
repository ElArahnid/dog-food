import { DeerDog } from "../../components/DeerDog/DeerDog";
import { IndexBanner } from "../../components/IndexBanner/IndexBanner";
import s from "./style.module.css";
import bannerOne from "./images/banner.jpg";
import bannerTwo from "./images/banner_2.jpg";

export const Index = () => {
  const goods = [
    {
      id: 1,
      image: "./cards/img1.png",
      old_price: "1200 ₽",
      price: "840 ₽",
      quantity: "1 шт",
      text: "Рога оленя для собак весом от 10 до 30 кг. Размер L",
    },
    {
      id: 2,
      image: "./cards/img2.png",
      price: "450 ₽",
      quantity: "200 мл",
      text: "Сельдевое масло",
    },
    {
      id: 3,
      image: "./cards/img3.png",
      old_price: "550 ₽",
      price: "495 ₽",
      quantity: "100 г",
      text: "Бублик из бычьего корня",
    },
    {
      id: 4,
      image: "./cards/img4.png",
      price: "240 ₽",
      quantity: "1 шт",
      text: "Лопаточный хрящ говяжий для собак",
    },
  ];

  return (
    <>
      <DeerDog />
      <div className={s.BannersOnIndex}>
      <IndexBanner
        title="Подарок за первый заказ"
        subtitle="Легкое говяжье - пластины"
        bg={bannerOne}
        price=""
        extraClass="banner_big"
        colorBg="#FF8F27"
      />
      <IndexBanner
        title=""
        subtitle="Наборы для дрессировки"
        bg={bannerTwo}
        price="от 840 руб."
        extraClass="banner_big"
        colorBg="#D8A217"
      />
      </div>
    </>
  );
};
