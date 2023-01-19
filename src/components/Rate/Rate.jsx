import { useCallback, useEffect, useState } from 'react';
import s from './style.module.css';
import cn from 'classnames';
import { ReactComponent as StarImage } from './star.svg';

export function Rate({isEditable = false, rating, setRating}) {

    const [ratingArr, setRatingArr] = useState(new Array(5).fill(<></>));

const changeRaiting = (rating) => {
    if(!isEditable || !setRating) return;
    setRating(rating)
}

const doStarsColored = (rating) => {
    if(!isEditable) return;
    starsRow(rating);
}

const starsRow = useCallback((currentRating) => {
    const updateArr = ratingArr.map((starInRow, index) => {
        return (
            <StarImage 
                className={cn(s.star, {
                [s.filled]: index < currentRating,
                [s.editable]: isEditable,
                })}
                onMouseEnter={() => doStarsColored(index + 1)}
                onMouseLeave={() => doStarsColored(rating)}
                onClick={() => changeRaiting(index + 1)}
            />
        )
    })
    setRatingArr(updateArr)
}, [rating, isEditable])

useEffect(() => {
    starsRow(rating)
}, [rating, starsRow])

    return (
        <div className={s.rate}>
            Ваш рейтинг: {ratingArr.map((star, index) => <span key={index}>{star}</span>)}
        </div>
    )
}