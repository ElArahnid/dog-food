import { useContext, useState } from 'react';
import cn from 'classnames';
import s from './style.module.css';
import { ThemeContext } from '../../context/themeContext';

export const Accordion = ({children, title}) => {
    const [selected, setSelected] = useState(false);
    const {themeStatus} = useContext(ThemeContext);

    function switcherStateAccordion() {
        setSelected(!selected);
    }

    return (
        <div className={cn(s.accordion, {[s.active]: selected}, {'accordion': !themeStatus})}>
            <button onClick={switcherStateAccordion} className={s.accordionButton}>
                <p className={s.title}>{title}</p></button>
                <div className={cn(s.content, {'productReviewText': !themeStatus})}>
                    <p className={s.text}>{children}</p>
                </div>
            
        </div>
    )
}