import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './style.module.css';

export const ContentHeader = ({title, children}) => {

    const backNavigate = useNavigate();

    return (
        <div>
        <Link to='/catalog' className={s.buttonBack} onClick={() => {backNavigate('/catalog')}}>В каталог</Link>
        <span className={s.buttonBack} onClick={() => {backNavigate(-1)}}>Назад</span>
        <h1 className={s.title}>{title}</h1>
        {children}
    </div>
    )
}