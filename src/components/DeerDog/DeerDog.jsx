import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';

import s from './style.module.css';
import cn from 'classnames';
import banner from './img/banner.png'
import { ReactComponent as Arrow } from './img/arrow.svg';

export const DeerDog = () => {
    const { themeStatus } = useContext(ThemeContext);
    return (
        <div className={cn(s.banner, {'indexTopBannerDark': !themeStatus})}>
            <div className={cn(s.banner__container, 'container')}>
                <div className={s.left}>
                    <h1 className={s.title}>Крафтовые лакомства <br />для собак</h1>
                    <p className={s.subtitle}>Всегда самые свежие лакомства ручной работы с доставкой по России и Миру</p>
                    <Link to='/catalog' className={s.link}>
                        Каталог<Arrow/>
                    </Link>
                </div>
                <div className={s.right}>
                    <img src={banner} alt="SuperDog goes to the Sky" />
                </div>
            </div>
        </div>
        )
}