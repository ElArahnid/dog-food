import s from './index.module.css';
import cn from 'classnames';
import { calcDiscountPrice, isLiked} from '../../Utilites/product';
import { ReactComponent as Save } from './img/save.svg';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import { UserContext } from '../../context/userContext';
import { useContext, useMemo, useState } from 'react';
import { ContentHeader } from '../ContentHeader/ContentHeader';
import { Rate } from '../Rate/Rate';
import { ReviewForm } from '../ReviewForm/ReviewForm';

export const Product = ({ onProductLike, description, discount, likes = [], name, pictures, price, reviews, tags}) => {
    console.log(reviews);

    const middleRaitingCalc = useMemo(
            () => 
                Math.round(
                    reviews?.reduce((acc, arg) => {
                        return acc += arg.rating;
                }, 0) / reviews?.length
                ), [reviews]
        )
                // console.log(middleRaitingCalc);

        
    const {user: currentUser} = useContext(UserContext);

    // const [rating, setRating] = useState(null);

    const discount_price = calcDiscountPrice(price, discount);
    const isLike = isLiked(likes, currentUser?._id);

    const createMarkup = (textToHtml) => {
        return { __html: textToHtml }
    }
    const descriptionHtml = createMarkup(description);
    // console.log(backNavigate);
    return (
        <>
        <ContentHeader title={name} />
        <div className={s.leftInfo}>
            <span>Артикул: 1234567890</span> 
            <span><Rate rating={middleRaitingCalc} /></span>
            <span>{reviews?.length} отзыв</span>
        </div>
        <div className={s.product}>
            <div className={s.imgWrapper}>
                <img src={pictures} alt={`Изображение ${name}`} />
            </div>
            <div className={s.desc}>
            <span className={discount ? s.oldPrice : s.price}>
                {price}&nbsp;₽
            </span>
            {discount !== 0 ? <span className={cn(s.price, 'card__price_type_discount')}>{discount_price}&nbsp;₽</span> : null }
            <div className={s.btnWrap}>
                <div className={s.left}>
                <button className={s.minus}>-</button>
                <button className={s.null}>0</button>
                <button className={s.plus}>+</button>
                </div>
                <a href="/#" className={cn('btn', 'btn-type-primary', s.cart)}>В корзину</a>
            </div>
            <button className={cn(s.favorite, {[s.favoriteActive]: isLike})} onClick={onProductLike}>
                <Save />
                <span>{isLike ? 'В избранном' : 'В избранное'}</span>
            </button>
            <div className={s.delivery}>
                <img src={truck} alt="truck" />
                <div className={s.right}>
                    <h3 className={s.name}>Доставка по всему Миру!</h3>
                    <p className={s.text}>
                        Доставка курьером — 
                        <span className={s.bold}> от 399&nbsp;₽</span>
                    </p>
                </div>
            </div>
            <div className={s.delivery}>
                <img src={quality} alt="quality" />
                <div className={s.right}>
                    <h3 className={s.name}>Доставка по всему Миру!</h3>
                    <p className={s.text}>
                        Доставка курьером — 
                        <span className={s.bold}> от 399&nbsp;₽</span>
                    </p>
                </div>
            </div>
            </div>
        </div>
        <div className={s.box}>
            <h2 className={s.title}>Описание</h2>
            <p className={s.subtitle} dangerouslySetInnerHTML={descriptionHtml}></p>
            <h2 className={s.title}>Характеристики</h2>
				<div className={s.grid}>
					<div className={s.naming}>Вес</div>
					<div className={s.description}>1 шт 120-200 грамм</div>
					<div className={s.naming}>Цена</div>
					<div className={s.description}>490 ₽ за 100 грамм</div>
					<div className={s.naming}>Польза</div>
					<div className={s.description}>
						<p>
							Большое содержание аминокислот и микроэлементов оказывает
							положительное воздействие на общий обмен веществ собаки.
						</p>
						<p>Способствуют укреплению десен и жевательных мышц.</p>
						<p>
							Развивают зубочелюстной аппарат, отвлекают собаку во время смены
							зубов.
						</p>
						<p>
							Имеет цельную волокнистую структуру, при разжевывание получается
							эффект зубной щетки, лучше всего очищает клыки собак.
						</p>
						<p>Следует учесть высокую калорийность продукта.</p>
					</div>
				</div>
        </div>
        <ReviewForm reviewTitle={`Отзыв о товаре ${name}`} productName={name} />
        </>
    )
}

export default Product;