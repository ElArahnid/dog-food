import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.css';

export const ContentHeader = ({title, children}) => {

// HOOKS
    const backNavigate = useNavigate();

    return (
        <div>
        <span className={s.buttonBack} onClick={() => {backNavigate(-1)}}>Назад</span>
        <h1 className={s.title}>{title}</h1>
        {children}
    </div>
    )
}